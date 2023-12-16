const bcrypt = require('bcrypt')
const { dbConnect } = require('../dbConnect/database.js')

const cookieConfig = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 3600 * 1000,
}

const Login = async (req, res) => {
  try {
    const client = await dbConnect()
    const { email, password } = req.body
    if (email === '' || password === '') {
      return res.status(400).send({
        message: 'Bad Request',
        success: false,
      })
    }
    const result = await client.query('SELECT * FROM user WHERE email = ?', [email])
    if (result[0] !== null && !(await bcrypt.compare(password, result[0][0].password))) {
      return res.status(401).send({
        message: 'Email or Password is incorrect',
        success: false,
      })
    } else if (result[0] === null) {
      return res.status(401).send({
        message: 'Email or Password is incorrect',
        success: false,
      })
    }
    res.cookie('userID', result[0][0]._id.toString(), cookieConfig)
    return res.status(200).send({
      message: 'Login Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
}

module.exports = { Login }

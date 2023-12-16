const bcrypt = require('bcrypt')
const srs = require('secure-random-string')

const { dbConnect } = require('../dbConnect/database.js')

const Signup = async (req, res) => {
  try {
    const client = await dbConnect()
    const { email, fName, lName, password } = req.body
    if (email === '' || password === '') {
      return res.status(400).send({
        message: 'Enter email and Password',
        success: false,
      })
    }
    const user = {
      _id: await srs({ length: 24 }),
      email,
      fName,
      lName,
      tel: '',
      facebook: '',
      line: '',
      twitter: '',
      instagram: '',
      address: '',
      password: await bcrypt.hash(password, 3),
    }
    await client.query('INSERT INTO user SET ?', user)
    return res.status(201).send({
      message: 'Signup Success',
      success: true,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        message: 'Email Already Exists',
        success: false,
      })
    }
    return res.status(500).send({ success: false })
  }
}

module.exports = { Signup }

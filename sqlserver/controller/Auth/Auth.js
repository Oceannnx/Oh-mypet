const { dbConnect } = require('../dbConnect/database.js')

const authMe = async (req, res) => {
  try {
    const client = await dbConnect()
    const userID = req.cookies.userID
    const result = await client.query('SELECT * FROM user WHERE _id = ?', [userID])
    if (result[0].length === 0) {
      res.send({
        message: 'No user found',
      })
    }
    return res.status(200).send({
      message: '',
      success: true,
      fName: result[0][0].fName,
      lName: result[0][0].lName,
      email: result[0][0].email,
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { authMe }

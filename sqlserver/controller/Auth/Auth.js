const { dbConnect } = require('../dbConnect/database.js')

const authMe = async (req, res) => {
  const client = await dbConnect()
  const userID = req.cookies.userID
  if (userID === null || userID === '') {
    return res.status(403).send({ message: '', success: false })
  }
  const result = await client.query('SELECT * FROM user WHERE _id = ?', [userID])
  if (result[0].length === 0) {
    return res.status(403).send({ message: '', success: false })
  }
  return res.status(200).send({
    message: '',
    success: true,
    fName: result[0][0].fName,
    lName: result[0][0].lName,
    email: result[0][0].email,
  })
}

module.exports = { authMe }

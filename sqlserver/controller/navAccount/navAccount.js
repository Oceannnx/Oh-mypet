const { dbConnect } = require('../dbConnect/database.js')

const navAccount = async (req, res) => {
  try {
    const client = await dbConnect()
    const userID = req.cookies.userID
    const result = await client.query(`SELECT fName FROM user where _id = '${userID}'`)
    return res.send(result[0])
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = { navAccount }

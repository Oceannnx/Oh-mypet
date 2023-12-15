const { dbConnect } = require('../dbConnect/database.js')

const test = async (req, res) => {
  try {
    const pool = await dbConnect()
    const userID = req.body.userID // Example: /testRoute?userId=123
    const result = await pool.query('SELECT count(_id) as count FROM user')
    return res.status(200).send({ userID, count: result[0][0].count })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { test }

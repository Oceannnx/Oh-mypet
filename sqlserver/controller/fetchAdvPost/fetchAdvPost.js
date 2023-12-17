const { dbConnect } = require('../dbConnect/database.js')

const fetchAdvPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const result = await client.query('select * from advPost')
    return res.status(200).send({ data: result[0], success: true })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false })
  }
}

module.exports = { fetchAdvPost }

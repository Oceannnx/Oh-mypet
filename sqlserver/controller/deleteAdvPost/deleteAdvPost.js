const { dbConnect } = require('../dbConnect/database.js')

const deleteAdvPost = (req, res) => {
  try {
    const client = dbConnect()
    const advPostID = req.params.advPostID
    client.query(`DELETE FROM advPost WHERE _id = '${advPostID}'`)
    return res.status(200).send({ success: true })
  } catch (error) {
    res.status(500).send({ success: false })
  }
}

module.exports = { deleteAdvPost }

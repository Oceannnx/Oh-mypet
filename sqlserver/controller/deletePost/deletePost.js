const { dbConnect } = require('../dbConnect/database.js')

const deletePost = async (req, res) => {
  try {
    const client = await dbConnect()
    const postID = req.params.id
    await client.query(`delete from sellpost where _id = "${postID}"`)
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error', success: false })
  }
}

module.exports = { deletePost }

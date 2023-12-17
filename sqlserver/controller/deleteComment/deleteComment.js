const { dbConnect } = require('../dbConnect/database.js')

const deleteComment = async (req, res) => {
  const client = await dbConnect()
  const commentID = req.params.commentID
  try {
    await client.query(`DELETE FROM comment WHERE comment._id = '${commentID}'`)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

module.exports = { deleteComment }

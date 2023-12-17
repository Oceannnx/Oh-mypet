const { dbConnect } = require('../dbConnect/database.js')

const fetchComment = async (req, res) => {
  try {
    const client = await dbConnect()
    const param = req.params.id
    const result = await client.query(
      `SELECT
      co._id,
      co.commentText,
      co.commentDate,
      u._id as userID,
      u.email,
      u.fName,
      u.lName
      FROM comment as co join user as u on co.userID = u._id  WHERE advPostID = '${param}' order by co.commentDate desc`,
    )
    const MapResult = result[0].map((item) => {
      return {
        _id: item._id,
        comment: item.commentText,
        commentDate: item.commentDate,
        user: {
          _id: item.userID,
          email: item.email,
          fName: item.fName,
          lName: item.lName,
        },
      }
    })
    return res.send(MapResult)
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false })
  }
}

module.exports = { fetchComment }

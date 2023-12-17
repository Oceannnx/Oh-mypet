const srs = require('secure-random-string')

const { dbConnect } = require('../dbConnect/database.js')

const newComment = async (req, res) => {
  const { comment, advPostID } = req.body
  if (comment === '') {
    return res.status(400).send({
      message: 'Enter Comment',
      success: false,
    })
  }
  try {
    const client = await dbConnect()
    const advComment = {
      _id: await srs({ length: 24 }),
      userID: req.cookies.userID,
      advPostID,
      commentText: comment,
      commentDate: new Date(Date.now()),
    }
    await client.query('INSERT INTO comment SET ?', advComment)
    return res.status(201).send({
      message: 'New Comment Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
}

module.exports = { newComment }
// userID: new ObjectId(req.cookies.userID),
// advPostID: new ObjectId(advPostID),
// comment,
// commentDate: new Date(Date.now()),

const { dbConnect } = require('../dbConnect/database.js')

const newComment = async (req, res) => {
  const { commentDesc, sellPostID } = req.body
  const comment = {
    userID: req.cookies.userID,
    sellPostID,
    commentDesc,
    commentDate: new Date(Date.now()),
  }
  try {
    const client = await dbConnect()
    await client.query('INSERT INTO comment SET ?', comment)
    return res.status(201).send({
      message: 'New Comment Success',
      success: true,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false })
  }
}

module.exports = { newComment }

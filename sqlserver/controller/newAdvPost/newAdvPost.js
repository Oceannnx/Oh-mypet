const srs = require('secure-random-string')

const { dbConnect } = require('../dbConnect/database.js')

const newAdvPost = async (req, res) => {
  const { title, postDesc } = req.body
  const advPost = {
    _id: await srs({ length: 24 }),
    userID: req.cookies.userID,
    title,
    postDesc,
    postDate: new Date(Date.now()),
  }
  try {
    const client = await dbConnect()
    await client.query('INSERT INTO advPost SET ?', advPost)
    return res.status(201).send({
      message: 'New Adv Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
}

module.exports = { newAdvPost }

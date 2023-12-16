const { dbConnect } = require('../dbConnect/database.js')
const srs = require('secure-random-string')

const newSellPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const {
      title,
      petLocation,
      petType,
      petGene,
      petAge,
      petName,
      petGender,
      petBD,
      petPrice,
      petImages,
      petDescription,
    } = req.body
    const sellPost = {
      _id: await srs({ length: 24 }),
      userID: req.cookies.userID,
      title,
      petType,
      petGene,
      petAge,
      petName,
      petGender,
      petBD,
      petPrice,
      petLocation,
      petImages,
      petDescription,
      petPostDate: new Date(Date.now()),
    }
    await client.query('INSERT INTO sellPost SET ?', sellPost)
    return res.status(201).send({
      message: 'New sell Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = { newSellPost }

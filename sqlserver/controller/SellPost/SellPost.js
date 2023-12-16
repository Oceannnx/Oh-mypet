const { dbConnect } = require('../dbConnect/database.js')

const sellPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const qsellPost = req.params.id
    const result = await client.query(
      `SELECT * from sellPost as sp join user as u on sp.userID = u._id where sp._id = '${qsellPost}'`,
    )
    const MapSellPost = result[0].map((item) => {
      return {
        _id: item._id,
        userID: item.userID,
        title: item.title,
        petType: item.petType,
        petGene: item.petGene,
        petAge: item.petAge,
        petName: item.petName,
        petGender: item.petGender,
        petBD: item.petBD,
        petPrice: item.petPrice,
        petLocation: item.petLocation,
        petImages: item.petImages,
        petDescription: item.petDescription,
        petPostDate: item.petPostDate,
        user: {
          fName: item.fName,
          lName: item.lName,
        },
      }
    })
    return res.status(200).send(MapSellPost)
  } catch (err) {
    console.log(err)
    return res.status(500).send({ success: false })
  }
}

module.exports = { sellPost }

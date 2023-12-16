const { dbConnect } = require('../dbConnect/database.js')

const fetchSellPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const sellPost = await client.query(`SELECT 
    sp._id,
    sp.userID,
    sp.title,
    sp.petType,
    sp.petGene,
    sp.petAge,
    sp.petName,
    sp.petGender,
    sp.petBD,
    sp.petPrice,
    sp.petLocation,
    sp.petImages,
    sp.petImages,
    sp.petDescription,
    sp.petPostDate,
    u.fName,
    u.lName
    FROM sellPost as sp join user as u on sp.userID = u._id`)
    const MapSellPost = sellPost[0].map((item) => {
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
  } catch (error) {
    res.status(500).send({ success: false })
  }
}

module.exports = { fetchSellPost }

const { dbConnect } = require('../dbConnect/database.js')

const fetchFilterSellPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const animal = req.params.animal
    const result = await client.query(
      `select * from sellPost as sp join user as u on sp.userID = u._id where sp.petType = "${animal}" order by petPostDate desc`,
    )
    const MapFilterSellPost = result[0].map((item) => {
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
          profileImg: item.profileImg,
        },
      }
    })
    return res.send(MapFilterSellPost)
  } catch (error) {
    res.status(500).send({ success: false })
  }
}

module.exports = { fetchFilterSellPost }

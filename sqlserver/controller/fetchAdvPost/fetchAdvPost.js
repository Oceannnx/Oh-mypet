const { dbConnect } = require('../dbConnect/database.js')

const fetchAdvPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const result = await client.query('select * from advPost as ap join user as u on ap.userID = u._Id')
    const MapAdvPost = result[0].map((item) => {
      return {
        _id: item._id,
        title: item.title,
        postDesc: item.postDesc,
        postDate: item.postDate,
        username: item.username,
        profilePic: item.profilePic,
        user: {
          _id: item.userID,
          email: item.email,
          fName: item.fName,
          lName: item.lName,
        },
      }
    })
    return res.status(200).send(MapAdvPost)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false })
  }
}

module.exports = { fetchAdvPost }

const { dbConnect } = require('../dbConnect/database.js')

const fetchAdvPost = async (req, res) => {
  try {
    const client = await dbConnect()
    const result = await client.query(`select 
    ap._id,
    ap.title,
    ap.postDesc,
    ap.postDate,
    u._id as userID,
    u.email,
    u.fName,
    u.lName
    from advPost as ap join user as u on ap.userID = u._id`)
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
    console.log(result[0])
    return res.status(200).send(MapAdvPost)
  } catch (error) {
    console.log(error)
    return res.status(500).send({ success: false })
  }
}

module.exports = { fetchAdvPost }

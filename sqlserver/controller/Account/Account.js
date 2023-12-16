const { dbConnect } = require('../dbConnect/database.js')

const Account = async (req, res) => {
  try {
    const client = await dbConnect()
    const userID = req.cookies.userID
    let paramsID = req.params.id || 'me'
    if ((userID === undefined || userID === '') && paramsID === 'me') {
      return res.status(403).send({ success: false })
    } else if (paramsID === 'me') {
      paramsID = userID
    }
    const result = await client.query(`SELECT 
    email,
    fName,
    lName,
    address,
    facebook,
    instagram,
    line,
    tel,
    twitter 
    FROM user where _id = '${paramsID}'`)
    return res.send({ data: result[0], is_owner: userID === paramsID })
  } catch (error) {
    res.status(500).send({ success: false })
  }
}

module.exports = { Account }

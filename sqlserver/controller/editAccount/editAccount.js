const { dbConnect } = require('../dbConnect/database.js')

const editAccount = async (req, res) => {
  try {
    const client = await dbConnect()
    const { fName, lName, email, tel, line, facebook, twitter, instagram, address } = req.body
    const result = await client.query(`select * from user where email = "${email}"`)
    console.log(result[0][0].email)
    if (result[0].length > 0 && result[0][0].email !== email) {
      return res.status(409).send({ message: 'Email Already Exists', success: false })
    } else if (
      fName === '' ||
      lName === '' ||
      email === '' ||
      email === null ||
      fName.indexOf(' ') >= 0 ||
      lName.indexOf(' ') >= 0
    ) {
      return res.status(400).send({ message: 'Bad Request', success: false })
    }
    await client.query(
      `update user set fName = "${fName}", lName = "${lName}", email = "${email}", tel = "${tel}", line = "${line}", facebook = "${facebook}", twitter = "${twitter}", instagram = "${instagram}", address = "${address}" where _id = "${req.cookies.userID}"`,
    )
    return res.status(200).send({ data: result[0], success: true })
  } catch (error) {
    console.log(error)
    res.status(500).send({ success: false })
  }
}

module.exports = { editAccount }

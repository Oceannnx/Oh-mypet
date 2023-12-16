const bcrypt = require('bcrypt')

const { dbConnect } = require('../dbConnect/database.js')

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body
    const client = await dbConnect()
    const result = await client.query(`select * from user where _id = "${req.cookies.userID}"`)
    if (!(await bcrypt.compare(currentPassword, result[0][0].password))) {
      return res.status(400).send({ message: 'Current password is incorrect', success: false })
    } else if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: 'password must be the same', success: false })
    } else if (currentPassword === '' || newPassword === '') {
      return res.status(400).send({ message: 'Bad Request', success: false })
    } else if (currentPassword === newPassword) {
      return res.status(400).send({ message: 'New password must be different from current password', success: false })
    }
    await client.query(
      `update user set password = "${await bcrypt.hash(newPassword, 3)}" where _id = "${req.cookies.userID}"`,
    )
    return res.status(200).send({ success: true })
  } catch (error) {
    return res.status(500).send({ message: 'Internal Server Error', success: false })
  }
}
module.exports = { changePassword }

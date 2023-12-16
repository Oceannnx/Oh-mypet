const Logout = (req, res) => {
  const userID = req.cookies.userID

  if (userID === null || userID === '') {
    return res.status(403).send({ message: '', success: false })
  }

  res.status(200).clearCookie('userID')
  return res.end()
}

module.exports = { Logout }

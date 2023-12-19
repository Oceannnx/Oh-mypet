const test = (req, res) => {
  try {
    res.send({
      message: 'Oh-MYPET',
    })
  } catch (err) {
    res.send({
      message: err.message,
    })
  }
}

module.exports = { test }

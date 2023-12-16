const test = (req, res) => {
  try {
    res.send({
      message: 'Oh-MYPET',
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = { test }

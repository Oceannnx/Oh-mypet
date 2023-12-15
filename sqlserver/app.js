const express = require('express')
const cors = require('cors')
const { test } = require('./controller/test/test.js')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', test)

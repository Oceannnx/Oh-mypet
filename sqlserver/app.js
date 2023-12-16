const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
const port = process.env.PORT

const { test } = require('./controller/test/test.js')
const { authMe } = require('./controller/Auth/Auth.js')
const { Signup } = require('./controller/Signup/Signup.js')

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', test)
app.get('/api/user/me', authMe)
app.post('/signup', Signup)

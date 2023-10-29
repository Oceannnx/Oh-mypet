const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const url = process.env.DB_URL

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

const cookieConfig = {
  httpOnly: true,
  secure: true,
  maxAge: 24 * 60 * 3600,
}

const client = new MongoClient(url)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.send({
    message: 'Oh-MYPET',
  })
})

app.get('/api/user/me', async (req, res) => {
  const userID = req.headers['userID']

  if (userID === null || userID === '') {
    return res.status(403).send({ message: '', success: false })
  }

  const result = await client.db('oh-mypet').collection('user').findOne({ _id: userID })

  if (result === null) {
    return res.status(403).send({ message: '', success: false })
  }
  return res.status(200).send({ message: '', success: true })
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === '' || password === '') {
      return res.status(400).send({
        message: 'Enter Username and Password',
        success: false,
      })
    }
    const user = {
      username,
      password: await bcrypt.hash(password, 3),
    }
    await client.db('oh-mypet').collection('user').insertOne(user)

    return res.status(201).send({
      message: 'Sign Up Success',
      success: true,
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).send({
        message: 'Username Already Exists',
        success: false,
      })
    }
    return res.status(500).send({ success: false })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    if (username === '' || password === '') {
      return res.status(400).send({
        message: 'Bad Request',
        success: false,
      })
    }
    const result = await client.db('oh-mypet').collection('user').findOne({ username: username })

    if (result !== null && !bcrypt.compare(password, result.password)) {
      return res.status(401).send({
        message: 'Login Failed',
        success: false,
      })
    } else if (result === null) {
      return res.status(404).send({
        message: 'User Not Found',
        success: false,
      })
    }

    res.cookie('userID', result._id.toString(), cookieConfig)

    return res.status(200).send({
      message: 'Login Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
})

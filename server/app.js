const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const bcrypt = require('bcrypt')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const url = process.env.DB_URL
app.use(express.json())
app.use(cors())

const client = new MongoClient(url)

app.listen(port, () => {
  console.log(`This server running on http:localhost:${port}`)
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
      cookie: 'user',
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

    return res.status(200).send({
      message: 'Login Success',
      success: true,
      cookie: 'user',
    })
  } catch (error) {
    console.log(error)
  }
})

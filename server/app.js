const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const cors = require('cors')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const e = require('express')
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
  maxAge: 7 * 24 * 60 * 3600,
}

const client = new MongoClient(url)

app.listen(port, () => {
  console.log(`Server is running`)
})

app.get('/', (req, res) => {
  res.send({
    message: 'Oh-MYPET',
  })
})

app.get('/api/user/me', async (req, res) => {
  const userID = req.cookies.userID

  if (userID === null || userID === '') {
    return res.status(403).send({ message: '', success: false })
  }

  const result = await client
    .db('oh-mypet')
    .collection('user')
    .findOne({ _id: new ObjectId(userID) })

  if (result === null) {
    return res.status(403).send({ message: '', success: false })
  }
  return res.status(200).send({ message: '', success: true })
})

app.post('/signup', async (req, res) => {
  try {
    const { email, fName, lName, password } = req.body
    if (email === '' || password === '') {
      return res.status(400).send({
        message: 'Enter email and Password',
        success: false,
      })
    }
    const user = {
      email,
      fName,
      lName,
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
        message: 'Email Already Exists',
        success: false,
      })
    }
    return res.status(500).send({ success: false })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (email === '' || password === '') {
      return res.status(400).send({
        message: 'Bad Request',
        success: false,
      })
    }
    const result = await client.db('oh-mypet').collection('user').findOne({ email: email })
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

app.post('/api/user/logout', (req, res) => {
  const userID = req.cookies.userID

  if (userID === null || userID === '') {
    return res.status(403).send({ message: '', success: false })
  }

  res.status(200).clearCookie('userID')
  return res.end()
})

app.post('/api/newsellpost', async (req, res) => {
  try {
    const {
      title,
      petLocation,
      petType,
      petGene,
      petAge,
      petName,
      petGender,
      petBD,
      petPrice,
      petImages,
      petDescription,
    } = req.body
    await client
      .db('oh-mypet')
      .collection('sellPost')
      .insertOne({
        userID: new ObjectId(req.cookies.userID),
        title,
        petType,
        petGene,
        petAge,
        petName,
        petGender,
        petBD,
        petPrice,
        petLocation,
        petImages,
        petDescription,
        petPostDate: new Date(Date.now()),
      })
    return res.status(201).send({
      message: 'New sell Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
})

app.get('/api/fetchsellpost', async (req, res) => {
  try {
    const result = await client
      .db('oh-mypet')
      .collection('sellPost')
      .aggregate([
        {
          $lookup: {
            from: 'user',
            localField: 'userID',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            title: 1,
            petType: 1,
            petName: 1,
            petPostDate: 1,
            petPrice: 1,
            'user.fName': 1,
            'user.lName': 1,
          },
        },
      ])
      .sort({ petPostdate: -1 })
      .toArray()
    return res.send(result)
    // return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send({ success: false })
  }
})

app.get('/api/sellpost/:id', async (req, res) => {
  try {
    const result = await client
      .db('oh-mypet')
      .collection('sellPost')
      .aggregate([
        {
          $match: {
            _id: ObjectId(req.params.id),
          },
        },
        {
          $lookup: {
            from: 'user',
            localField: 'userID',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: '$user',
        },
        {
          $project: {
            _id: 1,
          },
        },
      ])
      .toArray()
    return res.send(result)
  } catch (err) {
    return res.status(500).send({ success: false })
  }
})
// supabase password "ZriXNxs6PFojh1yI"

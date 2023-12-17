const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
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
  maxAge: 24 * 60 * 3600 * 1000,
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
  return res
    .status(200)
    .send({ message: '', success: true, fName: result.fName, lName: result.lName, email: result.email })
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
      tel: '',
      facebook: '',
      line: '',
      twitter: '',
      instagram: '',
      address: '',
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
    if (result !== null && !(await bcrypt.compare(password, result.password))) {
      return res.status(401).send({
        message: 'Email or Password is incorrect',
        success: false,
      })
    } else if (result === null) {
      return res.status(404).send({
        message: 'Email or Password is incorrect',
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
            'user.email': 0,
            'user.password': 0,
          },
        },
      ])
      .sort({ petPostDate: -1 })
      .limit(100)
      .toArray()
    return res.send(result)
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
          $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.id }] } },
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
          $unwind: { path: '$user', preserveNullAndEmptyArrays: true },
        },
        {
          $project: {
            'user._id': 0,
            'user.email': 0,
            'user.password': 0,
          },
        },
      ])
      .toArray()
    return res.send(result)
  } catch (err) {
    return res.status(500).send({ success: false })
  }
})

app.get('/api/navAccount/', async (req, res) => {
  try {
    const result = await client
      .db('oh-mypet')
      .collection('user')
      .aggregate([
        {
          $match: { $expr: { $eq: ['$_id', { $toObjectId: req.cookies.userID }] } },
        },
        {
          $project: {
            email: 0,
            lName: 0,
            password: 0,
          },
        },
      ])
      .toArray()
    return res.send(result)
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.get('/api/account/:id', async (req, res) => {
  try {
    const userID = req.cookies.userID
    let paramsID = req.params.id || 'me'
    if ((userID === undefined || userID === '') && paramsID === 'me') {
      return res.status(403).send({ success: false })
    } else if (paramsID === 'me') {
      paramsID = userID
    }
    const result = await client
      .db('oh-mypet')
      .collection('user')
      .aggregate([
        {
          $match: { $expr: { $eq: ['$_id', { $toObjectId: paramsID }] } },
        },
        {
          $project: {
            _id: 0,
            password: 0,
          },
        },
      ])
      .toArray()
    return res.send({ data: result, is_owner: userID === paramsID })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.get('/api/fetchMySellPost/:id', async (req, res) => {
  try {
    let paramsID = req.params.id
    if (paramsID === 'me') {
      paramsID = req.cookies.userID
    }
    const result = await client
      .db('oh-mypet')
      .collection('sellPost')
      .aggregate([
        {
          $match: { userID: new ObjectId(paramsID) },
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
            'user._id': 0,
            'user.password': 0,
          },
        },
      ])
      .sort({ petPostDate: -1 })
      .toArray()
    return res.send(result)
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.post('/api/editAccount', async (req, res) => {
  try {
    const { fName, lName, email, tel, line, facebook, twitter, instagram, address } = req.body
    const result = await client
      .db('oh-mypet')
      .collection('user')
      .aggregate([
        {
          $match: { email: email },
        },
        {
          $project: {
            _id: 0,
            password: 0,
          },
        },
      ])
      .toArray()
    if (result.length > 0 && result[0].email !== email) {
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
    await client
      .db('oh-mypet')
      .collection('user')
      .updateOne(
        { _id: new ObjectId(req.cookies.userID) },
        {
          $set: {
            fName,
            lName,
            email,
            tel,
            facebook,
            line,
            twitter,
            instagram,
            address,
          },
        },
      )
    return res.status(200).send({ success: true })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.post('/api/changePassword', async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body
    const result = await client
      .db('oh-mypet')
      .collection('user')
      .aggregate([
        {
          $match: { _id: new ObjectId(req.cookies.userID) },
        },
        {
          $project: {
            _id: 0,
            password: 1,
          },
        },
      ])
      .toArray()
    if (!(await bcrypt.compare(currentPassword, result[0].password))) {
      return res.status(400).send({ message: 'Current password is incorrect', success: false })
    } else if (newPassword !== confirmPassword) {
      return res.status(400).send({ message: 'password must be the same', success: false })
    } else if (currentPassword === '' || newPassword === '') {
      return res.status(400).send({ message: 'Bad Request', success: false })
    } else if (currentPassword === newPassword) {
      return res.status(400).send({ message: 'New password must be different from current password', success: false })
    }
    await client
      .db('oh-mypet')
      .collection('user')
      .updateOne(
        { _id: new ObjectId(req.cookies.userID) },
        {
          $set: {
            password: await bcrypt.hash(newPassword, 3),
          },
        },
      )
    return res.status(200).send({ success: true })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.delete('/api/deletePost/:postID', (req, res) => {
  try {
    const postId = req.params.postID
    client
      .db('oh-mypet')
      .collection('sellPost')
      .deleteOne({ _id: new ObjectId(postId) })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.get('/api/fetchFilterSellPost/:animal', async (req, res) => {
  try {
    const animal = req.params.animal
    const result = await client
      .db('oh-mypet')
      .collection('sellPost')
      .aggregate([
        {
          $match: { petType: animal },
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
            'user.email': 0,
            'user.password': 0,
          },
        },
      ])
      .sort({ petPostDate: -1 })
      .limit(100)
      .toArray()
    return res.send(result)
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.post('/api/newAdvPost', (req, res) => {
  const { title, postDesc } = req.body
  try {
    client
      .db('oh-mypet')
      .collection('advPost')
      .insertOne({
        userID: new ObjectId(req.cookies.userID),
        title,
        postDesc,
        postDate: new Date(Date.now()),
      })
    return res.status(201).send({
      message: 'New Adv Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
})

app.get('/api/fetchAdvPost', async (req, res) => {
  try {
    const result = await client
      .db('oh-mypet')
      .collection('advPost')
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
            'user.fName': 1,
            'user.lName': 1,
            'user.email': 1,
            'user._id': 1,
            title: 1,
            postDesc: 1,
            postDate: 1,
          },
        },
      ])
      .sort({ postDate: -1 })
      .limit(100)
      .toArray()
    return res.send(result)
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.post('/api/newComment', async (req, res) => {
  const { comment, advPostID } = req.body
  if (comment === '') {
    return res.status(400).send({
      message: 'Enter Comment',
      success: false,
    })
  }
  try {
    await client
      .db('oh-mypet')
      .collection('comment')
      .insertOne({
        userID: new ObjectId(req.cookies.userID),
        advPostID: new ObjectId(advPostID),
        comment,
        commentDate: new Date(Date.now()),
      })
    return res.status(201).send({
      message: 'New Comment Success',
      success: true,
    })
  } catch (error) {
    return res.status(500).send({ success: false })
  }
})
app.get('/api/fetchComment/:id', async (req, res) => {
  try {
    const result = await client
      .db('oh-mypet')
      .collection('comment')
      .aggregate([
        {
          $match: { advPostID: new ObjectId(req.params.id) },
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
            'user.fName': 1,
            'user.lName': 1,
            'user.email': 1,
            'user._id': 1,
            comment: 1,
            commentDate: 1,
          },
        },
      ])
      .sort({ commentDate: -1 })
      .limit(100)
      .toArray()
    return res.send(result)
  } catch (error) {
    res.status(500).send({ success: false })
  }
})
app.delete('/api/deleteComment/:commentID', (req, res) => {
  try {
    const commentID = req.params.commentID
    client
      .db('oh-mypet')
      .collection('comment')
      .deleteOne({ _id: new ObjectId(commentID) })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})
app.delete('/api/deleteAdvPost/:advPostID', (req, res) => {
  try {
    const advPostID = req.params.advPostID
    client
      .db('oh-mypet')
      .collection('advPost')
      .deleteOne({ _id: new ObjectId(advPostID) })
    return res.status(200).send({ success: true })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

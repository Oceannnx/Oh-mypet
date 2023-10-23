const express = require('express')
const { MongoClient } = require("mongodb");
const cors = require('cors')
const userModel = require('./models/signup')

const app = express()
const port = 3000
const uri = ('mongodb+srv://onosannnnt:admin123@cluster0.zx9nnzi.mongodb.net/oh-mypet')
app.use(express.json())
app.use(cors())

app.get('/signin')
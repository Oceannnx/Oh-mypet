const express = require('express')
const { MongoClient } = require("mongodb");
const cors = require('cors')

const app = express()
const port = 3000
const uri = ('mongodb+srv://onosannnnt:admin123@cluster0.zx9nnzi.mongodb.net/oh-mypet')
app.use(express.json())
app.use(cors())

// const client = MongoClient.connect(uri)
const client = new MongoClient(uri)

app.listen(port,() =>{
    console.log(`This server running on http:localhost:${port}`)
})

app.post('/signup', async(req,res) =>{
    try{
        const {username, password} = req.body
        const user = {
            username,
            password,
        }
        await client.db('oh-mypet').collection('user')
        .insertOne(user)
        res.status(200).send({
            message:"success"
        })
    }catch{
        console.log(err)
    }

})

app.post('/login', async(req,res) =>{
    try{
        const {username, password} = req.body
        const user = {
        username,
        password,
    }
    await client.db('oh-mypet').collection('user')
    .find(user)
    }catch{
        console.log(err)
    }
    
})
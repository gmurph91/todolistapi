const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.POR || 3005
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://admin:HEeZd1WTYti5VuRR@cluster0-iagdt.mongodb.net/test?retryWrites=true&w=majority'
const instance = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true})

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());

  app.post('/post', (req, res) => {
    instance.connect((err, client) => {
      if (err) res.send(err)
      const collection = client.db("todolist").collection("todolist")
      collection.insertOne(req.body).then(r => res.send(r.ops))
    })
  })
   
  app.get('/get', (req, res) => {
    instance.connect((err, client) => {
      if (err) res.send(err)
      const collection = client.db("todolist").collection("todolist")
      collection.find().toArray().then(r => res.send(r))
    })
  }) 

  app.put("/update/:id", (req, res) => {
    instance.connect((err, client) => {
      if (err) res.send(err)
      const collection = client.db("todolist").collection("todolist")
      collection.replaceOne(
        { "_id": mongodb.ObjectId(req.params.id) }, 
        req.body,
        {upsert: true}
      ).then(r => res.send(r.ops))
    })
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
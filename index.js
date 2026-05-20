const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
app.use(express.json());
dotenv.config();
const port = process.env.PORT;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { createRemoteJWKSet, jwtVerify } = require('jose-cjs');
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    await client.connect();

    const db = client.db('ideavault');
    const ideaCollection = db.collection('ideas');
    const commentCollection = db.collection('comment');

    app.get('/trending-ideas', async (req, res) => {
      const result = await ideaCollection.find().limit(6).toArray();
      res.json(result)
    })

    app.post('/all-ideas', async (req, res) => {
      const idea = req.body;

      const result = await ideaCollection.insertOne(idea);
      res.json(result)
    })

    app.get('/all-ideas/:id',async (req, res) => {
      const { id } = req.params;
      const result = await ideaCollection.findOne({ _id: new ObjectId(id) });
      res.json(result)
    })

    app.get('/all-ideas', async (req, res) => {

      const search = req.query.search || '';
      const category = req.query.category || '';

      const query = {};

      if (search) {

        query.ideaTitle = {
          $regex: search,
          $options: "i"
        }

      }
      if (category) {
        query.category = category
      }

      const result = await ideaCollection.find(query).toArray();

      res.json(result)
    });

    app.post('/comments', async (req, res) => {
      const comment = req.body;

      const result = await commentCollection.insertOne(comment);
      res.json(result)
    })
    app.get('/comments', async (req, res) => {
      const result = await commentCollection.find().toArray();
      res.json(result)
    })




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', async (req, res) => {
  res.send('Server is running fine!   ')
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
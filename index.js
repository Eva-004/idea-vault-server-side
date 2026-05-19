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
   


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',async(req,res)=>{
    res.send('Server is running fine!   ')
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
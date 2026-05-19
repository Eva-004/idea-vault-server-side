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

app.get('/',async(req,res)=>{
    res.send('Server is running fine!   ')
})


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
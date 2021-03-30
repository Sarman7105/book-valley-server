const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0q0ko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('error',err );
    const bookCollection = client.db("book-shop").collection("books");
    // bookCollection.insertOne('sochib');
    console.log('database connected successfully');
  // perform actions on the collection object
//   client.close();
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
    console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
})
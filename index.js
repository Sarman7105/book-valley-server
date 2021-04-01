const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config()

const port = process.env.PORT || 5055;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
	res.send('Hello World!');
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.0q0ko.mongodb.net/${process.env
	.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
	// console.log('error',err );
	const bookCollection = client.db('book-shop').collection('books');
	const orderCollection = client.db('book-shop').collection('orders');
	
	app.post('/addBook', (req, res) => {
      const newEvent = req.body;
    //   console.log('adding new event: ', newEvent)
      bookCollection.insertOne(newEvent)
      .then(result => {
          console.log('inserted count', result.insertedCount);
          res.send(result.insertedCount > 0)
      })
	})
	app.post('/addOrder', (req, res) => {
      const newOrder = req.body;
		console.log('adding new order: ', newOrder);
      orderCollection.insertOne(newOrder)
      .then(result => {
          console.log('inserted count', result.insertedCount);
          res.send(result.insertedCount > 0)
      })
	})
	app.get('/books', (req, res) => {
		bookCollection.find().toArray((err,items) => {
			res.send(items);
		})
	})
	
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
	// console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME);
});

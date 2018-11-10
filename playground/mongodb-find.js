const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todos').find({
  //   _id: new ObjectID('5be3bbbdf7c9670a7e3563f5')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })
  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos Count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // })
  db.collection('Users').find({
    name: 'Bryan'
  }).toArray().then((docs) => {
    console.log('Bryans');
    console.log(JSON.stringify(docs, null, 2));
  })
  //db.close();
});

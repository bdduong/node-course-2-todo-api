const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // })
  // db.collection('Todos').findOneAndDelete({completed: false}).then(result => {
  //   console.log(result);
  // })
  db.collection('Users').deleteMany({name: 'Bryan'}).then((result) => {
    console.log(result);
  })
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5be1a30d53d229006a5af460')}).then((result) => {
    console.log(result);
  })
  //db.close();
});

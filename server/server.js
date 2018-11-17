const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 9000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  const todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message: 'Bad id'});
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({});
    }
    return res.send({todo});
  }, (e) => {
    res.status(400).send({});
  })
})

app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).send({message: 'Bad id'});
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send({message: 'Id not found'})
    }
    return res.status(200).send({message: `Todo ${todo.text} deleted!`})
  }, (e) => {
    res.status(400).send();
  })
})

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})

module.exports = {app};

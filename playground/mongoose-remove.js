const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findByIdAndRemove('5bf087dbf7c9670a7e35941f').then((todo) => {
  console.log(todo);
})

const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   })
// })

const hashedPassword = '$2a$10$AR14DOoGNnMMg3KSgTsfaeUK5TdTgITMtdudQWvotYNlstEJqBlia';
bcrypt.compare(password, hashedPassword, (err, result) => {
  console.log(result);
  return result;
})

// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, '123abc');
// console.log(`here is jot token: ${token}`)
//
// var decoded = jwt.verify(token, '123abc');
// console.log('decoded: ', decoded);

// let message = 'I am user number 3';
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// const data = {
//   id: 4
// }
//
// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if (resultHash === token.hash) {
//   console.log('Data not changed')
// } else {
//   console.log('Data was changed. Do not trust');
// }

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'gangnam').toString();
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  })
}

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
}

UserSchema.statics.findByToken = function(token) {
  const User = this;
  let decoded;
  try {
    decoded = jwt.verify(token, 'gangnam');
  } catch(e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
}

UserSchema.statics.findByCredentials = function(email, password) {
  const User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          resolve(user);
        } else {
          reject();
        }
      })
    })
  });
}

UserSchema.pre('save', function(next) {
  const user = this;
  if (user.isModified('password')) {
    const pw = user.password;
    let hashed;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pw, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    })
  } else {
    next();
  }

})

const User = mongoose.model('User', UserSchema);

module.exports = {User};

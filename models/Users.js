const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tokens = require('./tokens')
const bcrypt = require('bcryptjs')

// Create Schema
const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      firsName: {
        type: String,
        unique:false,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        unique: false,
        required: true,
        trim: true
      },
      phoneNumber: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
        minlength: 6 
      },

      tokens:[Tokens.schema]
})


UserSchema.pre('save', function (next) {
  let user = this 

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash 
        next() 
      }) 
    }) 
  } else {
    next() 
  }
}) 
module.exports = User = mongoose.model('user', UserSchema)
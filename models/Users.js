const mongoose = require('mongoose')
const Tokens = require('./tokens')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const configs = require('../Config/Node-Config')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  firstName: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isNumeric,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  type: {
    type: String,
    required: false
  },
  birthDate: {
    type: Date
  },

  tokens: [Tokens.schema]
})


async function AuthToken(user){
  let access = 'auth' 
  let token = jwt.sign({_id: user._id.toHexString(), access}, configs.mySecert).toString()
  user.tokens.push({access, token})  
  await user.save()
  return token
}

async function hashPassword(user, next){
  salt = await bcrypt.genSalt(10)
  hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
}





UserSchema.methods.generateAuthToken = function () {
  let user = this 
  return AuthToken(user)
} 


// Hash the user's password before each save
UserSchema.pre('save', function (next,err) {
  let user = this
  if (user.isModified('password')) { hashPassword(user,next).catch(err) } else { next() }
})

Users = mongoose.model('user', UserSchema)
module.exports = {Users}
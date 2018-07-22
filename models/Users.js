const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tokens = require('./tokens')
const bcrypt = require('bcryptjs')

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
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
    trim: true
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

async function hashPassword(user, next){
  salt = await bcrypt.genSalt(10)
  hash = await bcrypt.hash(user.password, salt)
  user.password = hash
  next()
}



// Hash the user's password before each save
UserSchema.pre('save', function (next,err) {
  let user = this
  if (user.isModified('password')) { hashPassword(user,next).catch(err) } else { next() }
})



module.exports = User = mongoose.model('user', UserSchema)
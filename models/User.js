const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const UserSchema = new Schema({})

module.exports = User = mongoose.model('user', UserSchema)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: false,
    unique: false,
  },
  lastName: {
    type: String,
    required: false,
    unique: false,
  },
  userName: {
    type: String,
    required: false,
    sparse: true,
    unique: true,
  },
  token: String,
}, {
  timestamps: true,
  toObject: {
    // remove `hashedPassword` field when we call `.toObject`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    },
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
})

userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName
})
userSchema.virtual('hasFullName').get(function () {
  if(this.firstName || this.lastName){
    return true
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User

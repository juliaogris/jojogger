const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      isAsync: false,
      validator: validator.isEmail,
      message: 'Invalid email address.'
    },
    required: 'Email address missing.'
  },
  password: {
    type: String,
    validate: {
      isAsync: false,
      validator: (s) => validator.isLength(s, {min: 6}),
      message: 'Password too short. Minimum 6 characters.'
    },
    required: 'Password missing.'
  },
  role: {
    type: String,
    enum: ['regular', 'manager', 'admin'],
    default: 'regular'
  }
})

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.verifyPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}

UserSchema.statics.getErrorMessage = (err) => {
  if (!err || !err.errors) {
    return ''
  }
  const errors = err.errors
  const extractMessage = key => err.errors[key].message
  return Object.keys(errors).map(extractMessage).join(' ')
}

module.exports = mongoose.model('User', UserSchema)

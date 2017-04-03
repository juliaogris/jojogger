const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new BasicStrategy((email, password, callback) => {
  User.findOne({ email }, function (err, user) {
    if (err) {
      return callback(err)
    }
    if (!user) {
      return callback(null, false)
    }
    user.verifyPassword(password, function (err, isMatch) {
      if (err) {
        return callback(err)
      }

      if (!isMatch) {
        return callback(null, false)
      }

      return callback(null, user)
    })
  })
}
))

exports.isAuthed = passport.authenticate('basic', { session: false })

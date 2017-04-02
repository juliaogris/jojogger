var passport = require('passport')
var BasicStrategy = require('passport-http').BasicStrategy
var User = require('../models/user')

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

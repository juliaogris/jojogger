const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.use(new BasicStrategy((username, password, done) => {
  User.findOne({ username }, function (err, user) {
    if (err) {
      return done(err, false)
    }
    if (!user) {
      return done(null, false)
    }
    user.verifyPassword(password, function (err, isMatch) {
      if (err) {
        return done(err)
      }

      if (!isMatch) {
        return done(null, false)
      }

      return done(null, user)
    })
  })
}
))

exports.isAuthed = passport.authenticate('basic', { session: false })

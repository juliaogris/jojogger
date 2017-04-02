const User = require('../models/user')

exports.validateNewUser = (req, res, next) => {
  req.checkBody('email', 'Invalid email address.').isEmail()
  req.sanitizeBody('email').normalizeEmail({ remove_dots: false, remove_extension: false, gmail_remove_subaddress: false })
  req.checkBody('password', 'Password too short, minimum 6 characters.').isLength({ min: 6 })

  const errors = req.validationErrors()
  if (errors) {
    const message = errors.map(e => { console.log('e.msg', e.msg); return e.msg }).join(' ')
    res.status(400).send({error: { message, code: 101 }})
    return
  }
  next()
}

// Access all users / create new user
// api/users
exports.postUser = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      if (err.code === 11000) {
        return res.status(400).send({
          error: {
            message: `User '${user.email}' already exists.`,
            code: '100'
          }
        })
      }
      return res.status(500).send(err)
    }
    res.json({ message: `Created user '${user.email}'.` })
  })
}

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json(users)
  })
}

// Access individual users
// api/users/:uid
exports.getUser = (req, res) => {
  const id = req.params.uid
  User.findById(id, (err, user) => {
    if (err) {
      if (err.name === 'CastError') {
        res.status(400).send({
          error: {
            code: 400,
            message: `Invalid user id '${id}'.`
          }})
        return
      }
      res.status(500).send(err)
      return
    }
    if (!user) {
      res.status(400).send({
        error: {
          code: 400,
          message: `No user found with id '${id}'.`
        }})
      return
    }
    console.log(`user: ${user}`)
    res.json(user)
  })
}

exports.putUser = (req, res) => {
  User.findById(req.params.uid, (err, user) => {
    if (err) {
      res.status(500).send(err)
    }
    user.email = req.body.email || user.email
    user.password = req.body.password || user.password
    const newRole = req.body.role
    const authedRole = req.user.role
    if (newRole && authedRole !== 'admin') {
      res.status(403).send({
        error: {
          code: 201,
          message: 'Only admins can update roles.'
        }})
      return
    }
    user.save((err) => {
      if (err) {
        res.send(err)
      }
      res.json({ message: `Updated user '${user.email}'.` })
    })
  })
}

exports.deleteUser = (req, res) => {
  // TODO remove all records for user!!
  const user = res.locals.user
  const email = user.email
  user.remove((err, user) => {
    if (err) {
      res.send(err)
    }
    res.json({ message: `Removed user '${email}'.` })
  })
}

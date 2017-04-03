const User = require('../models/user')
const getErrorMessage = require('../util/funcs').getErrorMessage

const makeErr = (code, message) => ({ error: { code, message } })

// GET, POST /api/users
exports.postUser = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  })

  user.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(makeErr(303, getErrorMessage(err)))
      }
      if (err.code === 11000) {
        const message = `User '${user.email}' already exists.`
        return res.status(400).send(makeErr(100, message))
      }
      return res.status(500).send(err)
    }
    const message = `Created user '${user.email}'.`
    const uid = user._id
    res.json({ message, uid })
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

// GET, PUT, DELETE /api/users/:uid
const handleFindUserError = (req, res, err, user) => {
  const uid = req.params.uid
  if (err) {
    if (err.name === 'CastError') {
      const message = `Invalid user id '${uid}'.`
      return res.status(400).send(makeErr(400, message))
    }
    return res.status(500).send(err)
  }
  if (!user) {
    const message = `No user found with id '${uid}'.`
    return res.status(400).send(makeErr(400, message))
  }
}

exports.getUser = (req, res) => {
  const uid = req.params.uid
  User.findById(uid, (err, user) => {
    if (err || !user) {
      return handleFindUserError(req, res, err, user)
    }
    res.json(user)
  })
}

exports.putUser = (req, res) => {
  const uid = req.params.uid
  User.findById(uid, (err, user) => {
    if (err || !user) {
      return handleFindUserError(req, res, err, user)
    }
    const origUser = user.toJSON()
    user.email = req.body.email || origUser.email
    user.password = req.body.password || origUser.password
    if (req.body.role && req.user.role !== 'admin') {
      const message = 'Only admins can update roles.'
      return res.status(403).send(makeErr(201, message))
    }
    const authedId = String(req.user._id)
    if (user.role === 'admin' && authedId !== uid) {
      return res.status(403).send(makeErr(201, 'Cannot update admin users.'))
    }
    user.role = req.body.role || origUser.role
    user.save((err) => {
      if (err) {
        if (err.name === 'ValidationError') {
          return res.status(400).send(makeErr(303, getErrorMessage(err)))
        }
        return res.status(500).send(err)
      }
      let message = `Updated user '${user.email}'.`
      message += (origUser.email !== user.email) && ` Before: ${origUser.email}`
      res.json({ message })
    })
  })
}

exports.deleteUser = (req, res) => {
  const uid = req.params.uid
  User.findById(uid, (err, user) => {
    if (err || !user) {
      return handleFindUserError(req, res, err, user)
    }
    const authedId = String(req.user._id)
    if (user.role === 'admin' && authedId !== uid) {
      return res.status(403).send(makeErr(201, 'Cannot delete admin users.'))
    }
    user.remove((err, u) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({ message: `Removed user '${u.email}'.` })
    })
  })
}

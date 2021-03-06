const getErrorMessage = require('../util/funcs').getErrorMessage
const mongoose = require('mongoose')
const Jog = mongoose.model('Jog')

const makeErr = (code, message) => ({ error: { code, message } })
const compareJogs = (a, b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0)

const extractJog = (jog) => {
  const { date, duration, distance, _id } = jog
  return { date, duration, distance, id: _id }
}

// GET, POST /api/users/:uid/jogs
exports.postJog = (req, res) => {
  const { date, duration, distance } = req.body
  const uid = req.params.uid
  const jog = new Jog({ date, duration, distance, uid })

  jog.save((err) => {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).send(makeErr(303, getErrorMessage(err)))
      }
      return res.status(500).send(err)
    }
    const message = `Created jog '${jog._id}'.`
    res.json({ message, data: extractJog(jog) })
  })
}

exports.getJogs = (req, res) => {
  const uid = req.params.uid
  Jog.find({ uid }, (err, jogs) => {
    if (err) {
      return res.status(500).send(err)
    }
    const result = jogs.map(extractJog)
    result.sort(compareJogs)
    res.json(result)
  })
}

exports.deleteJogs = (req, res) => {
  const uid = req.params.uid
  Jog.remove({ uid }, (err, jogs) => {
    if (err) {
      return res.status(500).send(err)
    }
    res.json({ message: `Deleted jogs for user ${req.user.email}.` })
  })
}

// PUT, DELETE /api/users/:uid/jogs/:id
const handleFindJogError = (req, res, err, jogs) => {
  const id = req.params.id
  if (err) {
    if (err.name === 'CastError') {
      const message = `Invalid jog id '${id}'.`
      return res.status(400).send(makeErr(400, message))
    }
    return res.status(500).send(err)
  }
  if (!jogs || jogs.length === 0) {
    const message = `No jog found with id '${id}' for user ${req.user.email}.`
    return res.status(400).send(makeErr(400, message))
  }
}

exports.getJog = (req, res) => {
  const _id = req.params.id
  const uid = req.params.uid
  Jog.find({ _id, uid }, (err, jogs) => {
    if (err || !jogs || jogs.length === 0) {
      return handleFindJogError(req, res, err, jogs)
    }
    res.json(extractJog(jogs[0]))
  })
}

exports.putJog = (req, res) => {
  const _id = req.params.id
  const uid = req.params.uid
  Jog.find({ _id, uid }, (err, jogs) => {
    if (err || !jogs || jogs.length === 0) {
      return handleFindJogError(req, res, err, jogs)
    }
    const jog = jogs[0]
    jog.date = req.body.date || jog.date
    jog.duration = req.body.duration || jog.duration
    jog.distance = req.body.distance || jog.distance
    jog.save((err) => {
      if (err) {
        if (err.name === 'ValidationError') {
          return res.status(400).send(makeErr(303, getErrorMessage(err)))
        }
        return res.status(500).send(err)
      }
      res.json({ message: `Updated jog '${jog._id}'.` })
    })
  })
}

exports.deleteJog = (req, res) => {
  const _id = req.params.id
  const uid = req.params.uid
  Jog.find({ _id, uid }, (err, jogs) => {
    if (err || !jogs || jogs.length === 0) {
      return handleFindJogError(req, res, err, jogs)
    }
    jogs[0].remove((err, j) => {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({ message: `Removed jog '${j._id}'.` })
    })
  })
}

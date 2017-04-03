const mongoose = require('mongoose')
const moment = require('moment')
const durationValidator = require('../util/funcs').durationValidator

const JogSchema = new mongoose.Schema({
  date: {
    type: String,
    validate: {
      validator: s => moment(s, 'YYYY-MM-DD').isValid(),
      message: "Invalid date format. Use '2017-01-23'."
    },
    required: 'Date missing.'
  },
  duration: {
    type: String,
    validate: {
      isAsync: false,
      validator: durationValidator,
      message: "Invalid duration format. Use '25:01:23'"
    },
    required: 'Duration missing.'
  },
  distance: {
    type: Number,
    validate: {
      isAsync: false,
      validator: s => Number(s) >= 0,
      message: "Invalid distance format. Must be greater 0.0'"
    },
    required: 'Distance missing.'
  }
})

module.exports = mongoose.model('User', JogSchema)

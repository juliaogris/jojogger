const moment = require('moment')

module.exports.getErrorMessage = (err) => {
  if (!err || !err.errors) {
    return ''
  }
  const errors = err.errors
  const extractMessage = key => err.errors[key].message
  return Object.keys(errors).map(extractMessage).join(' ')
}

module.exports.durationValidator = (duration) => {
  // expected format: hh:mm:ss  hh: '00' ... '99'
  if (!moment(duration.substring(2), ':mm:ss').isValid()) {
    return false
  }
  return Number(duration.substring(0, 2)) >= 0
}

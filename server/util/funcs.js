module.exports.getErrorMessage = (err) => {
  if (!err || !err.errors) {
    return ''
  }
  const errors = err.errors
  const extractMessage = key => err.errors[key].message
  return Object.keys(errors).map(extractMessage).join(' ')
}


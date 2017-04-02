const accessError = {
  'error': {
    'message': 'User does not have access rights.',
    'code': '200'
  }
}

exports.canAccessUsers = (req, res, next) => {
  const role = req.user.role
  if (role !== 'admin' && role !== 'manager') {
    res.status(403).send(accessError)
    console.log('Can access users. ERR')
    return
  }
  console.log('Can access users. OK')
  next()
}

exports.canAccessUser = (req, res, next) => {
  const authedId = String(req.user._id)
  const authedRole = req.user.role
  const userId = req.params.uid
  if (authedRole !== 'admin' && authedRole !== 'manager' && userId !== authedId) {
    res.status(403).send(accessError)
    console.log('access bad.')
    return
  }
  console.log('access good.')
  next()
}

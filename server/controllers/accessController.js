const accessError = {
  'error': {
    'message': 'User does not have access rights.',
    'code': 200
  }
}

exports.canAccessUsers = (req, res, next) => {
  const role = req.user.role
  if (role !== 'admin' && role !== 'manager') {
    return res.status(403).send(accessError)
  }
  next()
}

exports.canAccessUser = (req, res, next) => {
  const authedId = String(req.user._id)
  const authedRole = req.user.role
  const userId = req.params.uid
  if (authedRole !== 'admin' && authedRole !== 'manager' && userId !== authedId) {
    return res.status(403).send(accessError)
  }
  next()
}

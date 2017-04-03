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
  const authedUserId = String(req.user._id)
  const authedUserRole = req.user.role
  const requestUserId = req.params.uid
  if (authedUserRole !== 'admin' && authedUserRole !== 'manager' &&
      requestUserId !== authedUserId) {
    return res.status(403).send(accessError)
  }
  next()
}

exports.canAccessJogs = (req, res, next) => {
  const authedUserId = String(req.user._id)
  const authedUserRole = req.user.role
  const requestUserId = req.params.uid
  if (authedUserRole !== 'admin' && requestUserId !== authedUserId) {
    return res.status(403).send(accessError)
  }
  next()
}

const express = require('express')
const userController = require('../controllers/userController')
const isAuthed = require('../controllers/authController').isAuthed
const accessController = require('../controllers/accessController')

const apiRouter = express.Router()
apiRouter.get('/', (req, res) => {
  res.set('Content-Type', 'application/json')
  res.send('{"message":"Hello from the custom server!"}')
})

const { canAccessUsers } = accessController
const { getUsers, postUser, validateNewUser } = userController
apiRouter.route('/users')
  .post(validateNewUser, postUser)
  .get(isAuthed, canAccessUsers, getUsers)

const { canAccessUser } = accessController
const { getUser, putUser, deleteUser } = userController
apiRouter.route('/users/:uid')
  .get(isAuthed, canAccessUser, getUser)
  .put(isAuthed, canAccessUser, putUser)
  .delete(isAuthed, canAccessUser, deleteUser)

const notFound = (req, res) => {
  res.status(404).send({
    error: {
      code: 404,
      message: `Cannot ${req.method} ${req.path}`
    }})
}
apiRouter.route('*').all(notFound)
module.exports = apiRouter

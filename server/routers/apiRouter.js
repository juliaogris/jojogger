const express = require('express')
const isAuthed = require('../controllers/authController').isAuthed
const userController = require('../controllers/userController')
const jogController = require('../controllers/jogController')
const accessController = require('../controllers/accessController')
const notFound = require('../util/funcs').notFound

const { canAccessUsers, canAccessUser, canAccessJogs } = accessController
const { getUsers, postUser } = userController
const { login, getUser, putUser, deleteUser } = userController
const { getJogs, postJog, deleteJogs } = jogController
const { getJog, putJog, deleteJog } = jogController
const apiRouter = express.Router()

apiRouter.route('/login')
  .get(isAuthed, login)

apiRouter.route('/users')
  .post(postUser)
  .get(isAuthed, canAccessUsers, getUsers)

apiRouter.route('/users/:uid')
  .get(isAuthed, canAccessUser, getUser)
  .put(isAuthed, canAccessUser, putUser)
  .delete(isAuthed, canAccessUser, deleteUser)

apiRouter.route('/users/:uid/jogs')
  .post(isAuthed, canAccessJogs, postJog)
  .get(isAuthed, canAccessJogs, getJogs)
  .delete(isAuthed, canAccessJogs, deleteJogs)

apiRouter.route('/users/:uid/jogs/:id')
  .get(isAuthed, canAccessJogs, getJog)
  .put(isAuthed, canAccessJogs, putJog)
  .delete(isAuthed, canAccessJogs, deleteJog)

apiRouter.route('*').all(notFound)
module.exports = apiRouter

const express = require('express')
const path = require('path')
const emojiFavicon = require('emoji-favicon')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const pretty = require('express-prettify')
const morgan = require('morgan')
const passport = require('passport')

const dbInit = require('./util/dbInit')
const apiRouter = require('./routers/apiRouter')

const app = express()
const REACT_DIR = path.resolve(__dirname, '../react-ui/build')
const REACT_INDEX_HTML = path.resolve(REACT_DIR, 'index.html')

app.use(express.static(REACT_DIR))
app.use(bodyParser.json())
app.use(expressValidator())
app.use(morgan('dev'))
app.use(pretty({ query: 'pretty' }))
app.use(passport.initialize())

app.use(emojiFavicon('runner'))
app.use('/api', apiRouter)
app.use((err, req, res, next) => {
  console.log(err)
  console.log(err.stack)
  res.status(err.status || 500).send({'Error': err.stack})
})

app.get('*', (req, res) => res.sendFile(REACT_INDEX_HTML))

dbInit(() => { app.listen(process.env.PORT) })

var express = require('express')
var app = express()

if (app.get('env') === 'production') {
  app.use((req, res, next) => {
    if (req.header['x-forwarded-proto'] !== 'https') {
      res.redirect("https://#{req.header 'host'}#{req.url}")
    } else {
      next()
    }
  })
}

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(process.env.PORT)

// const express = require('express')
// const path = require('path')
// const sslRedirect = require('heroku-ssl-redirect')
// const emojiFavicon = require('emoji-favicon')
// const bodyParser = require('body-parser')
// const expressValidator = require('express-validator')
// const pretty = require('express-prettify')
// const morgan = require('morgan')
// const passport = require('passport')

// const dbInit = require('./util/dbInit')
// const apiRouter = require('./routers/apiRouter')

// const app = express()
// const REACT_DIR = path.resolve(__dirname, '../react-ui/build')
// const REACT_INDEX_HTML = path.resolve(REACT_DIR, 'index.html')

// app.use(express.static(REACT_DIR))
// app.use(bodyParser.json())
// app.use(expressValidator())
// app.use(morgan('dev'))
// app.use(pretty({ query: 'pretty' }))
// app.use(passport.initialize())
// app.use(sslRedirect())

// dbInit(() => { app.listen(process.env.PORT) })
// app.use(emojiFavicon('runner'))
// app.use('/api', apiRouter)
// app.get('*', (req, res) => res.sendFile(REACT_INDEX_HTML))

var mongoose = require('mongoose')

module.exports = (done) => {
  mongoose.Promise = global.Promise
  const options = {
    server: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 300000,
        connectTimeoutMS: 30000
      }
    }
  }

  mongoose.connect(process.env.MONGODB_URI, options)
  const connection = mongoose.connection

  connection.on('error', console.error.bind(console, 'connection error:'))

  connection.once('open', function () {
    done()
  })
}

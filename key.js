const mongoose = require('mongoose')


const keySchema = mongoose.Schema({
  key: String
  })

module.exports = mongoose.model('newKey', keySchema)

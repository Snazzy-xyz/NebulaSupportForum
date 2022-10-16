const mongoose = require('mongoose')


const dataSchema = mongoose.Schema({
  username: String,
  isproxy: Boolean,
  issue: String,
  communitycheck: Boolean,
  usedgoogle: Boolean
  })

module.exports = mongoose.model('newData', dataSchema)

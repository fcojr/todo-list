const mongoose = require('mongoose')
mongoose.Promite = global.Promise
module.exports = mongoose.connect('mongodb://localhost/todo')
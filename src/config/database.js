const mongoose = require('mongoose')
mongoose.Promite = global.Promise
module.exports = mongoose.connect('mongodb:fcojr:55275654@ds225608.mlab.com:25608/todo-list-db')
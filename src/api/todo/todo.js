const restful = require('node-restful')
const mongoose = restful.mongoose
const todoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    dueDate: {type: Date, required: true},
    id: {type: Number, required: true},
    creationTime: {type: Date, default: Date.now},
    isDone: {type: Boolean, defaukt: false}
})
module.exports = restful.model('Todo', todoSchema)
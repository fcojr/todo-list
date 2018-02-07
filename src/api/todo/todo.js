const restful = require('node-restful')
const mongoose = restful.mongoose
const todoSchema = new mongoose.Schema({
    text: {type: String, required: true},
    dueDate: {type: Date, required: true, default: Date.now},
    id: {type: Number, required: true},
    creationTime: {type: Date, default: Date.now},
    isDone: {type: Boolean, default: false}
})
const parentSchema = new mongoose.Schema({
    tasks: [todoSchema]
})
module.exports = restful.model('Todo', parentSchema)
const express = require('express')
module.exports = server => {
    const router = express.Router()
    server.use('/api', router)
    const todoServer = require('../api/todo/todoService')
    todoServer.register(router, '/todos')
}
const port = 3003
const express = require('express')
const server = express()
const cors = require('cors')
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json())
server.use(cors())
server.listen(port, () =>{
    console.log(`servidor rodando na porta ${port}`)
})
module.exports = server
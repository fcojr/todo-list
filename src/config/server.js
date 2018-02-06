const port = 3003
const express = require('express')
const server = express()
var bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({extended : true}));
server.use(bodyParser.json())
server.listen(port, () =>{
    console.log(`servidor rodando na porta ${port}`)
})
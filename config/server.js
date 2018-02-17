const port = Number(process.env.PORT || 3001)
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
const mongoose = require('mongoose')
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://fcojr:55275654@ds225608.mlab.com:25608/todo-list-db';
 
mongoose.connect(mongodbUri, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  console.log(" conectado ")                         
});
var ObjectId = require('mongodb').ObjectID;
var id = new ObjectId()
//module.exports = server

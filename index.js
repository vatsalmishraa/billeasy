const express = require('express')
var bodyParser = require('body-parser')
const config = require('./config.json')
const users = require('./users')
const product = require('./product')
const app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}))
app.get('/users',users.getUsers)
app.post('/product',product.insertProd)

app.listen(config.port,()=>{
    console.log('app listening on port',config.port)
})


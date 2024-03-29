const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
let api = require('./server/routes/api')
api= api.router

const app = express()
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

//========================================================

const port = 3000
app.listen(process.env.PORT || port, function(){
    console.log(`Running server on port ${port}`)
})
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const env = require('env2')('.env')
const timeout = require('connect-timeout')


const dbURI = process.env.MONGODB_URI
//DB Setup
mongoose.connect(dbURI)

//App Setup
//middleware
// app.use(morgan('combined'))
app.use(bodyParser.json({ type: '*/*'}))
app.use(cookieParser())
app.use('/public', express.static(__dirname + '/public'))
app.use(timeout(30000))

router(app)
//Server Setup
const port = process.env.PORT || 5000
const server = http.createServer(app)
server.listen(port)
console.log('Server listing on :', port)
app.use(haltOnTimedout)

function haltOnTimedout(req, res, next){
    res.sendFile(__dirname + '/public/timeout.html')
}

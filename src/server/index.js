const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// revisit this
const mockAPIResponse = require('./mockAPI.js')

// secure MeaningCloud's api key as environment variable
// MeaningCloud's api key referenced as process.env.API_KEY
const dotenv = require('dotenv');


dotenv.config();
// revisit this
var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
// routing of site to directory of bundled assets
app.use(express.static('dist'))

//revisit this
console.log(JSON.stringify(mockAPIResponse))
console.log(__dirname)

// routing for loading site
app.get('/', function (req, res) {
    res.sendFile("dist/index.html");
    // revisit this
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// post method to recieve the URL from the client side

// designates what port the app will listen to for incoming requests
// should be something diff than dev envmt
app.listen(8081, function () {
    console.log('App listening on port 8081!')
})

//revisit this
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


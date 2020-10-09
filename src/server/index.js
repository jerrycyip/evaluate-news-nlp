/* secure MeaningCloud's api key as environment variable
via dotenv package */
const dotenv = require('dotenv');
dotenv.config();
/* environment variables for MeaningCloud's api key will 
 be referenced as process.env.API_KEY */

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))
// routing of site to directory of bundled assets
app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))
console.log(__dirname)

// routing for loading site
app.get('/', function (req, res) {
    // updated to html specific file instead of orig: ('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
// should be something diff than dev envmt
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// post method to recieve the URL from the client side

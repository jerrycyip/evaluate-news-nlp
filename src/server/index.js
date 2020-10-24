const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
//const axios = require("axios");

// create the Express app
const app = express()

// revisit this
const mockAPIResponse = require('./mockAPI.js')

// secure MeaningCloud's api key as an environment variable
const dotenv = require('dotenv');
dotenv.config();

// store MeaningCloud's api key
const apiKey = process.env.API_KEY
//console.log(`Your API Key is ${process.env.API_KEY}`);

const fetch = require('node-fetch');

// revisit this
var json = {
    'title': 'test json response',
    'message': 'this is a message',
    'time': 'now'
}

// Enable CORS requests
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
    //res.sendFile("dist/index.html");
    // revisit this - dev envmt
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// post method to recieve the URL from the client side
app.post('/api', analyzeAPI);

async function analyzeAPI(req, res) {
    let inputURL = req.body.url;
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${inputURL}&lang=en`

    const response = await fetch(sentimentURL);
    try {
        const sentimentData = await response.json();
        const sentimentInfo = {
            score_tag: sentimentData.score_tag,
            agreement: sentimentData.agreement,
            subjectivity: sentimentData.subjectivity,
            confidence: sentimentData.confidence,
            irony: sentimentData.irony
        }
        console.log(sentimentInfo);
        res.send(sentimentInfo);
    }
    catch (error) {
        console.log("error occured:", error);
    }

}


// designates what port the app will listen to for incoming requests
// should be something diff than dev envmt
app.listen(8082, function () {
    console.log('App listening on port 8082!')
})

//revisit this
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


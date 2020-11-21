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

// routing for loading site
app.get('/', function (req, res) {
    //res.sendFile("dist/index.html");
    // revisit this - dev envmt
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// post method to recieve the URL from the client side
app.post('/api', callApis);

async function callApis(req, res) {
    const sentimentInfo = await sentimentAPI(req, res);
    const summaryInfo = await summaryAPI(req, res);
    switch(sentimentInfo.score_tag){
        case "P+":
            sentimentInfo.score_tag = "strong positive";
            break;
        case "P":
            sentimentInfo.score_tag = "positive";
            break;
        case "NEU":
            sentimentInfo.score_tag = "neutral";
            break;
        case "N":
            sentimentInfo.score_tag = "negative";
            break;
        case "N+":
            sentimentInfo.score_tag = "strong negative";
            break;
        case "NONE":
            sentimentInfo.score_tag = "no sentiment detected";
            break;
    }
    sentimentInfo.summary = summaryInfo;
    console.log("sentimentInfo: ", sentimentInfo);
    res.send(sentimentInfo);
}

async function summaryAPI(req, res) {
    let inputURL = req.body.url;
    const summaryURL = `http://api.meaningcloud.com/summarization-1.0?key=${apiKey}&url=${inputURL}&sentences=3`
    
    const response = await fetch(summaryURL);
    try {
        const summaryData = await response.json()
        const summary = summaryData.summary
       // console.log(summary);
        return summary;
    }
    catch (error) {
        console.log("error occured:", error);
    }
}

async function sentimentAPI(req, res) {
    let inputURL = req.body.url;
    const sentimentURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${inputURL}&lang=en`
    
    const response = await fetch(sentimentURL);
    try {
        const sentimentData = await response.json();
        const sentimentInfo = {
            status: sentimentData.status,
            score_tag: sentimentData.score_tag,
            agreement: sentimentData.agreement,
            subjectivity: sentimentData.subjectivity,
            confidence: sentimentData.confidence,
            irony: sentimentData.irony,
        }
        console.log(sentimentData);
        //res.send(sentimentInfo);
        return sentimentInfo;
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


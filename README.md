# Project Instructions

## Project Description
This is the fourth project for Udacity's Front End Web Developer Nanodegree program.  The project requirements are to create a web tool that employs MeaningCloud's free APIs for Natural Language Processing (NLP) to analyze content from articles and blogs found on other websites. The motivation of the project is to further practice working with different environments and the many tools common in a front end role for developing, testing and deploying a production app, including the following:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

### Background on Natural Language Processing
Whereas this project's main goals are to further understanding of the roles different tools and technologies play in the overall architecture of an application, it also simultaneously introduces the concept of Natural Language Processing (NLP). NLP is the ability of an application to understand the human language, written or oral.  Whereas some of my other GitHub repos for Machine Learning deal with the underlying concepts and technology for NLP (e.g. bag of words etc.), this specific project will instead outsource such functionality to a 3rd party -- MeaningCloud.com's free NLP APIs.  MeaningCloud's NLP APIs help analyze the content of user input articles and blogs to classify and summarize the information available in the article, including whether the content is subjective (opinion) or objective (fact-based) and whether it is positive, neutral, or negative in tone.

## Result

## Demo
![Natural Language Processing App](demo-nlp.mp4)

## Tools required to develop and run this project, are as follows: 
- text editor (e.g. [Atom](https://atom.io/)) or Integrated Development Environment - IDE (e.g. MS Visual Studio)
- web browser (e.g. Chrome/Safari/Firefox)
- Node.js (for webserver functionality)
- 3rd party Node.js packages as listed in package.json, including:
    - Webserver - Node.js
    - Express (Web application framework)
    - body-parser (middleware body parser)
    - cors (cross origin routing)
    - Webpack (Build Tool for setting up dev and prod environments)
    - Service Worker (External Script for offline functionality)
- a free developers account from MeaningCloud.com (required  if you wish to use your own API token for retrieving data)
- (not required) This project and related requirements was tracked and managed via the following [kanban board](https://trello.com/b/1Qd52LoJ/nlp-udacity-project)

## Getting started

It would probably be good to first get your basic project setup and functioning. Follow the steps from the course up to Lesson 4 but don't add Service Workers just yet. We won't need the service workers during development and having extra caches floating around just means there's more potential for confusion. So, fork this repo and begin your project setup.

Remember that once you clone, you will still need to install everything:

`cd` into your new folder and run:
- `npm install`

The following loaders and plugins were installed for development, with Service Workers installed for production:

# Choose the necessary installation for your development mode
(Babel: for transpiling ECMA2016+ JavaScript to standard JavaScript)
npm i -D @babel/core @babel/preset-env babel-loader
(For creating separate designated css file that is transpiled from SASS)
npm i -D style-loader node-sass css-loader sass-loader
(To automate replacement of 'dist' folder with new bundled assets each time we rerun webpack build scripts)
npm i -D clean-webpack-plugin
(For automatically including reference to bundled Javascript bundle in a script tag in html file for us)
npm i -D html-webpack-plugin
(For css file minification for performance and website load size management)
npm i -D mini-css-extract-plugin
npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
Also install the following npm packages that are used by the express server:
npm i --save path
npm i --save body-parser
npm i --save cors
install fetch-node (or axios) for api fetch requests to MeaningCloud's APIs
npm i fetch-node --save-dev

## Setting up the API

### Step 1: Signup for an API key
This project uses the MeaningCloud Sentiment Analysis API found [here](https://www.meaningcloud.com/developer/sentiment-analysis).  Once an account is created with MeaningCloud, you will be given a license key to start using the API. This API does not require an SDK so some subsequent setup steps are saved versus other project set ups (e.g. using Aylien API as was done for projects prior to July 2020 etc.).


### Step 2: Environment Variables
Next we need to declare our API keys, which will look something like this:
```
// set aylien API credentias
var textapi = new aylien({
  application_id: "your-api-id",
  application_key: "your-key"
});
```

...but there's a problem with this. We are about to put our personal API keys into a file, but when we push, this file is going to be available PUBLICLY on Github. Private keys, visible publicly are never a good thing. So, we have to figure out a way to make that not happen. The way we will do that is with environment variables. Environment variables are pretty much like normal variables in that they have a name and hold a value, but these variables only belong to your system and won't be visible when you push to a different environment like Github.

- [ ] Use npm or yarn to install the dotenv package ```npm install dotenv```. This will allow us to use environment variables we set in a new file
- [ ] Create a new ```.env``` file in the root of your project
- [ ] Go to your .gitignore file and add ```.env``` - this will make sure that we don't push our environment variables to Github! If you forget this step, all of the work we did to protect our API keys was pointless.
- [ ] Fill the .env file with your API keys like this:
```
API_ID=**************************
API_KEY=**************************
```
- [ ] Add this code to the very top of your server/index.js file:
```
const dotenv = require('dotenv');
dotenv.config();
```
- [ ] Reference variables you created in the .env file by putting ```process.env``` in front of it, an example might look like this:
```
console.log(`Your API key is ${process.env.API_KEY}`);
```
...Not that you would want to do that. This means that our updated API credential settings will look like this:
```javascript
// set aylien API credentials
// NOTICE that textapi is the name I used, but it is arbitrary. 
// You could call it aylienapi, nlp, or anything else, 
//   just make sure to make that change universally!
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});
```

### Step 5: Using the API

We're ready to go! The API has a lot of different endpoints you can take a look at [here](https://docs.aylien.com/textapi/endpoints/#api-endpoints). And you can see how using the SDK simplifies the requests we need to make. 

I won't provide further examples here, as it's up to you to create the various requests and make sure your server is set up appropriately.

## After the Aylien API

Once you are hooked up to the Aylien API, you are most of the way there! Along with making sure you are following all the requirements in the project rubric in the classroom, here are a few other steps to make sure you take.

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
- Go back to the web pack config and add the setup for service workers. 
- Test that the site is now available even when you stop your local server

## Deploying

A great step to take with your finished project would be to deploy it! Unfortunately its a bit out of scope for me to explain too much about how to do that here, but checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for some really intuitive free hosting options.

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
![Natural Language Processing App](demo.gif)

## Tools required
Tools required to develop and run this project are as follows: 
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

## Installation & Configuration

The following loaders and plugins were installed for development, with Service Workers installed for production only.
(Choose the necessary installation for your development mode and preferences)
- Install Webpack and the command line instructions (CLI) tool:
    npm i webpack webpack-cli 
- (Babel: for transpiling ECMA2016+ JavaScript to standard JavaScript)\
    npm i -D @babel/core @babel/preset-env babel-loader\
    (short for "npm install --save-dev @babel/core @babel/preset-env babel-loader")
- (For creating separate designated css file that is transpiled from SASS)\
    npm i -D style-loader node-sass css-loader sass-loader
- (For hot/live reloading of the page, only for Development mode, and automatically re-build of the application)
    npm i -D webpack-dev-server
- (To automate replacement of 'dist' folder with new bundled assets each time we rerun webpack build scripts)\
    npm i -D clean-webpack-plugin
- (For automatically including reference to bundled Javascript bundle in a script tag in our html file)\
    npm i -D html-webpack-plugin
- (For css file minification for performance and website load size management)\
    npm i -D mini-css-extract-plugin
    npm i -D optimize-css-assets-webpack-plugin terser-webpack-plugin
- (Inclusion of images/logos on site )\
    npm i -D file-loader
    npm i -D html-loader
- Install the following npm packages that are used by the express server:\
    npm i --save path\
    npm i --save body-parser\
    npm i --save cors
- Install fetch-node (or alternatively axios) for making api fetch requests to MeaningCloud's APIs\
    npm i fetch-node --save-dev    

## Setting up the API

### Step 1: Signup for an API key
This project uses the MeaningCloud Sentiment Analysis API found [here](https://www.meaningcloud.com/developer/sentiment-analysis) as well as the Summary Analysis API found [here](https://www.meaningcloud.com/developer/summarization).  Once an account is created with MeaningCloud, you will be given a license key to start using the API. This API does not require an SDK so set-up steps are minimal.

### Step 2: Environment Variables
Next we need to declare our API keys, as well as ensure they remain private keys as opposed to publicly visible on GitHub. We accomplish this with environment variables that are excluded when pushing to GitHub via configuration in our .gitignore file:

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

### Step 3: After adding MeaningCloud API

Once you are hooked up to the MeaningCloud API, you are most of the way there! Here are a few other steps to complete prior to deployment.

- Parse the response body to dynamically fill content on the page.
- Test that the server and form submission work, making sure to also handle error responses if the user input does not match API requirements.
- Go back to the web pack prod config and add the setup for service workers:
    npm i -D workbox-webpack-plugin
- Test that the (prod) site is now available even when you stop your local server

## Future Enhancement(s)

A great step to take with your finished project would be to deploy it! As it is out of scope for this project, you will have to checkout [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/) for further info on free hosting options.

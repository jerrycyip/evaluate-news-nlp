
import { validateInput } from "./formValidator";

async function handleSubmit(event) {
    event.preventDefault()
    
    // retrieve input URL
    let inputUrl = document.getElementById('url').value;
    if(Client.validateInput(inputUrl)){
        console.log("url submitted")
        // Post the request to the server
        postRequest('http://localhost:8082/api', {url: inputUrl})
        // update UI with the analysis results
        .then(function(res) {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = `Polarity: ${res.score_tag}`;
        })
    } else {
        console.log(inputURL);
        alert("Error: Invalid URL. Please check that the URL is a valid address (e.g. https://www.cnn.com/2021/01/01/newstory/index.html)");
    };
    }

// update UI with the sentiment analysis results
export function updateUI(data){
//    const resultsContainer = document.getElementById('results');
    console.log(data);
}

// Post fetch request to server with provided URL
export const postRequest  = async (url= '', data={})=>{
    console.log("postRequest executing", data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log("response data", newData);
        return newData;
    } catch (error) {
        console.log("error occurred:", error);
    }
}    
    

export { handleSubmit }

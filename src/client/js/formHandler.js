
import { validateInput } from "./formValidator";

async function handleSubmit(event) {
    event.preventDefault()
    
    // retrieve input URL
    let url = document.getElementById('url').value;


    const validURL = Client.validateInput(url);
    if(validURL){
        // Post the request to the server
        postRequest('http://localhost:8081/api', {url})
    }
    else {
        console.log(validatedInput);
        alert("Error: Please check that the URL is a valid address (e.g. https://www.cnn.com/2021/01/01/newstory/index.html)");
    };

    // fetch the sentiment analysis results from Express server
    const sentiment = await fetch("http://localhost:8081/sentiment");
    const sentimentJson = await sentiment.json();

    // update UI with the sentiment analysis results
    //Client.updateUI(sentimentJson, validatedInput);
    }

// Post fetch request to server with provided URL
export const postRequest  = async (url= '', data={})=>{
    const rest = await fetch(url, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(validURL),
    })
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error occurred:", error);
    }
}    
    

export { handleSubmit }

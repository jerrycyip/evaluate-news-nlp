
import { validateInput } from "./formValidator";

async function handleSubmit(event) {
    event.preventDefault()


    // retrieve input URL
    let inputUrl = document.getElementById('url').value;
    if (Client.validateInput(inputUrl)) {
        console.log("url submitted")
        // Post the request to the server
        postRequest('http://localhost:8082/api', { url: inputUrl })
            // update UI with the analysis results
            .then(function (res) {
                const results = document.getElementById('results');
                const resultsSummary = document.getElementById('results-summary');
                const urlInput = document.getElementById('url').value;
                document.getElementById('url').value = "";

                switch (res.status.code) {
                    case '212':
                        results.innerHTML = `Error: Unfortunately, MeaningCloud's API doesn't appear to be able to handle this article URL.  Please try a different url.`;
                        resultsSummary.innerHTML = ``;
                        break;
                    case '103':
                        results.innerHTML = `Error: Unfortunately, this article exceeds MeaningCloud API's size limit of 50,000 words.  Please try a different url.`;
                        resultsSummary.innerHTML = ``;
                        break;
                    case '104':
                        results.innerHTML = `Error: We have exceeded the maximum request frequency (2 requests/second).  Please try again later.`;
                        resultsSummary.innerHTML = ``;
                        break;
                    case '0':
                        results.innerHTML = `   Sentiment: ${res.score_tag} <br>
                                                Subjectivity: ${res.subjectivity} <br>
                                                Analysis Confidence: ${res.confidence}/100 <br>
                                                Irony of text: ${res.irony} <br>
                                                Coherence of Sentiment: ${res.agreement} <br>
                                                Input URL: ${urlInput}`;
                        resultsSummary.innerHTML = `<strong style="font-size: 1.25em; font-weight:900; font-family: 'Kodchasan', sans-serif; text-decoration:underline">Article Summary:</strong> <br>${res.summary} `;
                        break;
                    default:
                        results.innerHTML = `Error: An unexpected error has occured with MeaningCloud's API.  Please try a different url.`;
                        resultsSummary.innerHTML = ``;
                }

                /*
                score_tag: sentimentData.score_tag,
                agreement: sentimentData.agreement,
                subjectivity: sentimentData.subjectivity,
                confidence: sentimentData.confidence,
                irony: sentimentData.irony
                */
            })
    } else {
        alert("Error: Invalid URL. Please check that the URL is a valid address (e.g. https://www.cnn.com/2021/01/01/newstory/index.html)");
        console.log(inputURL);
    };
}

/*
// update UI with the sentiment analysis results
export function updateUI(data) {
    //    const resultsContainer = document.getElementById('results');
    console.log("updateUI data:", data);
}
*/

// Post fetch request to server with provided URL
export const postRequest = async (url = '', data = {}) => {
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
        //console.log("response data", newData);
        return newData;
    } catch (error) {
        console.log("error occurred:", error);
    }
}


export { handleSubmit }

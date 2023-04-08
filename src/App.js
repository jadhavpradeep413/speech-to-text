import React, { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";


function callApi() {
  fetch('localhost:8080/api/v1/accounts',{
    method: "GET",
    headers: {
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    }})
    .then(data => data.json()) // Parsing the data into a JavaScript object
    .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
}

function callApi2() {
  fetch('http://localhost:8080/api/v1/accounts', {    
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Access-Control-Allow-Origin' : '*',
      'mode' : 'no-cors'
    },
    body: JSON.stringify({
      // Add parameters here
      "sortCode": "65-93-37",
      "accountNumber":"21956204"
    })    
  })
     .then((response) => response.json())
     .then((data) => {
        console.log(data);
        document.getElementsByName("response2").text = JSON.stringify(data.JSON);
        // Handle data
     })
     .catch((err) => {
        console.log(err.message);
     });
}
 
const App = () => {
  const [ourText, setOurText] = useState("");
  const msg = new SpeechSynthesisUtterance();

  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true
  });
  const url = 'http://localhost:8080/test2';
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }



  const speechHandler = (msg) => {
    msg.text = ourText;    
    window.speechSynthesis.speak(msg);
  }
 

  return (
    <div>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      We got the text <input type="text" value = {transcript}/>
      <div className="App">
      <header className="App-header">
        <button onClick={callApi2}>Call API</button>
      </header>

     
    </div>

     
    <input id="tbx" name="tbx"
        type='text'
        value={ourText}
        placeholder={transcript}
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>

      <input name ="response2" type="text" value = ""/>
      
    </div>
    
  );  
};

export default App;
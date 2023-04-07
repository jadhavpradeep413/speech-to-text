import React, { useState } from "react";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";


function callApi() {
  fetch('http://localhost:8080/test2',{
    method: "GET",
    headers: {
      "access-control-allow-origin" : "*",
      "Content-type": "application/json; charset=UTF-8"
    }})
    .then(data => data.json()) // Parsing the data into a JavaScript object
    .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
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
    msg.text = ourText
    window.speechSynthesis.speak(msg)
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
        <button onClick={callApi}>Call API</button>
      </header>

     
    </div>

     
    <input
        type='text'
        value={ourText}
        placeholder='Enter Text'
        onChange={(e) => setOurText(e.target.value)}
      />
      <button onClick={() => speechHandler(msg)}>SPEAK</button>
      
    </div>
    
  );  
};

export default App;
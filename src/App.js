import React from "react";
import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

function callApi() {
  fetch('http://localhost:8080/test2', { method: 'GET',
  mode: 'no-cors',
  headers: {
  'Content-Type': 'text/plain',
  } })
    .then(data => data.json()) // Parsing the data into a JavaScript object
    .then(json => alert(JSON.stringify(json))) // Displaying the stringified data in an alert popup
}
 
const App = () => {
  const { transcript, resetTranscript } = useSpeechRecognition({
    continuous: true
  });
  const url = 'http://localhost:8080/test2';
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
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
    
      
    </div>
    
  );  
};

export default App;
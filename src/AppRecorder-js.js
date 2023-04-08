import React, { useState } from 'react';
import Recorder from 'recorder-js';

const VoiceCapture = () => {
  const [recorder, setRecorder] = useState(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const newRecorder = new Recorder(stream, {
      sampleRate: 16000,
      numChannels: 1,
      mimeType: 'audio/wav'
    });
    newRecorder.start();
    setRecorder(newRecorder);
  }

  const stopRecording = () => {
    recorder.stop();
    recorder.exportWAV((blob) => {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.wav');
      fetch('http://localhost:8080/api/v1/accounts', {
        method: 'POST',
        body: formData,
      })
      .then(response => {
        // handle response from the REST API
      })
      .catch(error => {
        // handle error
      });
    });
  }

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}

export default VoiceCapture;
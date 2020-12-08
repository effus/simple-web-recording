# simple-web-recording
Simple web recording using WebAudio

## Usage 

```js
const SimpleWebRecording = require('simple-web-recording');
const recorder = new SimpleWebRecording();
recorder.onBlobReady = (blobMedia) => {
    // do something with media stream
}
recorder.startRecord();
// ...
recorder.stopRecord();
```
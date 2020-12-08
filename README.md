# simple-web-recording
Simple web recording using WebAudio

## Install

```
npm install simple-web-recording
```

or

```
npm install https://github.com/effus/simple-web-recording.git
```

## Usage 

```js
import SimpleWebRecording from 'simple-web-recording';

const recorder = new SimpleWebRecording();
recorder.onBlobReady = (blobMedia) => {
    // do something with media stream
}
recorder.startRecord();
// ...
recorder.stopRecord();
```

## Demos

- [Vue.js](https://github.com/effus/simple-web-recording/blob/main/demo.vue)
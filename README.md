# simple-web-recording
Simple web recording using WebAudio

## Install

[![simple-web-recording](https://nodei.co/npm/simple-web-recording.png?mini=true)](https://nodei.co/npm/simple-web-recording)

or

```
npm install https://github.com/effus/simple-web-recording.git
```

## Usage 

```js
import SimpleWebRecording from 'simple-web-recording';

const recorder = new SimpleWebRecording();

// set each chunk time in ms (default is 1000)
recorder.setChunkTime(2000);

recorder.onChunkReady = (lastChunkBlob) => {
    // do something with chunk
}
recorder.onStop = (blobMedia) => {
    // do something with media stream
}

// start recording
recorder.startRecord();
// stop recording
recorder.stopRecord();
```

## Demos

- [Vue.js](https://github.com/effus/simple-web-recording/blob/main/demo.vue)

## Specification

- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API

## Support

- https://caniuse.com/?search=MediaStream
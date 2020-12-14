'use strict';

/**
 * Simple web recording
 */
class SimpleWebRecording {
    constructor() {
        this.constraints = { audio: true };
        this.chunks = [];
        this.chunkTime = 1000;
        
        const mediaNavigator = (navigator.getUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.webkitGetUserMedia);
        if (!mediaNavigator) {
            throw Error('mediaNavigator not supported');
        }

        navigator.mediaDevices.getUserMedia(this.constraints)
            .then((stream) => {
                this.recorder = new MediaRecorder(stream);
                this.recorder.ondataavailable = (event) => {
                    this.chunks.push(event.data);
                    if (typeof this.chunkReadyHandler === 'function') {
                        this.chunkReadyHandler(event.data);
                    }
                }
                this.recorder.onstop = () => {
                    const recordStream = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    this.chunks = [];
                    if (typeof this.stopHandler === 'function') {
                        this.stopHandler(recordStream);
                    }
                }
            })
            .catch((e) => {
                throw 'Simple web recording error: ' + e.message;
            });
        
    }

    startRecord() {
        if (!this.recorder) {
            throw Error('MediaRecorder not available');
        }
        this.recorder.start(this.chunkTime);
    }

    stopRecord() {
        if (!this.recorder) {
            throw Error('MediaRecorder not available');
        }
        this.recorder.stop();
    }

    onStop(handler) {
        this.stopHandler = handler;
    }

    onChunkReady(handler) {
        this.chunkReadyHandler = handler;
    }

    setChunkTime(timeMs) {
        this.chunkTime = timeMs;
    }

}

module.exports = SimpleWebRecording;
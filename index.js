'use strict';

/**
 * Simple web recording
 */
class SimpleWebRecording {
    constructor() {
        this.constraints = { audio: true };
        this.chunks = [];
        
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
                }
                this.recorder.onstop = () => {
                    const recordStream = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
                    this.chunks = [];
                    if (typeof this.readyHandler === 'function') {
                        this.readyHandler(recordStream);
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
        this.recorder.start();
    }

    stopRecord() {
        if (!this.recorder) {
            throw Error('MediaRecorder not available');
        }
        this.recorder.stop();
    }

    onBlobReady(handler) {
        this.readyHandler = handler;
    }

}

module.exports = SimpleWebRecording;
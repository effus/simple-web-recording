<template>
  <div class="demo">
    <h1>Audio test</h1>

    <div>
      <button @click="onEnable" v-if="!recorder">Enable Microphone</button>
      <button @click="onStart" v-if="!isStarted && recorder">Start</button>
      <button @click="onStop" v-if="isStarted">Stop</button>
    </div>


    <div v-if="stream" style="margin-top: 1vw;">
      <audio controls="true" :src="this.stream"></audio>
    </div>
  </div>
</template>

<script>

import SimpleWebRecording from 'simple-web-recording';

export default {
  name: 'demo',
  props: {},
  data() {
    return {
      recorder: null,
      stream: null,
      isStarted: false
    }
  },
  methods: {
    onEnable() {
      this.recorder = new SimpleWebRecording();
      this.recorder.onStop(this.onReady);
    },
    onStart() {
      this.isStarted = true;
      this.recorder.startRecord();
    },
    onStop() {
      this.isStarted = false;
      this.recorder.stopRecord();
    },
    onReady(stream) {
      const audioURL = window.URL.createObjectURL(stream);
      this.stream = audioURL;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

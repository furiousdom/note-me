<template>
  <div id="app">
    <NoteComponent />
  </div>
</template>

<script>
import NoteComponent from './components/Note.vue';

export default {
  name: 'app',
  components: {
    NoteComponent
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

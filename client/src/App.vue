<template>
  <v-app id="inspire">
    <v-app-bar app>
      <v-toolbar-title>NoteMe</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Board />
    </v-main>
  </v-app>
</template>

<script>
import Board from './components/Board';

export default {
  name: 'app',
  components: { Board }
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

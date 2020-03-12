<template>
  <div class="container">
    <h1 class="title">Note-Me</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="form box">
          <label class="label">Write a note</label>
          <div class="field">
            <div class="control">
              <input class="input" type="text"  id="create-note" v-model="title" placeholder="Title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input class="input" type="text" id="create-note" v-model="text" placeholder="Take a note...">
            </div>
          </div>
          <div class="field">
            <button class="button" v-on:click="createNote">Save</button>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <p class="error" v-if="error">{{ error }}</p>
    <div class="columns is-flex-tablet">
      <div class="column"
      v-for="(note, index) in notes"
      v-bind:item="note"
      v-bind:index="index"
      v-bind:key="note._id"
      >
        <div class="box">
          <a class="delete is-pulled-right" v-on:click="deleteNote(note._id)"></a>
          <p class="title">{{ note.title }}</p>
          <p class="text">{{ note.text }}</p>
          <div class="is-size-7 is-pulled-right">
            {{ `${note.createdAt.getDate()}/${note.createdAt.getMonth()}/${note.createdAt.getFullYear()}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteService from '../NoteService';

export default {
  name: 'NoteComponent',
  data() {
    return {
      notes: [],
      error: '',
      title: '',
      text: ''
    }
  },
  async created() {
    try {
      this.notes = await NoteService.getNotes();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createNote() {
      await NoteService.inserNote(this.title, this.text);
      this.notes = await NoteService.getNotes();
      this.title = '';
      this.text = '';
    },
    async deleteNote(id) {
      await NoteService.deleteNote(id);
      this.notes = await NoteService.getNotes();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

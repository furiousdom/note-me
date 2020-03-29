<template>
  <div class="container">
    <h1 class="title">Note-Me</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="form box">
          <label class="label">Write a note</label>
          <div class="field">
            <div class="control">
              <input v-model="title" id="create-note1" class="input" type="text" placeholder="Title">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="text" id="create-note2" class="input" type="text" placeholder="Take a note...">
            </div>
          </div>
          <div class="field">
            <button @click="createNote" class="button">Save</button>
          </div>
        </div>
      </div>
    </div>

    <hr>

    <p v-if="error" class="error">{{ error }}</p>
    <div class="columns is-flex-tablet">
      <div
        v-for="(note, index) in notes"
        :key="note._id"
        :item="note"
        :index="index"
        class="column">
        <div class="box">
          <a @click="deleteNote(note._id)" class="delete is-pulled-right"></a>
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
import NoteService from '../api/note';

export default {
  name: 'note-component',
  data() {
    return {
      notes: [],
      error: '',
      title: '',
      text: ''
    };
  },
  methods: {
    async createNote() {
      await NoteService.insertNote(this.title, this.text);
      this.notes = await NoteService.getNotes();
      this.title = '';
      this.text = '';
    },
    async deleteNote(id) {
      await NoteService.deleteNote(id);
      this.notes = await NoteService.getNotes();
    }
  },
  async created() {
    try {
      this.notes = await NoteService.getNotes();
    } catch (err) {
      this.error = err.message;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

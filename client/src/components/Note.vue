<template>
  <div class="container">
    <h1 class="title">Note-Me</h1>
    <div class="columns is-centered">
      <div class="column is-half">
        <div class="form box">
          <label class="label">Write a note</label>
          <div class="field">
            <div class="control">
              <input v-model="title" type="text" placeholder="Title" class="input">
            </div>
          </div>
          <div class="field">
            <div class="control">
              <input v-model="text" type="text" placeholder="Take a note..." class="input">
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
        v-for="({ _id, title, text, createdAt:date }) in notes"
        :key="_id"
        class="column">
        <div class="box">
          <a @click="deleteNote(_id)" class="delete is-pulled-right"></a>
          <p class="title">{{ title }}</p>
          <p class="text">{{ text }}</p>
          <div class="is-size-7 is-pulled-right">{{ formatDate(date) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteNote, getNotes, insertNote } from '../api/note';
import { format } from 'date-fns';

export default {
  name: 'note-component',
  data: () => ({
    notes: [],
    error: '',
    title: '',
    text: ''
  }),
  methods: {
    formatDate(date) {
      return format(date, 'dd/MM/yyyy');
    },
    async createNote() {
      await insertNote(this.title, this.text);
      this.notes = await getNotes();
      this.title = '';
      this.text = '';
    },
    async deleteNote(id) {
      await deleteNote(id);
      this.notes = await getNotes();
    }
  },
  async created() {
    this.notes = await getNotes();
  }
};
</script>

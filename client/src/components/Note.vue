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
            <button @click="addNote" class="button">Save</button>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <p v-if="error" class="error">{{ error }}</p>
    <div class="columns is-flex-tablet">
      <div
        v-for="({ _id, title, text, createdAt: date }, index) in notes"
        :key="_id"
        class="column">
        <div class="box">
          <a @click="deleteNote(_id, index)" class="delete is-pulled-right"></a>
          <p class="title">{{ title }}</p>
          <p class="text">{{ text }}</p>
          <div class="is-size-7 is-pulled-right">{{ formatDate(date) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/note';
import { format } from 'date-fns';

export default {
  name: 'note',
  data: () => ({
    notes: [],
    error: '',
    title: '',
    text: ''
  }),
  methods: {
    formatDate(date) {
      return format(date, 'MMM do, yyyy');
    },
    async addNote() {
      const { title, text } = this;
      const res = await api.create({ title, text });
      const createdAt = new Date(res.data.createdAt);
      this.notes.push({ ...res.data, createdAt });
      this.title = '';
      this.text = '';
    },
    async deleteNote(id, index) {
      await api.remove(id);
      this.notes.splice(index, 1);
    }
  },
  async created() {
    this.notes = await api.fetch();
  }
};
</script>

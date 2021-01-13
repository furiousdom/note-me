<template>
  <v-container>
    <div class="d-flex justify-center">
      <v-card elevation="5" rounded class="card-form">
        <v-form outlined>
          <v-text-field
            v-if="reveal"
            v-model="title"
            label="Title"
            required flat solo />
          <v-textarea
            v-model="text"
            @click="reveal = true"
            placeholder="Take a note..."
            rows="1" required
            flat solo auto-grow />
          <div class="d-flex justify-end">
            <v-btn
              v-if="reveal"
              @click="addNote"
              :disabled="!title && !text"
              icon>
              <v-icon>mdi-check-circle</v-icon>
            </v-btn>
            <v-btn v-if="reveal" @click="reset" icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
    <div class="divider"></div>
    <div class="note-board">
      <v-row>
        <v-col
          v-for="({ _id, title, text, createdAt: date }, index) in notes"
          :key="_id" cols="12" sm="4">
          <v-card outlined class="note">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-card-title>{{ title }}</v-card-title>
              <v-btn @click="deleteNote(_id, index)" icon>
                <v-icon>×</v-icon>
              </v-btn>
            </div>
            <v-card-text class="text--primary">{{ text }}</v-card-text>
            <v-card-subtitle class="overline">{{ formatDate(date) }}</v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import api from '@/src/api/note';
import { format } from 'date-fns';

const initData = () => ({
  reveal: false,
  title: '',
  text: ''
});

export default {
  name: 'board',
  data: () => ({ ...initData(), notes: [] }),
  methods: {
    reset() {
      Object.assign(this, initData());
    },
    formatDate(date) {
      return format(date, 'MMM do, yyyy');
    },
    async addNote() {
      const { title, text } = this;
      const res = await api.create({ title, text });
      const createdAt = new Date(res.data.createdAt);
      this.notes.push({ ...res.data, createdAt });
      this.reset();
    },
    async deleteNote(id, index) {
      await api.remove(id);
      this.notes.splice(index, 1);
    }
  },
  async created() {
    if (!this.notes.length) this.notes = await api.fetch();
  }
};
</script>

<style scoped>
.card-form {
  width: 30rem;
  max-width: 30rem;
  padding: 1rem;
}

.divider {
  margin: 40px;
}

.v-sheet.v-card {
  border-radius: 12px!important;
}
</style>

import api from './axios';
const endpoint = 'notes/';

export default {
  getNotes() {
    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await api.get(endpoint);
        resolve(
          data.map(note => ({
            ...note,
            createdAt: new Date(note.createdAt)
          }))
        );
      } catch (err) {
        reject(err);
      }
    });
  },
  insertNote(title, text) {
    return api.post(endpoint, { title, text });
  },
  deleteNote(id) {
    return api.delete(`${endpoint}${id}`);
  }
};

import axios from 'axios';

const url = 'api/notes/';

class NoteService {
  static getNotes() {
    /* eslint-disable no-async-promise-executor */
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data;
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
  }

  static insertNote(title, text) {
    return axios.post(url, {
      title,
      text
    });
  }

  static deleteNote(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default NoteService;

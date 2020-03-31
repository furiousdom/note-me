const express = require('express');
const Note = require('../../models/Note');

const router = express.Router();

router.get('/', (_, res) => Note.find((_, notes) => res.send(notes)));

router.post('/', ({ body: { title, text } }, res) => {
  const newNote = new Note({ title, text });
  newNote.save();
  res.status(201).send(newNote);
});

router.delete('/:id', ({ params: { id } }, res) => {
  Note.deleteOne({ _id: id }, () => res.status(200).send());
});

module.exports = router;

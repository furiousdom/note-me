const express = require('express');
const mongodb = require('mongodb');
const { MongoURI } = require('../../config/keys');

const router = express.Router();

router.get('/', async (_, res) => {
  const notes = await loadNotesCollection();
  res.send(await notes.find({}).toArray());
});

router.post('/', async ({ body: { title, text } }, res) => {
  const notes = await loadNotesCollection();
  await notes.insertOne({ title, text, createdAt: new Date() });
  res.status(201).send();
});

router.delete('/:id', async ({ params: { id } }, res) => {
  const notes = await loadNotesCollection();
  await notes.deleteOne({ _id: new mongodb.ObjectID(id) });
  res.status(200).send();
});

async function loadNotesCollection() {
  const client = await mongodb.MongoClient.connect(MongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true });
  return client.db('notesdb').collection('notes');
}

module.exports = router;

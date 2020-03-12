const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

router.get('/', async (req, res) => {
  const notes = await loadNotesCollection();
  res.send(await notes.find({}).toArray());
});

router.post('/', async (req, res) => {
  const notes = await loadNotesCollection();
  await notes.insertOne({
    title: req.body.title,
    text: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

router.delete('/:id', async (req, res) => {
  const notes = await loadNotesCollection();
  await notes.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadNotesCollection() {
  const client  = await mongodb.MongoClient.connect(
    'mongodb+srv://dtabak:dTabak1234@testclust-sezet.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true });

    return client.db('notesdb').collection('notes');
}

module.exports = router;

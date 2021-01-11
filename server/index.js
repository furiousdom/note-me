const { config, uri } = require('./config/database');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const notes = require('./routes/api/notes');
const path = require('path');

const app = express();

mongoose.connect(uri, config)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.use('/api/notes', notes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '/public/')));
  app.get(/.*/, (_, res) => res.sendFile(path.resolve(__dirname, '/public/index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

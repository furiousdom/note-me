const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const notes = require('./routes/api/notes');
app.use('/api/notes', notes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '/public/')));
  app.get(/.*/, (req, res) => res.sendFile(path.resolve(__dirname, '/public/index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

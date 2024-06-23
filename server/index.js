const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./db/config');

const app = express();
const PORT = 5173;

app.use(bodyParser.json());
app.use(cors());

// Route to save segments and result
app.post('/api/save', (req, res) => {
  const { segments, result } = req.body;
  const segmentsString = JSON.stringify(segments);
  connection.query(
    'INSERT INTO segments (segments, result) VALUES (?, ?)',
    [segmentsString, result],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: 'Data saved successfully' });
    }
  );
});

// Route to get all saved segments and results
app.get('/api/results', (req, res) => {
  connection.query('SELECT * FROM segments', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

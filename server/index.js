// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post('/api/save', async (req, res) => {
  const { segments, result } = req.body;
  try {
    await prisma.spin.create({
      data: {
        segments,
        result,
      },
    });
    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error('Error inserting data: ', error);
    res.status(500).json({ message: 'Error inserting data' });
  }
});

app.listen(5173, () => {
  console.log('Server running on port 5173');
});

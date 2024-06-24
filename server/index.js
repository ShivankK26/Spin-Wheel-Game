// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: 'http://localhost:3001', // allow requests from your frontend
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.post('/api/save', async (req, res) => {
  const { segments, result } = req.body;

  if (!segments || !result) {
    console.error('Invalid data:', req.body);
    return res.status(400).json({ message: 'Invalid data' });
  }

  console.log('Received data:', req.body); // Log the received data

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


// Test route to check database connection
app.get('/test-db', async (req, res) => {
  try {
    const spins = await prisma.spin.findMany();
    res.status(200).json(spins);
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error' });
  }
});

const port = 3000; // Change the port number here
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
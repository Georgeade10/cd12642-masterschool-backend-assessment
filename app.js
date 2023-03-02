import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import photoRoutes from './routes/photoRoutes.js';
import connectDB from './config/db.js';

const app = express();
const port = process.env.PORT;
connectDB();

// Mount photoRoutes router on /api/photos base path
app.use('/api/photos', photoRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Unsplash API!' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';

dotenv.config();

//Import Axios and set the Unsplash API endpoint and access key as constants
import axios from 'axios';
const unsplashEndpoint = 'https://api.unsplash.com';
const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

//Create the /api/photos route with a GET method that uses Axios to fetch an array of raw Unsplash photo URLs

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${unsplashEndpoint}/photos`, {
      headers: { Authorization: `Client-ID ${unsplashAccessKey}` },
      params: { per_page: 10, orientation: 'landscape' },
    });
    const photos = response.data.map((photo) => photo.urls.raw);
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

router.get('/api/photos/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${unsplashEndpoint}/photos/${req.params.id}`,
      {
        headers: { Authorization: `Client-ID ${unsplashAccessKey}` },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

export default router;

import express from 'express';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

//Import Axios and set the Unsplash API endpoint and access key as constants
import axios from 'axios';
const unsplashEndpoint = 'https://api.unsplash.com';
const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

export const getPhotoRoutes = async (req, res) => {
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
};

export const getPhotoByIdRoute = async (req, res) => {
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
};

// Define route handler function
export const getUserPhotos = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/users/${req.params.username}/photos`,
      {
        params: {
          client_id: process.env.UNSPLASH_ACCESS_KEY,
        },
      }
    );
    const photos = response.data.map((photo) => ({
      id: photo.id,
      username: photo.user.username,
      description: photo.description || 'No description provided.',
      url: photo.urls.raw,
    }));
    res.json(photos);
  } catch (err) {
    res.status(err.response.status).json({ message: err.response.data });
  }
};

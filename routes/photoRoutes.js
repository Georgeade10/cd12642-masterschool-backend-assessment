import express from 'express';
const router = express.Router();

import {
  getPhotoRoutes,
  getPhotoByIdRoute,
  getUserPhotos,
} from '../controllers/photoController.js';

//Create the /api/photos route with a GET method that uses Axios to fetch an array of raw Unsplash photo URLs

router.route('/').get(getPhotoRoutes);
router.route('/api/photos/:id').get(getPhotoByIdRoute);
router.route('/user/:username').get(getUserPhotos);

export default router;

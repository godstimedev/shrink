import express from 'express';
import { createShortURL, getStats } from '../controllers/urlController.js';

export const router = express.Router();

// POST - Create shortened URL
router.post('/shorten', createShortURL);

// GET - Get stats
router.get('/stats/:shortCode', getStats);

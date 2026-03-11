import express from 'express';
import { createShortURL } from '../controllers/urlController';

export const router = express.Router();

// POST - Create shortened URL
router.post('/shorten', createShortURL);

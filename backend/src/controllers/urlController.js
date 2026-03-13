import { pool } from '../db/postgres/connection.js';
import { client as RedisClient } from '../db/redis/connection.js';
import { generateShorterCode } from '../utils/idGenerator.js';
import { isValidShortCode, isValidUrl } from '../utils/validation.js';

/**
 * POST /api/shorten
 * Creates a new shortened URL
 */
export const createShortURL = async (req, res) => {
	try {
		const { url, customAlias } = req.body;

		if (!url) {
			return res.status(400).json({
				error: 'URL is required',
			});
		}

		if (!isValidUrl(url)) {
			return res.status(400).json({
				error: 'Invalid URL format',
			});
		}

		if (customAlias && !isValidShortCode(customAlias)) {
			return res.status(400).json({
				error: 'Invalid format, Custom alias should be alphanumeric, 6-10 characters',
			});
		}

		const shortCode = customAlias || generateShorterCode();

		// check if short code already exist
		const existing = await pool.query(
			'SELECT short_code FROM urls WHERE short_code = $1 OR custom_alias = $1',
			[shortCode],
		);

		if (existing.rows.length > 0) {
			return res.status(400).json({
				error: 'Short code already exists',
			});
		}

		// Insert into database
		const result = await pool.query(
			'INSERT INTO urls (original_url, short_code, custom_alias) VALUES ($1, $2, $3) RETURNING *',
			[url, shortCode, customAlias || null],
		);

		const newURL = result.rows[0];

		// cache in redis (store for 24 hours)
		await RedisClient.setEx(
			`url:${shortCode}`,
			86400, //24 hours in seconds
			newURL.original_url,
		);

		res.status(201).json({
			shortCode: shortCode,
			shortURL: `${process.env.BASE_URL || 'http://localhost:5000'}/${shortCode}`,
			originalURL: url,
			createdAt: newURL.created_at,
		});
	} catch (error) {
		console.error('Error creating short URL:', error);
		res.status(500).json({
			error: 'Internal server error',
		});
	}
};

/**
 * GET /api/:shortCode
 * Retrieves the original URL and performs redirect
 */
export const getOriginalURL = async (req, res) => {
	try {
		const { shortCode } = req.params;

		//Try to get from Redis cache first
		let originalURL = await RedisClient.get(`url:${shortCode}`);

		if (originalURL) {
			console.log('Cache hit for:', shortCode);

			//Increment clicks in background (dont wait for response)
			pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1', [shortCode]);
			return res.redirect(301, originalURL);
		}

		// Cache miss - query database
		console.log('Cache miss for:', shortCode);
		const result = await pool.query(
			'SELECT original_url, expires_at FROM urls WHERE short_code = $1',
			[shortCode],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({
				error: 'Short URL not found',
			});
		}

		const { original_url, expires_at } = result.rows[0];

		// Check if expired
		if (expires_at && new Date(expires_at) < new Date()) {
			return res.status(410).json({ error: 'This link has expired' });
		}

		// Update cache and increment clicks
		await RedisClient.setEx(`url:${shortCode}`, 86400, original_url);
		await pool.query('UPDATE urls SET clicks = clicks + 1 WHERE short_code = $1', [shortCode]);

		res.redirect(301, original_url);
	} catch (error) {
		console.error('Error retrieving URL:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

/**
 * GET /api/stats/:shortCode
 * Get analytics for a shortened URL
 */
export const getStats = async (req, res) => {
	try {
		const { shortCode } = req.params;

		const result = await pool.query(
			'SELECT short_code, original_url, clicks, created_at, expires_at FROM urls WHERE short_code = $1',
			[shortCode],
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: 'Short URL not found' });
		}

		res.json(result.rows[0]);
	} catch (error) {
		console.error('Error fetching stats:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

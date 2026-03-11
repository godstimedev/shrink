import { pool } from '../db/postgres/connection';
import { client as RedisClient } from '../db/redis/connection';
import { isValidShortCode, isValidUrl } from '../utils/validation';

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
				error: 'Invalid custom alias format',
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

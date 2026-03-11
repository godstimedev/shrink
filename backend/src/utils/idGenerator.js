import { v4 as uuid4 } from 'uuid';

/**
 * Generates a unique short code
 * Converts UUID to a shorter format using base62 encoding
 */

export const generateShortCode = () => {
	// Method 1: Simple approach - take first 8 characters of UUID
	const shortCode = uuid4().replace(/-/g, '').substring(0, 8);

	return shortCode;
};

/**
 * Alternative: Custom base62 encoding for even shorter codes
 * This is what real URL shorteners use
 */

export const generateShorterCode = (length = 6) => {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let code = '';

	for (let i = 0; i < length; i++) {
		code += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return code;
};

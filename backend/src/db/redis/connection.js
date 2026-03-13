import 'dotenv/config';
import { createClient } from 'redis';

export const client = createClient({
	url: process.env.REDIS_URL,
});

client.on('error', (err) => {
	console.log('Redis Client Error:', err);
});

//connect to Redis
try {
	await client.connect();
	console.log('Redis Connected succesfully');
} catch (error) {
	console.log('Redis Connection Error:', error);
}

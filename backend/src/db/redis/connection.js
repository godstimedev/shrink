import redis from 'redis';
import 'dotenv/config';

export const client = redis.createClient({
	url: process.env.REDIS_URL,
});

client.on('error', (err) => {
	console.log('Redis Client Error:', err);
})(async () => {
	try {
		await client.connect();
		console.log('Redis Connected succesfully');
	} catch (error) {
		console.log('Redis Connection Error:', error);
	}
})();

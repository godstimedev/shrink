import { Pool } from 'pg';
import 'dotenv/config';

const pool = new Pool({
	connectionSring: process.env.DATABASE_URL,
});

export const initializeDB = async () => {
	try {
		await pool.query(`
           CREATE TABLE IF NOT EXIST urls (
                id SERIAL PRIMARY KEY,
                original_url VARCHAR(10) NOT NULL,
                short_code VARCHAR(10) UNIQUE NOT NULL,
                clicks INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT NOW(),
                expires_at TIMESTAMP,
                custom_alias VARCHAR(100) UNIQUE
           );
            
           CREATE INDEX IF NOT EXIST idx_short_code ON urls(short_code);
           CREATE INDEX IF NOT EXIST idx_custom_alias ON urls(custom_alias);
        `);
		console.log('Database initialized successfully');
	} catch (error) {
		console.error('Database initialization error:', error);
	}
};

initializeDB();

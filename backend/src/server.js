import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router } from './routes/urlRoutes.js';
import { getOriginalURL } from './controllers/urlController.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api', router);

// GET - Get original URL
app.get('/:shortCode', getOriginalURL);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});

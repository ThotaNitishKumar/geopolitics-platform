import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all country stats
// @route   GET /api/stats
// @access  Public
const getCountryStats = asyncHandler(async (req, res) => {
    const statsPath = path.join(__dirname, '../data/countryStats.json');
    if (fs.existsSync(statsPath)) {
        const data = fs.readFileSync(statsPath, 'utf-8');
        res.json(JSON.parse(data));
    } else {
        res.status(404);
        throw new Error('Stats data not found');
    }
});

export { getCountryStats };

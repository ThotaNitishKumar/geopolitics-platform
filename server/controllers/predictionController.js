import asyncHandler from 'express-async-handler';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc    Get all prediction data
// @route   GET /api/predictions
// @access  Public
const getPredictions = asyncHandler(async (req, res) => {
    const dataPath = path.join(__dirname, '../data/predictionStats.json');
    if (fs.existsSync(dataPath)) {
        const data = fs.readFileSync(dataPath, 'utf-8');
        res.json(JSON.parse(data));
    } else {
        res.status(404);
        throw new Error('Prediction data not found');
    }
});

// @desc    Run a scenario simulation
// @route   POST /api/predictions/simulate
// @access  Public
const simulateScenario = asyncHandler(async (req, res) => {
    const { scenarioId } = req.body;
    const dataPath = path.join(__dirname, '../data/predictionStats.json');

    if (!fs.existsSync(dataPath)) {
        res.status(404);
        throw new Error('Data source not found');
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const scenario = data.scenarios[scenarioId];

    if (scenario) {
        res.json(scenario);
    } else {
        res.status(404);
        throw new Error('Scenario not found');
    }
});

export { getPredictions, simulateScenario };

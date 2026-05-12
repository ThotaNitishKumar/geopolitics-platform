import express from 'express';
const router = express.Router();
import { getPredictions, simulateScenario } from '../controllers/predictionController.js';

router.get('/', getPredictions);
router.post('/simulate', simulateScenario);

export default router;

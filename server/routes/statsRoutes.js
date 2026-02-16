import express from 'express';
const router = express.Router();
import { getCountryStats } from '../controllers/statsController.js';

router.route('/').get(getCountryStats);

export default router;

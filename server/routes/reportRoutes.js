import express from 'express';
const router = express.Router();
import {
    getReports,
    getReportBySlug,
    getFeaturedReport,
    getTrendData
} from '../controllers/reportController.js';

router.route('/').get(getReports);
router.route('/featured').get(getFeaturedReport);
router.route('/trends').get(getTrendData);
router.route('/:slug').get(getReportBySlug);

export default router;

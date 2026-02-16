import express from 'express';
const router = express.Router();
import { getConflicts, getConflictById, createConflict } from '../controllers/conflictController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getConflicts).post(protect, admin, createConflict);
router.route('/:id').get(getConflictById);

export default router;

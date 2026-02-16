import asyncHandler from 'express-async-handler';
import Conflict from '../models/Conflict.js';

// @desc    Get all conflicts
// @route   GET /api/conflicts
// @access  Public
const getConflicts = asyncHandler(async (req, res) => {
    const conflicts = await Conflict.find({}).sort({ intensity: -1 });
    res.json(conflicts);
});

// @desc    Get conflict by ID
// @route   GET /api/conflicts/:id
// @access  Public
const getConflictById = asyncHandler(async (req, res) => {
    const conflict = await Conflict.findById(req.params.id);

    if (conflict) {
        res.json(conflict);
    } else {
        res.status(404);
        throw new Error('Conflict not found');
    }
});

// @desc    Create a conflict
// @route   POST /api/conflicts
// @access  Private/Admin
const createConflict = asyncHandler(async (req, res) => {
    const { title, countriesInvolved, region, riskLevel, description, intensity } = req.body;

    const conflict = new Conflict({
        title,
        countriesInvolved,
        region,
        riskLevel,
        description,
        intensity,
        timeline: []
    });

    const createdConflict = await conflict.save();
    res.status(201).json(createdConflict);
});

export { getConflicts, getConflictById, createConflict };

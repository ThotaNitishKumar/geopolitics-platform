import asyncHandler from 'express-async-handler';
import Report from '../models/Report.js';

// @desc    Fetch all reports
// @route   GET /api/reports
// @access  Public
const getReports = asyncHandler(async (req, res) => {
    const { region, type, riskLevel, search } = req.query;

    let query = {};
    if (region && region !== 'Global') query.region = region;
    if (type) query.type = type;
    if (riskLevel) query.riskLevel = riskLevel;
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }

    const reports = await Report.find(query).sort({ publishDate: -1 });
    res.json(reports);
});

// @desc    Fetch single report by slug
// @route   GET /api/reports/:slug
// @access  Public
const getReportBySlug = asyncHandler(async (req, res) => {
    const report = await Report.findOne({ slug: req.params.slug });

    if (report) {
        res.json(report);
    } else {
        res.status(404);
        throw new Error('Report not found');
    }
});

// @desc    Get featured report
// @route   GET /api/reports/featured
// @access  Public
const getFeaturedReport = asyncHandler(async (req, res) => {
    const report = await Report.findOne({ featured: true }).sort({ publishDate: -1 });
    if (!report) {
        // Fallback to latest
        const latest = await Report.findOne({}).sort({ publishDate: -1 });
        return res.json(latest);
    }
    res.json(report);
});

// @desc    Get trend data
// @route   GET /api/reports/trends
// @access  Public
const getTrendData = asyncHandler(async (req, res) => {
    // Mocking trend data for the charts as requested
    const trends = {
        conflictTrend: [
            { year: 2015, value: 45 }, { year: 2016, value: 48 }, { year: 2017, value: 52 },
            { year: 2018, value: 50 }, { year: 2019, value: 55 }, { year: 2020, value: 58 },
            { year: 2021, value: 65 }, { year: 2022, value: 85 }, { year: 2023, value: 88 },
            { year: 2024, value: 92 }
        ],
        economicInstability: [
            { month: 'Jan', value: 30 }, { month: 'Feb', value: 32 }, { month: 'Mar', value: 35 },
            { month: 'Apr', value: 45 }, { month: 'May', value: 42 }, { month: 'Jun', value: 48 }
        ],
        militarySpending: [
            { category: 'USA', value: 877 }, { category: 'China', value: 292 },
            { category: 'Russia', value: 86.4 }, { category: 'India', value: 81.4 },
            { category: 'S. Arabia', value: 75 }
        ],
        sanctionsGrowth: [
            { year: 2018, value: 1200 }, { year: 2019, value: 1400 },
            { year: 2020, value: 1800 }, { year: 2021, value: 2200 },
            { year: 2022, value: 4500 }, { year: 2023, value: 5200 }
        ]
    };
    res.json(trends);
});

export {
    getReports,
    getReportBySlug,
    getFeaturedReport,
    getTrendData
};

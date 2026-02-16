import asyncHandler from 'express-async-handler';
import Article from '../models/Article.js';

// @desc    Get all articles
// @route   GET /api/news
// @access  Public
const getArticles = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const continent = req.query.continent;
    const isHighPriority = req.query.isHighPriority === 'true';

    const keyword = (req.query.keyword || req.query.search)
        ? {
            $or: [
                { title: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
                { description: { $regex: req.query.keyword || req.query.search, $options: 'i' } },
                { country: { $regex: req.query.keyword || req.query.search, $options: 'i' } }
            ]
        }
        : {};

    let query = { ...keyword };
    if (continent) {
        query.continent = continent;
    }
    if (isHighPriority) {
        query.isHighPriority = true;
    }

    const count = await Article.countDocuments(query);
    const articles = await Article.find(query)
        .sort({ publishedAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));

    res.json({ articles, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get article by ID
// @route   GET /api/news/:id
// @access  Public
const getArticleById = asyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id);

    if (article) {
        res.json(article);
    } else {
        res.status(404);
        throw new Error('Article not found');
    }
});

export { getArticles, getArticleById };

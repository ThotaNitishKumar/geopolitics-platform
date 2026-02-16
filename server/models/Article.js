import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    source: {
        name: String,
        url: String,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    urlToImage: String,
    publishedAt: {
        type: Date,
        required: true,
    },
    country: String,
    continent: String,
    summary: String, // AI Generated Summary
    description: String,
    content: String,
    sentiment: String, // 'Positive', 'Negative', 'Neutral' - placeholder for analysis
    category: {
        type: String, // 'Politics', 'economy', 'military'
    },
    isHighPriority: {
        type: Boolean,
        default: false,
    },
    analysis: {
        strategicImpact: String,
        economicImpact: String,
        globalReaction: String,
    }
}, {
    timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

export default Article;

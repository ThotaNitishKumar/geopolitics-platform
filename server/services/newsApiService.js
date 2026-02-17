import axios from 'axios';
import Article from '../models/Article.js';
import generateAnalysis from './aiService.js';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const GEOPOLITICAL_QUERIES = [
    'geopolitics',
    'foreign policy',
    'international relations',
    'military conflict',
    'diplomatic crisis',
    'sanctions',
    'trade war'
];

const fetchNewsFromAPI = async () => {
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey || apiKey === 'replace_with_your_api_key_from_newsapi_org') {
        console.warn('NewsAPI Key not found or default. Skipping NewsAPI fetch.');
        return;
    }

    if (Article.base.connection.readyState !== 1) {
        console.warn('Database not connected. Skipping NewsAPI fetch task.');
        return;
    }

    console.log('Running NewsAPI Fetch Task...');

    try {
        // We'll pick a random query from our list to keep variety
        const query = GEOPOLITICAL_QUERIES[Math.floor(Math.random() * GEOPOLITICAL_QUERIES.length)];

        const response = await axios.get(NEWS_API_URL, {
            params: {
                q: query,
                language: 'en',
                sortBy: 'publishedAt',
                pageSize: 20,
                apiKey: apiKey
            }
        });

        if (response.data.status !== 'ok') {
            throw new Error(`NewsAPI Error: ${response.data.message}`);
        }

        let count = 0;
        for (const item of response.data.articles) {
            // Deduplication by URL
            const exists = await Article.findOne({ url: item.url });
            if (exists) continue;

            // Generate AI Analysis
            const analysis = await generateAnalysis(item.title, item.description || '');

            const newArticle = new Article({
                title: item.title,
                source: {
                    name: item.source.name,
                    url: item.url
                },
                url: item.url,
                urlToImage: item.urlToImage,
                publishedAt: new Date(item.publishedAt),
                description: item.description || 'No Description',
                content: item.content || item.description || 'No Content',
                summary: analysis.summary,
                analysis: {
                    strategicImpact: analysis.strategicImpact,
                    economicImpact: analysis.economicImpact,
                    globalReaction: analysis.globalReaction
                }
            });

            await newArticle.save();
            count++;
        }

        if (count > 0) console.log(`NewsAPI: Fetched and saved ${count} new articles.`);
        else console.log('NewsAPI: No new articles found.');

    } catch (error) {
        console.error('Error fetching NewsAPI:', error.response?.data?.message || error.message);
    }
};

export default fetchNewsFromAPI;

import Parser from 'rss-parser';
import Article from '../models/Article.js';
import generateAnalysis from './aiService.js';

const parser = new Parser({
    timeout: 10000,
    customFields: {
        item: [
            ['media:content', 'media:content', { keepArray: true }],
            ['media:thumbnail', 'media:thumbnail'],
            ['content:encoded', 'contentEncoded'],
        ],
    },
});

// RSS Feeds for Global Coverage
const RSS_FEEDS = [
    { url: 'https://feeds.bbci.co.uk/news/world/rss.xml', source: 'BBC News' },
    { url: 'http://rss.cnn.com/rss/edition_world.rss', source: 'CNN' },
    { url: 'https://www.aljazeera.com/xml/rss/all.xml', source: 'Al Jazeera' },
    { url: 'https://www.france24.com/en/rss', source: 'France 24' },
    { url: 'https://feeds.a.dj.com/rss/RSSWorldNews.xml', source: 'Wall Street Journal' },
    { url: 'https://www.theguardian.com/world/rss', source: 'The Guardian' },
    { url: 'https://rss.dw.com/xml/rss-en-world', source: 'Deutsche Welle' },
    { url: 'https://timesofindia.indiatimes.com/rssfeeds/296589292.cms', source: 'Times of India' },
];

const GEOPOLITICAL_KEYWORDS = [
    'geopolitics', 'summit', 'sanction', 'treaty', 'border', 'alliance', 'intelligence',
    'military', 'defense', 'war', 'conflict', 'diplomatic', 'embassy', 'foreign policy',
    'trade deal', 'sovereignty', 'territory', 'missile', 'nuclear', 'nato', 'un security',
    'bilateral', 'multilateral', 'geospatial', 'reconnaissance', 'deterrence', 'escalation',
    'de-escalation', 'peace talks', 'ceasefire', 'insurgency', 'hybrid warfare', 'cybersecurity'
];

const HIGH_PRIORITY_KEYWORDS = ['breaking', 'crisis', 'urgent', 'declared', 'invaded', 'emergency', 'attack', 'explosion', 'assassination', 'coup', 'uprising'];

const COUNTRIES = [
    'USA', 'China', 'Russia', 'India', 'UK', 'France', 'Germany', 'Japan', 'Iran', 'Israel',
    'Ukraine', 'Taiwan', 'North Korea', 'South Korea', 'Turkey', 'Saudi Arabia', 'UAE',
    'Pakistan', 'Brazil', 'Canada', 'Australia', 'Mexico', 'Egypt', 'Nigeria', 'South Africa',
    'Vietnam', 'Philippines', 'Poland', 'Finland', 'Sweden', 'Norway', 'Denmark', 'Italy', 'Spain',
    'Greece', 'Iraq', 'Syria', 'Yemen', 'Libya', 'Sudan', 'Ethiopia', 'Kenya', 'Mali', 'Niger',
    'Venezuela', 'Colombia', 'Argentina', 'Chile', 'Peru', 'Indonesia', 'Thailand', 'Malaysia',
    'Singapore', 'New Zealand', 'Switzerland', 'Belgium', 'Netherlands', 'Austria', 'Hungary',
    'Kazakhstan', 'Uzbekistan', 'Azerbaijan', 'Georgia', 'Armenia', 'Belarus', 'Moldova'
];

/**
 * Detect Country based on keywords
 */
const detectCountry = (text) => {
    const lowerText = text.toLowerCase();
    for (const country of COUNTRIES) {
        if (lowerText.includes(country.toLowerCase())) {
            return country;
        }
    }
    return null;
};

/**
 * Detect Continent based on keywords in text
 */
const detectContinent = (text) => {
    const lowerText = text.toLowerCase();
    const continentKeywords = {
        'Asia': ['china', 'india', 'japan', 'korea', 'pakistan', 'asia', 'beijing', 'delhi', 'tokyo', 'bangkok', 'seoul', 'taiwan', 'jakarta', 'hanoi', 'thailand', 'vietnam', 'philippines', 'malaysia', 'indonesia'],
        'Europe': ['uk', 'britain', 'france', 'germany', 'russia', 'ukraine', 'europe', 'london', 'paris', 'berlin', 'moscow', 'kyiv', 'brussels', 'madrid', 'rome', 'warsaw', 'helsinki', 'stockholm', 'oslo', 'copenhagen', 'vienna', 'budapest'],
        'North America': ['usa', 'america', 'canada', 'mexico', 'washington', 'ottawa', 'mexico city'],
        'South America': ['brazil', 'argentina', 'colombia', 'venezuela', 'chile', 'peru', 'amazon', 'caracas', 'bogota', 'lima', 'santiago', 'buenos aires'],
        'Africa': ['africa', 'egypt', 'nigeria', 'south africa', 'kenya', 'ethiopia', 'cairo', 'lagos', 'nairobi', 'addis ababa', 'bamako', 'niamey', 'johannesburg'],
        'Australia': ['australia', 'new zealand', 'sydney', 'canberra', 'aukland', 'wellington'],
        'Middle East': ['israel', 'gaza', 'iran', 'iraq', 'syria', 'saudi', 'turkey', 'yemen', 'qatar', 'dubai', 'tehran', 'jerusalem', 'beirut', 'tel aviv', 'riyadh', 'istanbul', 'ankara', 'baghdad', 'damascus']
    };

    for (const [continent, keywords] of Object.entries(continentKeywords)) {
        if (keywords.some(k => lowerText.includes(k))) {
            return continent;
        }
    }
    return 'Global';
};

const extractImage = (item, title) => {
    // 1. Try media:content (often has multiple, we want one with a URL)
    if (item['media:content']) {
        const media = Array.isArray(item['media:content']) ? item['media:content'] : [item['media:content']];
        const imageMedia = media.find(m => m.$ && m.$.url && (m.$.type?.includes('image') || m.$.medium === 'image'));
        if (imageMedia) return imageMedia.$.url;
        if (media[0] && media[0].$) return media[0].$.url;
    }

    // 2. Try media:thumbnail
    if (item['media:thumbnail'] && item['media:thumbnail'].$) return item['media:thumbnail'].$.url;

    // 3. Try enclosure
    if (item.enclosure && item.enclosure.url) return item.enclosure.url;

    // 4. Try legacy or alternative names
    if (item.mediaContent && item.mediaContent.url) return item.mediaContent.url;

    // 5. Check content for img tags (including content:encoded)
    const fullContent = item.contentEncoded || item.contentSnippet || item.content || '';
    const imgMatch = fullContent.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch) return imgMatch[1];

    // Fallback: Dynamic Unsplash image based on title keywords
    const keywords = (title || 'news').toLowerCase().split(' ').filter(w => w.length > 4).slice(0, 3).join(',');
    return `https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop&sig=${encodeURIComponent(keywords || 'geopolitics')}`;
};

const isGeopolitical = (text) => {
    const lowerText = text.toLowerCase();
    return GEOPOLITICAL_KEYWORDS.some(k => lowerText.includes(k));
};

const fetchNews = async () => {
    if (Article.base.connection.readyState !== 1) {
        console.warn('Database not connected. Skipping news fetch task.');
        return;
    }
    console.log('Running News Fetch Task (RSS)...');
    let count = 0;

    for (const feed of RSS_FEEDS) {
        try {
            const feedData = await parser.parseURL(feed.url);

            for (const item of feedData.items) {
                const title = item.title || 'No Title';
                const description = item.contentSnippet || item.content || 'No Description';

                // Only keep geopolitical news
                if (!isGeopolitical(title + ' ' + description)) continue;

                // Deduplication by URL
                const exists = await Article.findOne({ url: item.link });
                if (exists) continue;

                const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();
                const continent = detectContinent(title + ' ' + description);
                const country = detectCountry(title + ' ' + description);
                const urlToImage = extractImage(item, title);
                const isHighPriority = HIGH_PRIORITY_KEYWORDS.some(k => (title + ' ' + description).toLowerCase().includes(k));

                // Generate AI Analysis (Simulated)
                const analysis = await generateAnalysis(title, description);

                const newArticle = new Article({
                    title,
                    source: {
                        name: feed.source,
                        url: item.link
                    },
                    url: item.link,
                    urlToImage,
                    publishedAt: pubDate,
                    description,
                    content: item.content || description,
                    continent,
                    country,
                    isHighPriority,
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
        } catch (error) {
            console.error(`Error fetching RSS feed ${feed.source}:`, error.message);
        }
    }

    if (count > 0) console.log(`Fetched and saved ${count} new articles.`);
    else console.log('No new articles found.');
};

export default fetchNews;

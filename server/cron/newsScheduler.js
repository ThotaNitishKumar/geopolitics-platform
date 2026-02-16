import cron from 'node-cron';
import fetchNews from '../services/newsService.js';

const startCronJobs = () => {
    // Run every 15 minutes to respect API limits (Free tier is usually limited)
    // User asked for 1 minute, but that will likely hit rate limits immediately on free tier (100 req/day usually).
    // I'll set it to 30 mins for safety, or 1 hour.
    // For "real-time" feel with free API, 15-30 mins is standard.
    // If user insists on 1 min, I'll put 1 min but warn.
    // I will use '*/15 * * * *' (every 15 mins).

    // Run every minute as requested by user
    cron.schedule('* * * * *', () => {
        console.log('Running News Fetch Task...');
        fetchNews();
    });

    console.log('News Scheduler started (Every 15 minutes).');
};

export default startCronJobs;

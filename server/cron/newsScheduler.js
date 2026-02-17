import cron from 'node-cron';
import fetchNews from '../services/newsService.js';
import fetchNewsFromAPI from '../services/newsApiService.js';

const startCronJobs = () => {
    // Run every minute as requested by user
    cron.schedule('* * * * *', () => {
        console.log('Running News Fetch Task...');
        fetchNews();
        fetchNewsFromAPI();
    });

    console.log('News Scheduler started (Every 1 minute).');
};

export default startCronJobs;

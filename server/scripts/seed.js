import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import User from '../models/User.js';
import Article from '../models/Article.js';
import Conflict from '../models/Conflict.js';
import connectDB from '../config/db.js';
import bcrypt from 'bcryptjs';
import generateAnalysis from '../services/aiService.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Article.deleteMany();
        await User.deleteMany();
        await Conflict.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('123456', salt);

        const createdUsers = await User.insertMany([
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                isAdmin: true,
            },
            {
                name: 'John Doe',
                email: 'john@example.com',
                password: hashedPassword,
                isAdmin: false,
            },
        ]);

        const adminUser = createdUsers[0]._id;

        // Generate mock articles with AI analysis
        const articlesData = [
            {
                title: 'Global Tensions Rise',
                source: { name: 'BBC', url: 'https://bbc.com' },
                url: 'https://bbc.com/news/world-1',
                publishedAt: new Date(),
                country: 'Global',
                continent: 'Global',
                description: 'Trade wars and sanctions are reshaping the global economy.',
                content: 'Full content here...',
                category: 'Politics',
            },
            {
                title: 'New Trade Deal in Asia',
                source: { name: 'Reuters', url: 'https://reuters.com' },
                url: 'https://reuters.com/news/asia-trade',
                publishedAt: new Date(),
                country: 'Japan',
                continent: 'Asia',
                description: 'Economic cooperation increases in East Asia.',
                content: 'Full content here...',
                category: 'Economy',
            },
            {
                title: 'Military Exercises in the Pacific',
                source: { name: 'Defense News', url: 'https://defensenews.com' },
                url: 'https://defensenews.com/pacific-drills',
                publishedAt: new Date(),
                country: 'USA',
                continent: 'North America',
                description: 'Naval drills conducted to ensure freedom of navigation.',
                content: 'Full content here...',
                category: 'Military',
            },
        ];

        for (const article of articlesData) {
            const analysis = await generateAnalysis(article.title, article.description);
            await Article.create({
                ...article,
                summary: analysis.summary,
                analysis: {
                    strategicImpact: analysis.strategicImpact,
                    economicImpact: analysis.economicImpact,
                    globalReaction: analysis.globalReaction
                }
            });
        }

        await Conflict.insertMany([
            {
                title: 'Eastern Europe Offensive',
                countriesInvolved: ['Russia', 'Ukraine'],
                secondaryParties: ['USA', 'Poland', 'UK', 'EU'],
                region: 'Eastern Europe',
                riskLevel: 'Critical',
                description: 'The largest conventional military conflict in Europe since WWII, reshaping global alliances.',
                recentDevelopments: 'Intensified drone warfare and missile strikes on energy infrastructure.',
                historicalContext: 'Rooted in post-Soviet security architectural disputes and national sovereignty claims.',
                intensity: 98,
                relatedTopics: ['NATO', 'Sanctions', 'Energy Security']
            },
            {
                title: 'Indo-Pacific Naval Standoff',
                countriesInvolved: ['China', 'USA', 'Taiwan'],
                secondaryParties: ['Japan', 'Australia', 'Philippines'],
                region: 'Asia Pacific',
                riskLevel: 'High',
                description: 'Tensions over sovereignty in the South China Sea and the future of Taiwan.',
                recentDevelopments: 'Increased naval patrols and strategic aircraft deployment in the region.',
                historicalContext: 'Centuries of maritime trade dominance and 20th-century geopolitical shifts.',
                intensity: 85,
                relatedTopics: ['Semiconductors', 'South China Sea', 'Freedom of Navigation']
            },
            {
                title: 'Middle East Regional Escalation',
                countriesInvolved: ['Israel', 'Iran', 'Lebanon'],
                secondaryParties: ['Jordan', 'Syria', 'Yemen', 'USA'],
                region: 'Middle East',
                riskLevel: 'Critical',
                description: 'A multi-front conflict involving state and non-state actors across the Levant.',
                recentDevelopments: 'Escalating border exchanges and targeted strategic operations.',
                historicalContext: 'Decades of territorial disputes and ideological competition for regional influence.',
                intensity: 92,
                relatedTopics: ['Oil Markets', 'Gaza', 'Red Sea Shipping']
            },
            {
                title: 'West African Political Stability',
                countriesInvolved: ['Mali', 'Niger', 'Burkina Faso'],
                secondaryParties: ['ECOWAS', 'France', 'Russia'],
                region: 'West Africa',
                riskLevel: 'Moderate',
                description: 'Internal security challenges and shifts in international defense partnerships.',
                recentDevelopments: 'Withdrawal from regional blocs and formation of new security alliances.',
                historicalContext: 'Post-colonial governance transitions and fight against regional insurgency.',
                intensity: 65,
                relatedTopics: ['Sahel Security', 'Mining', 'Counter-terrorism']
            }
        ]);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Article.deleteMany();
        await User.deleteMany();
        await Conflict.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

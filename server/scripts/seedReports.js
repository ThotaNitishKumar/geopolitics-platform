import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Report from '../models/Report.js';
import connectDB from '../config/db.js';

dotenv.config();

const reports = [
    {
        title: 'The Great Tech Decoupling: A 2035 Strategic Forecast',
        region: 'Global',
        type: 'Strategic Forecast',
        riskLevel: 'High',
        summary: 'An in-depth analysis of the fracturing global technology supply chain and the emergence of two distinct digital ecosystems.',
        readingTime: '15 min',
        featured: true,
        executiveSummary: {
            keyFindings: [
                'Complete bifurcation of semiconductor supply chains by 2030.',
                'Emergence of distinct Western and Eastern digital standards.',
                'Localized AI sovereign clouds as a primary security requirement.'
            ],
            strategicRisks: [
                'Incompatibility of global communications infrastructure.',
                'Increased cost of dual-track technology development.',
                'Cyber espionage within competing ecosystems.'
            ],
            futureOutlook: 'Broad divergence in technological standards will lead to a more rigid but perhaps more predictable bipolar stability.'
        },
        background: {
            context: 'The trajectory of export controls since 2022 has set the stage for a systemic withdrawal from global tech integration.',
            timeline: [
                { date: '2022', event: 'Initial high-end semiconductor export restrictions.' },
                { date: '2025', event: 'Mandatory on-shoring of critical mineral processing.' },
                { date: '2028', event: 'Formalization of the Global Digital Trade Bloc (GDTB).' }
            ]
        },
        analysis: {
            politicalDynamics: 'Nationalism is increasingly equated with technological sovereignty, leading to protective industrial policies.',
            militaryMovements: 'Integration of AI in command and control systems necessitates secure, closed-loop technology stacks.',
            economicEffects: 'Reduced economies of scale will drive up prices for high-end consumer electronics while boosting domestic manufacturing.'
        },
        strategicForecast: {
            shortTerm: 'Intense competition for talent and rare earth minerals.',
            mediumTerm: 'Standardization within regional blocs becomes permanent.',
            longTerm: 'Space-based internet providing redundant, non-territorial connectivity.'
        },
        riskAssessment: {
            escalationProbability: 'Moderate',
            nuclearRisk: 'N/A',
            regionalSpillover: 'High (ASEAN as the primary tech bridge)',
            globalImpact: 'Critical'
        },
        conclusion: {
            policyImplications: ['Governments should subsidize domestic fabrication.', 'Diverse sourcing of raw materials is essential.'],
            investorWatchlist: ['Semiconductor giants', 'Cybersecurity firms', 'Energy storage startups'],
            civilianExpectations: ['Higher prices for hardware', 'Siloed digital services']
        },
        references: ['UN Digital Cooperation Report 2024', 'SIPRI Tech Analysis 2025']
    },
    {
        title: 'Middle East Energy Transition: Post-Petrodollar Realities',
        region: 'Middle East',
        type: 'Economic Forecast',
        riskLevel: 'Medium',
        summary: 'Assessing the economic resilience of Gulf states as the global economy shifts towards renewable energy sources.',
        readingTime: '12 min',
        executiveSummary: {
            keyFindings: ['Rapid diversification into green hydrogen.', 'Sovereign wealth funds pivoting to tech.', 'New regional trade corridors bypassing old routes.'],
            strategicRisks: ['Internal social friction due to subsidy cuts.', 'Regional competition for dominance in green energy exports.'],
            futureOutlook: 'Gulf states that successfully leverage their capital for tech-driven growth will maintain regional leadership.'
        },
        background: {
            context: 'As decarbonization accelerates, the traditional oil-based economies of the GCC are facing a generational pivot point.',
            timeline: [
                { date: '2023', event: 'Record IPOs in Saudi tech firms.' },
                { date: '2025', event: 'First industrial-scale green hydrogen exports.' }
            ]
        },
        analysis: {
            politicalDynamics: 'Internal reform agendas (e.g., Vision 2030) are being accelerated to outpace global oil demand peaks.',
            militaryMovements: 'Diversification of defense procurement away from US towards domestic and Asian suppliers.',
            economicEffects: 'Capitalization on strategic location as a link between East and West trade blocs.'
        },
        strategicForecast: {
            shortTerm: 'Continued high volatility in crude markets.',
            mediumTerm: 'Standardized regional energy grid completion.',
            longTerm: 'Dominance in global ammonia and hydrogen shipping.'
        },
        riskAssessment: {
            escalationProbability: 'Low-Moderate',
            nuclearRisk: 'N/A',
            regionalSpillover: 'Medium',
            globalImpact: 'High'
        }
    },
    {
        title: 'US-China Economic Tensions: The Silicon Shield Strategy',
        region: 'Americas',
        type: 'Trade Analysis',
        riskLevel: 'High',
        summary: 'Analyzing the impact of export controls on AI chips and the strategic importance of Taiwan in the global semiconductor supply chain.',
        readingTime: '18 min',
        executiveSummary: {
            keyFindings: ['US shifting from "de-risking" back to active containment.', 'Massive subsidies for domestic chip fabrication (CHIPS Act).', 'Taiwan remaining the single point of failure in global tech.'],
            strategicRisks: ['Retaliation via rare earth export bans.', 'Accelerated Chinese domestic innovation.'],
            futureOutlook: 'A high-friction economic environment will persist, forcing corporations to adopt "China+1" supply chain strategies.'
        },
        background: {
            context: 'The "Silicon Shield" refers to the theory that Taiwan\'s semiconductor dominance deters military conflict.',
            timeline: [
                { date: '2022', event: 'Passage of the US CHIPS and Science Act.' },
                { date: '2024', event: 'Expansion of export controls to sub-14nm equipment.' }
            ]
        },
        analysis: {
            politicalDynamics: 'Technology has replaced trade as the primary arena for great power competition.',
            militaryMovements: 'Increased naval presence in the South China Sea to secure shipping lanes.',
            economicEffects: 'Inflationary pressure on consumer electronics as manufacturing decentralizes.'
        },
        strategicForecast: {
            shortTerm: 'Supply chain friction and inventory stockpiling.',
            mediumTerm: 'Bifurcation of global technical standards.',
            longTerm: 'Emergence of sovereign AI ecosystems.'
        },
        riskAssessment: {
            escalationProbability: 'High',
            nuclearRisk: 'Low',
            regionalSpillover: 'Extreme',
            globalImpact: 'Systemic'
        }
    },
    {
        title: 'The Future of European Defense: Post-Ukraine Strategic Autonomy',
        region: 'Europe',
        type: 'Security Analysis',
        riskLevel: 'Medium',
        summary: 'Evaluating the European Union\'s move towards a unified military industrial complex and its implications for the NATO alliance.',
        readingTime: '14 min',
        executiveSummary: {
            keyFindings: ['Record-breaking defense budgets across Germany and Poland.', 'Consolidation of European defense contractors.', 'Decreasing reliance on US security guarantees.'],
            strategicRisks: ['Internal political fragmentation within the EU.', 'Logistical incompatibility of national military systems.'],
            futureOutlook: 'Europe will emerge as a more independent pillar of Western security, though NATO will remain the primary core.'
        },
        background: {
            context: 'The invasion of Ukraine in 2022 shattered decades of European security complacency.',
            timeline: [
                { date: '2022', event: 'Germany announces 100bn Euro defense fund.' },
                { date: '2024', event: 'Joint procurement of next-generation fighter systems.' }
            ]
        },
        analysis: {
            politicalDynamics: 'The shift from "soft power" to "strategic autonomy" is redefining the Franco-German axis.',
            militaryMovements: 'Permanent deployment of NATO battlegroups in the Baltics and Poland.',
            economicEffects: 'Ramping up of military-industrial production capacity across the continent.'
        },
        strategicForecast: {
            shortTerm: 'Backfilling of stockpiles sent to Ukraine.',
            mediumTerm: 'Standardization of pan-European ammunition and parts.',
            longTerm: 'Unified European rapid response force capability.'
        }
    }
];

const seedReports = async () => {
    try {
        await connectDB();
        console.log('Clearing existing reports...');
        await Report.deleteMany({});

        console.log('Inserting comprehensive reports individually...');
        for (const r of reports) {
            try {
                await Report.create(r);
                console.log(`✓ Seeded: ${r.title}`);
            } catch (err) {
                console.error(`✗ Failed: ${r.title} - ${err.message}`);
            }
        }

        console.log('Seeding process complete.');
        process.exit();
    } catch (error) {
        console.error('Core Seeding Error:', error);
        process.exit(1);
    }
};

seedReports();

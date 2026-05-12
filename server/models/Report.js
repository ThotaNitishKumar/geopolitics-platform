import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    region: String,
    type: {
        type: String, // 'Risk Assessment', 'Military Analysis', 'Economic Forecast', 'Conflict Briefing'
        required: true,
    },
    riskLevel: {
        type: String, // 'Low', 'Medium', 'High', 'Critical'
        required: true,
    },
    summary: String, // Short 2-3 line summary for grid
    publishDate: {
        type: Date,
        default: Date.now,
    },
    readingTime: String,
    isPremium: {
        type: Boolean,
        default: false,
    },
    featured: {
        type: Boolean,
        default: false,
    },

    // Detailed Content Sections
    executiveSummary: {
        keyFindings: [String],
        strategicRisks: [String],
        futureOutlook: String
    },
    background: {
        context: String,
        timeline: [{
            date: String,
            event: String
        }]
    },
    analysis: {
        politicalDynamics: String,
        militaryMovements: String,
        economicEffects: String
    },
    dataAndCharts: [{
        title: String,
        type: { type: String }, // 'bar', 'line', 'pie', 'table'
        data: mongoose.Schema.Types.Mixed
    }],
    strategicForecast: {
        shortTerm: String,
        mediumTerm: String,
        longTerm: String
    },
    riskAssessment: {
        escalationProbability: String,
        nuclearRisk: String,
        regionalSpillover: String,
        globalImpact: String
    },
    conclusion: {
        policyImplications: [String],
        investorWatchlist: [String],
        civilianExpectations: [String]
    },
    references: [String]
}, {
    timestamps: true,
});

// Pre-save slug generation
reportSchema.pre('save', function (next) {
    if (this.title && !this.slug) {
        this.slug = this.title.toLowerCase().replace(/[^a-z0-0]+/g, '-').replace(/(^-|-$)/g, '');
    }
    next();
});

const Report = mongoose.model('Report', reportSchema);

export default Report;

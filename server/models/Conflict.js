import mongoose from 'mongoose';

const conflictSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    startDate: String,
    status: {
        type: String, // 'Active', 'Escalating', 'Ceasefire', 'Frozen'
        default: 'Active',
    },
    type: {
        type: String, // 'War', 'Civil War', 'Border Dispute', 'Proxy War'
    },
    riskLevel: {
        type: String, // 'Critical', 'High', 'Moderate', 'Low'
        required: true,
    },
    riskMeter: {
        type: Number, // 1-100 scale
        default: 50,
    },
    intensity: {
        type: Number, // 1-100 scale for heatmap
        default: 50,
    },
    casualties: String,
    region: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: Number,
        lng: Number
    },
    overview: String,
    situationSummary: String,
    whyItExists: String,
    involvedParties: {
        mainActors: [String],
        supporters: [String],
        alliances: [String],
        proxyGroups: [String],
        internationalStance: String
    },
    militaryStats: {
        sideA: {
            name: String,
            troops: String,
            tanks: String,
            aircraft: String,
            naval: String,
            nuclear: Boolean,
            budget: String
        },
        sideB: {
            name: String,
            troops: String,
            tanks: String,
            aircraft: String,
            naval: String,
            nuclear: Boolean,
            budget: String
        }
    },
    economicImpact: {
        oilGasImpact: String,
        tradeDisruption: String,
        sanctions: String,
        refugees: String,
        charts: [{
            label: String,
            value: Number,
            trend: String
        }]
    },
    timeline: [{
        date: String,
        event: String,
        description: String,
        isMilestone: Boolean
    }],
    latestUpdates: [{
        timestamp: { type: Date, default: Date.now },
        content: String,
        isBreaking: Boolean
    }],
    isHistorical: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const Conflict = mongoose.model('Conflict', conflictSchema);

export default Conflict;

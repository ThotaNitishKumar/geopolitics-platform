import mongoose from 'mongoose';

const conflictSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    countriesInvolved: [{
        type: String,
        required: true,
    }],
    region: {
        type: String, // e.g., 'Eastern Europe', 'Middle East'
        required: true,
    },
    riskLevel: {
        type: String, // 'Critical', 'High', 'Moderate', 'Low'
        required: true,
    },
    status: {
        type: String, // 'Active', 'Frozen', 'De-escalating'
        default: 'Active',
    },
    description: String,
    timeline: [{
        date: Date, // Date of event
        event: String,
    }],
    intensity: {
        type: Number, // 1-100 scale for heatmap
        default: 50,
    },
    secondaryParties: [String],
    recentDevelopments: String,
    historicalContext: String,
    relatedTopics: [String]
}, {
    timestamps: true,
});

const Conflict = mongoose.model('Conflict', conflictSchema);

export default Conflict;

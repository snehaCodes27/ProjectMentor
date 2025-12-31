import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true,
        trim: true
    },
    teamCode: {
        type: String,
        unique: true
    },
    year: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['solo', 'team'],
        default: 'solo'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected'],
            default: 'pending'
        },
        invitedAt: {
            type: Date,
            default: Date.now
        }
    }],
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    currentStep: {
        type: Number,
        default: 0
    },
    selectedTopic: {
        title: String,
        domain: String,
        problem: String,
        solution: String,
        techStack: [String],
        innovationLevel: Number,
        outcome: String
    },
    projectTitle: String,
    projectTagline: String,
    projectDNA: {
        problem: String,
        targetUsers: String,
        techStack: [String],
        complexity: String,
        innovation: String,
        timeline: String,
        feasibilityScore: String
    },
    projectSolution: {
        overview: String,
        modules: [{
            name: String,
            description: String
        }],
        userFlow: [String],
        aiRole: String,
        dataFlow: String,
        whyItWorks: [String]
    },
    projectRoadmap: {
        phases: [{
            phaseName: String,
            duration: String,
            status: {
                type: String,
                enum: ['locked', 'in-progress', 'completed', 'delayed'],
                default: 'locked'
            },
            tasks: [{
                taskTitle: String,
                goal: String,
                tools: [String],
                output: String,
                status: {
                    type: String,
                    enum: ['pending', 'in-progress', 'completed'],
                    default: 'pending'
                }
            }]
        }],
        aiNextSuggestion: String
    },
    projectConfidence: {
        score: Number,
        analysis: String,
        strengths: [String],
        weaknesses: [String],
        recommendations: [String]
    },
    failurePredictor: {
        riskLevel: String,
        risks: [{
            title: String,
            probability: String,
            mitigation: String
        }],
        uniquenessScore: Number
    },
    promptLibrary: [{
        category: String, // e.g., "Frontend", "Backend", "Database"
        promptTitle: String,
        promptText: String,
        usageGuide: String
    }],
    presentationSlides: [{
        slideNumber: Number,
        title: String,
        content: [String],
        visualNote: String
    }],
    projectDocumentation: {
        abstract: String,
        chapters: [{
            title: String,
            content: String
        }]
    },
    vivaIntelligence: [{
        question: String,
        answer: String,
        difficulty: String, // e.g., "Easy", "Hard"
        topic: String // e.g., "Architecture", "Tech Stack"
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'archived'],
        default: 'active'
    }
}, {
    timestamps: true
});

// Generate unique team code before saving
workspaceSchema.pre('save', async function (next) {
    if (!this.teamCode) {
        this.teamCode = `TEAM-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    }
    next();
});

export default mongoose.model('Workspace', workspaceSchema);

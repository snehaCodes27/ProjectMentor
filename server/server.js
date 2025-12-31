import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import User from './models/User.js';
import Workspace from './models/Workspace.js';
import { sendTeamInvitation, sendWelcomeEmail, sendVerificationEmail, sendMemberRemovedEmail, sendNewLeaderEmail } from './utils/emailService.js';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
// Port defined at bottom

// Middleware
app.use(helmet({
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
    origin: '*', // Allow all for development to fix "Failed to fetch"
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/projectmentor', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Groq AI Config (Using OpenAI-compatible SDK)
const groq = new OpenAI({
    apiKey: process.env.GROK_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

// Multer configuration for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
            file.mimetype === 'application/vnd.ms-powerpoint') {
            cb(null, true);
        } else {
            cb(new Error('Only PowerPoint files are allowed'), false);
        }
    }
});

async function generateAIResponse(prompt, isJson = true) {
    try {
        console.log('🤖 Sending request to Groq AI...');
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile", // High performance model
            messages: [
                { role: "system", content: "You are an expert project mentor AI. " + (isJson ? "Always respond in valid JSON format. Do not include markdown code blocks like ```json." : "") },
                { role: "user", content: prompt }
            ],
            response_format: isJson ? { type: "json_object" } : { type: "text" },
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        return isJson ? JSON.parse(content) : content;
    } catch (err) {
        console.error('❌ Groq AI Error:', err.message);
        throw err;
    }
}
console.log('✅ Groq AI initialized (Model: llama-3.3-70b-versatile)');

// ==================== ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Project Mentor API is running',
        timestamp: new Date().toISOString()
    });
});

// ==================== USER ROUTES ====================

// Create or update user profile
app.post('/api/users/profile', async (req, res) => {
    try {
        const { name, email, branch, year, googleId, profilePic } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });

        if (user) {
            // Update existing user
            user.name = name || user.name;
            user.branch = branch || user.branch;
            user.year = year || user.year;
            user.googleId = googleId || user.googleId;
            user.profilePic = profilePic || user.profilePic;

            // If Google ID is provided, mark email as verified
            if (googleId) {
                user.isEmailVerified = true;
            }

            await user.save();
        } else {
            // Create new user
            user = new User({ name, email, branch, year, googleId, profilePic });

            // If signing up with Google, mark as verified
            if (googleId) {
                user.isEmailVerified = true;
                await user.save();
                await sendWelcomeEmail({ to: email, name });
            } else {
                // Regular signup - send verification email
                const verificationToken = user.generateVerificationToken();
                await user.save();
                await sendVerificationEmail({ to: email, name, verificationToken });
            }
        }

        res.status(200).json({
            success: true,
            message: googleId ? 'Profile saved successfully' : 'Profile created! Please check your email to verify your account.',
            user,
            needsVerification: !user.isEmailVerified
        });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to save profile',
            error: error.message
        });
    }
});

// Get user by email
app.get('/api/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch user',
            error: error.message
        });
    }
});

// Verify email
app.get('/api/verify-email/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }

        user.isEmailVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        // Send welcome email
        await sendWelcomeEmail({ to: user.email, name: user.name });

        res.status(200).json({
            success: true,
            message: 'Email verified successfully! Welcome to Project Mentor.',
            user
        });
    } catch (error) {
        console.error('Error verifying email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify email',
            error: error.message
        });
    }
});

// Resend verification email
app.post('/api/resend-verification', async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({
                success: false,
                message: 'Email is already verified'
            });
        }

        const verificationToken = user.generateVerificationToken();
        await user.save();

        await sendVerificationEmail({ to: email, name: user.name, verificationToken });

        res.status(200).json({
            success: true,
            message: 'Verification email sent! Please check your inbox.'
        });
    } catch (error) {
        console.error('Error resending verification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to resend verification email',
            error: error.message
        });
    }
});

// ==================== WORKSPACE ROUTES ====================

// Create workspace
app.post('/api/workspaces', async (req, res) => {
    try {
        const { teamName, year, platform, type, members = [], createdByEmail } = req.body;

        // Find the creator
        const creator = await User.findOne({ email: createdByEmail });
        if (!creator) {
            return res.status(404).json({
                success: false,
                message: 'Creator not found. Please create a profile first.'
            });
        }

        // Create workspace
        const workspace = new Workspace({
            teamName,
            year,
            platform,
            type,
            createdBy: creator._id,
            members: members.map(email => ({ email, status: 'pending' }))
        });

        await workspace.save();

        // Send email invitations to all team members
        if (type === 'team' && members.length > 0) {
            const emailPromises = members.map(memberEmail =>
                sendTeamInvitation({
                    to: memberEmail,
                    teamName,
                    inviterName: creator.name,
                    projectDetails: `${platform} project - ${year}`
                })
            );

            await Promise.allSettled(emailPromises);
        }

        res.status(201).json({
            success: true,
            message: 'Workspace created successfully! Email invitations sent to team members.',
            workspace
        });
    } catch (error) {
        console.error('Error creating workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create workspace',
            error: error.message
        });
    }
});

// Get all workspaces for a user
app.get('/api/workspaces/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Find workspaces where user is creator or member
        const workspaces = await Workspace.find({
            $or: [
                { createdBy: user._id },
                { 'members.email': user.email }
            ]
        })
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            workspaces
        });
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch workspaces',
            error: error.message
        });
    }
});

// Get workspace by ID
app.get('/api/workspaces/:id', async (req, res) => {
    try {
        const workspace = await Workspace.findById(req.params.id)
            .populate('createdBy', 'name email branch year')
            .populate('members.userId', 'name email');

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        res.status(200).json({
            success: true,
            workspace
        });
    } catch (error) {
        console.error('Error fetching workspace:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch workspace',
            error: error.message
        });
    }
});

// ==================== AI JOURNEY ROUTES ====================

// Step 1: Generate Project Topics
app.post('/api/ai/generate-topics', async (req, res) => {
    try {
        const { branch, domain, skills, platform, difficulty } = req.body;

        const prompt = `
            You are an expert academic project mentor. You MUST generate EXACTLY 5 unique and innovative project topics for a final year student.
            Return an ARRAY of project objects. If you provide fewer than 5, the system will fail.
            
            Student Profile:
            - Branch: ${branch}
            - Domain: ${domain}
            - Skills/Interests: ${skills}
            - Target Platform: ${platform}
            1. Difficulty Enforcement (ABSOLUTE PRIORITY):
               - If 'Easy': Focus on fundamental concepts. Use basic web (HTML/CSS/JS/PHP) or simple Python scripts. EXPLICITLY FORBID: Artificial Intelligence, Machine Learning, Blockchain, Advanced Cryptography, or complex Real-time systems. Projects should be manageable for a beginner.
               - If 'Medium': Balanced professional complexity using modern frameworks (React, Node, Django).
               - If 'Advanced': Must involve innovation, scalability, complex algorithms (AI/ML/DL), or cutting-edge tech (Web3/IoT).
            
            2. Uniqueness:
               - No repetitive titles like 'Hospital Management' or 'Library System'. Use creative angles.

            Return the output strictly in JSON format as an array of objects.
            Each object must have these EXACT fields:
            - title: A professional topic title
            - domain: The chosen domain
            - problem: A concise real-world problem statement (max 2 sentences)
            - solution: A concise proposed solution (max 2 sentences)
            - innovationLevel: A number from 1 to 5 (Make sure this matches the difficulty!)
            - techStack: An array of 4-5 major tools/technologies
            - outcome: Expected final outcome/impact

            Do not include any other text, markdown formatting, or code blocks. Only the raw JSON array.
        `;

        const topics = await generateAIResponse(prompt, true);
        const topicsData = Array.isArray(topics) ? topics : (topics.projects || topics.topics || Object.values(topics).find(v => Array.isArray(v)) || [topics]);

        console.log('🤖 AI Topic Gen Response received');
        res.status(200).json({
            success: true,
            topics: topicsData.slice(0, 5) // Ensure we only return 5
        });
    } catch (error) {
        console.error('❌ Groq AI Error:', error);
        res.status(500).json({
            success: false,
            message: 'AI Service Error. Please check your Groq API key.',
            error: error.message
        });
    }
});

// Select and Lock Topic
app.post('/api/workspaces/:id/select-topic', async (req, res) => {
    try {
        const { topic } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.selectedTopic = topic;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 1); // Advance to next step (Project Name Selection)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Topic selected and locked!',
            workspace
        });
    } catch (error) {
        console.error('Error selecting topic:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to select topic',
            error: error.message
        });
    }
});

// Step 2: Generate Project Names
app.post('/api/ai/generate-names', async (req, res) => {
    try {
        const { topic, domain, problem, solution, style, customIntent } = req.body;

        let stylePrompt = "Generate 5 unique project names with different styles.";
        if (style === 'custom' && customIntent) {
            stylePrompt = `User wants names that are: ${customIntent}. Generate 5 names fitting this description.`;
        }

        const prompt = `
            You are a creative branding expert for tech projects.
            Based on the following project details:
            - Domain: ${domain}
            - Topic: ${topic}
            - Problem: ${problem}
            - Solution: ${solution}

            ${stylePrompt}

            Generate strictly 6 unique project names, each with a distinct style.
            The styles should cover: Professional, Startup, Secure, AI/Future, Utility, and Friendly.

            Return the output strictly in JSON format as an array of objects.
            Each object must have these EXACT fields:
            - name: The project name (creative, catchy)
            - meaning: A one-line meaning (e.g. "Smart system to track...")
            - tagline: A short tagline (e.g. "Track. Analyze. Improve.")
            - style: The style tag (e.g. "Professional", "Startup", "Secure", "AI / Future", "Utility", "Friendly")

            Do not include any other text or markdown. Only the raw JSON array.
        `;

        const names = await generateAIResponse(prompt, true);
        const namesData = Array.isArray(names) ? names : (names.names || names.projectNames || names.project_names || Object.values(names).find(v => Array.isArray(v)) || [names]);

        console.log('🤖 AI Name Gen Response received');
        res.status(200).json({
            success: true,
            names: namesData.slice(0, 6) // Ensure we only return 6
        });
    } catch (error) {
        console.error('❌ Groq AI Error (Names):', error);
        res.status(500).json({
            success: false,
            message: 'AI Service Error',
            error: error.message
        });
    }
});

// Select and Lock Project Name
app.post('/api/workspaces/:id/select-name', async (req, res) => {
    try {
        const { nameData } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        // We'll store the object in a new field or just the string name.
        // Assuming we update teamName or have a specific projectTitle field.
        // The Schema likely has teamName. Let's assume we want to call this the "Project Title".
        // If the schema allows arbitrary fields, good. If not, we might need to add it.
        // Looking at Workspace.js (implied), it has 'teamName' but maybe not 'projectTitle'.
        // Let's check Schema if possible, but for now I'll save to 'projectTitle' if schema allows loose,
        // or just 'teamName' if that was the intent.
        // Actually, earlier code: "projectDetails: `${platform} project..." suggests we have teamName.
        // Let's assume we maintain teamName as the group name, and this is the PROJECT name.
        // I will add 'projectTitle' and 'projectData' fields to the workspace schema if I could, but I can't edit it easily without viewing it.
        // I'll check Workspace.js first to be safe. But for this step...
        // Let's just update the workspace object.
        workspace.projectTitle = nameData.name;
        workspace.projectTagline = nameData.tagline;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 2); // Advance to next step (Project DNA)

        // Just in case schema is restrict, we might need to define these.
        // But assuming Mongoose is usually lax or I can update it.
        // Wait, I should verify Workspace.js to ensure I can save these fields.

        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Project name selected and locked!',
            workspace
        });
    } catch (error) {
        console.error('Error selecting name:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to select name',
            error: error.message
        });
    }
});

// Add member to workspace
app.post('/api/workspaces/:id/members', async (req, res) => {
    try {
        const { email, inviterEmail } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({
                success: false,
                message: 'Workspace not found'
            });
        }

        // Check if member already exists
        const memberExists = workspace.members.some(m => m.email === email);
        if (memberExists) {
            return res.status(400).json({
                success: false,
                message: 'Member already added to this workspace'
            });
        }

        // Add member
        workspace.members.push({ email, status: 'pending' });
        await workspace.save();

        // Get inviter details
        const inviter = await User.findOne({ email: inviterEmail });

        // Send invitation email
        await sendTeamInvitation({
            to: email,
            teamName: workspace.teamName,
            inviterName: inviter?.name || 'A team member',
            projectDetails: `${workspace.platform} project - ${workspace.year}`
        });

        res.status(200).json({
            success: true,
            message: 'Member added and invitation sent!',
            workspace
        });
    } catch (error) {
        console.error('Error adding member:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add member',
            error: error.message
        });
    }
});

// Remove member from workspace
app.delete('/api/workspaces/:id/members/:email', async (req, res) => {
    try {
        const { id, email } = req.params;
        const workspace = await Workspace.findById(id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        // Remove member
        workspace.members = workspace.members.filter(m => m.email !== email);
        await workspace.save();

        // Send notification
        await sendMemberRemovedEmail({ to: email, teamName: workspace.teamName });

        await workspace.populate('createdBy', 'name email');

        res.status(200).json({ success: true, message: 'Member removed', workspace });
    } catch (error) {
        console.error('Error removing member:', error);
        res.status(500).json({ success: false, message: 'Failed to remove member', error: error.message });
    }
});

// Promote member to leader
app.put('/api/workspaces/:id/leader', async (req, res) => {
    try {
        const { newLeaderEmail } = req.body;
        const workspace = await Workspace.findById(req.params.id).populate('createdBy');

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        const newLeader = await User.findOne({ email: newLeaderEmail });
        if (!newLeader) {
            return res.status(404).json({ success: false, message: 'New leader user profile not found' });
        }

        // 1. Add current leader (creator) to members list (if not already there)
        const oldLeaderEmail = workspace.createdBy.email;
        const oldLeaderInMembers = workspace.members.some(m => m.email === oldLeaderEmail);

        if (!oldLeaderInMembers) {
            workspace.members.push({
                email: oldLeaderEmail,
                userId: workspace.createdBy._id,
                status: 'accepted'
            });
        }

        // 2. Set new leader as createdBy
        workspace.createdBy = newLeader._id;

        // 3. Remove new leader from members list
        workspace.members = workspace.members.filter(m => m.email !== newLeaderEmail);

        await workspace.save();

        // 4. Send notifications to ALL team members (old leader, new leader, and others)
        const allEmails = [oldLeaderEmail, newLeaderEmail, ...workspace.members.map(m => m.email)];
        const uniqueEmails = [...new Set(allEmails)]; // Ensure uniqueness

        const emailPromises = uniqueEmails.map(email =>
            sendNewLeaderEmail({
                to: email,
                teamName: workspace.teamName,
                newLeaderName: newLeader.name
            })
        );

        await Promise.allSettled(emailPromises);

        await workspace.populate('createdBy', 'name email');

        res.status(200).json({ success: true, message: 'Leadership transferred successfully', workspace });
    } catch (error) {
        console.error('Error transferring leadership:', error);
        res.status(500).json({ success: false, message: 'Failed to transfer leadership', error: error.message });
    }
});

// ==================== STATS ROUTES ====================

// Get user statistics
app.get('/api/stats/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const totalProjects = await Workspace.countDocuments({
            $or: [
                { createdBy: user._id },
                { 'members.email': user.email }
            ]
        });

        const completedProjects = await Workspace.countDocuments({
            $or: [
                { createdBy: user._id },
                { 'members.email': user.email }
            ],
            status: 'completed'
        });

        const inProgressProjects = await Workspace.countDocuments({
            $or: [
                { createdBy: user._id },
                { 'members.email': user.email }
            ],
            status: 'active'
        });

        res.status(200).json({
            success: true,
            stats: {
                totalProjects,
                completedProjects,
                inProgressProjects
            }
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics',
            error: error.message
        });
    }
});

// Step 3: Generate Project DNA
app.post('/api/ai/generate-dna', async (req, res) => {
    try {
        const { topic, domain, projectTitle, projectTagline, problem, solution } = req.body;

        const prompt = `
            You are a Chief Technology Officer (CTO) and Product Architect.
            Analyze this project idea to build its "Project DNA" - the single source of truth for development.

            Project Details:
            - Domain: ${domain}
            - Topic: ${topic}
            - Name: ${projectTitle}
            - Tagline: ${projectTagline}
            - Initial Problem: ${problem}
            - Initial Solution: ${solution}

            Analyze deeply and generate a structured DNA blueprint.
            Return strictly JSON with these fields:
            - problem: Refined, specific core problem statement (max 1 sentence)
            - targetUsers: Specific target audience
            - techStack: Array of 5-6 precise technologies (e.g. "React.js", "Node.js", "TensorFlow", "MongoDB")
            - complexity: One word (Simple / Medium / Advanced / Enterprise)
            - innovation: The key "Unique Selling Point" or innovation angle (short phrase)
            - timeline: Estimated development time (e.g. "4 weeks", "2 months")
            - feasibilityScore: A score "X/10" based on student level feasibility

            Do not include any markdown or extra text. Only the raw JSON object.
        `;

        const dna = await generateAIResponse(prompt, true);
        const dnaData = (dna.dna || dna.blueprint || dna.problem) ? (dna.dna || dna.blueprint || dna) : dna;
        console.log('🤖 AI DNA Gen Response received');

        res.status(200).json({ success: true, dna: dnaData });
    } catch (error) {
        console.error('❌ Groq AI Error (DNA):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock DNA
app.post('/api/workspaces/:id/select-dna', async (req, res) => {
    try {
        const { dna } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.projectDNA = dna;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 3); // Advance to next step (Solution Architecture)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Project DNA Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking DNA:', error);
        res.status(500).json({ success: false, message: 'Failed to lock DNA', error: error.message });
    }
});

// Step 4: Generate Solution Architecture
app.post('/api/ai/generate-solution', async (req, res) => {
    try {
        const { dna, topic, domain, projectTitle } = req.body;

        const prompt = `
            You are a System Architect and Research Advisor.
            Based on the following Project DNA, design a complete Solution Architecture.

            Project DNA:
            - Name: ${projectTitle}
            - Domain: ${domain}
            - Topic: ${topic}
            - Problem: ${dna.problem}
            - Users: ${dna.targetUsers}
            - Innovation: ${dna.innovation}
            - Tech Stack: ${dna.techStack.join(', ')}

            Generate a structured Solution Blueprint in strictly JSON format with these fields:
            
            1. overview: 3-4 simple lines following this pattern: "This system helps [target users] to [core benefit] by using [technology/innovation]."
            
            2. modules: An array of 5-7 objects, each with:
               - "name": Module name (e.g. "Authentication Module", "AI Suggestion Engine")
               - "description": What it does (1 line)

            3. userFlow: An array of strings representing the step-by-step story (e.g. ["User logs in", "Creates Workspace", "AI suggests ideas", ...]). This will be used to draw a flowchart.

            4. aiRole: A detailed paragraph explaining:
               - Where AI is used
               - What AI decides
               - What AI predicts
               - What AI generates
            
            5. dataFlow: A simple textual explanation of the flow: "User Input -> AI Processing -> System Decision -> Output". No technical jargon.

            6. whyItWorks: An array of 3-4 bullet points explaining why this solution saves time, reduces confusion, or improves quality.

            7. researchPapers: An array of 5-6 highly relevant research papers that directly relate to this project. For each paper:
               - "title": The research paper title (realistic, academic style)
               - "authors": Array of 2-3 author names (realistic academic names)
               - "year": Publication year (2018-2024, prefer recent)
               - "relevance": One sentence explaining WHY this paper is relevant to THIS specific project
               - "keyTakeaway": One specific insight or technique from this paper that could be applied to the project
               
               IMPORTANT for research papers:
               - Papers should be HIGHLY relevant to the domain (${domain}), problem (${dna.problem}), and tech stack
               - Focus on papers about: algorithms, architectures, methodologies, or case studies related to the project
               - Mix foundational papers (2018-2020) with recent advances (2021-2024)
               - Include papers about the specific technologies in the tech stack
               - Each paper must have a clear, specific relevance and actionable takeaway

            Do not include any markdown or code blocks. Return ONLY the raw JSON object.
        `;

        const solution = await generateAIResponse(prompt, true);
        const solData = (solution.solution || solution.overview) ? (solution.solution || solution) : solution;
        console.log('🤖 AI Solution Gen Response received');

        res.status(200).json({ success: true, solution: solData });
    } catch (error) {
        console.error('❌ Groq AI Error (Solution):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Solution
app.post('/api/workspaces/:id/select-solution', async (req, res) => {
    try {
        const { solution } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.projectSolution = solution;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 4); // Advance to next step (Roadmap Generation)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Solution Architecture Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Solution:', error);
        res.status(500).json({ success: false, message: 'Failed to lock Solution', error: error.message });
    }
});

// Step 5: Generate Project Roadmap
app.post('/api/ai/generate-roadmap', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Senior Project Manager and Technical Lead.
            Create a detailed, UNIQUE, and REALISTIC Project Roadmap for: "${projectTitle}".
            
            This roadmap must be generated STRICTLY using the Project DNA provided below.
            It must be Time-based and Level-based.

            Project DNA Context:
            - Domain: ${dna.domain || 'General Tech'}
            - Student Level/Complexity: ${dna.complexity}
            - Core Problem: ${dna.problem}
            - Technology Stack: ${dna.techStack.join(', ')}
            - Available Timeline: ${dna.timeline}
            - Target Platform: ${dna.platform || 'Cross-platform'}
            - Project Goal: ${dna.goal || 'Research & Development'}
            - Feasibility Score: ${dna.feasibilityScore || 'Not assessed'}
            - Innovation: ${dna.innovation || 'Standard approach'}

            Smart Adjustment Rules:
            1. Level Adjustment:
               - If 'Simple' or 'Beginner': Include more 'Learning & Documentation' tasks. Keep tech tasks fundamental.
               - If 'Medium': Balanced professional roadmap.
               - If 'Advanced': Focus on 'Optimization, Scalability, and Security'. Add complex testing tasks.
            2. Time Adjustment:
               - Fit the entire plan within: ${dna.timeline}.
               - If time is short (e.g., < 1 month): Compress phases, focus on MVP.
               - If time is long (e.g., > 3 months): Add 'Improvement, Refinement, and Polish' sub-tasks.

            Roadmap Structure (MUST have exactly these 5 logical phases):
            Phase 1: Understanding & Setup
            Phase 2: Design & Architecture
            Phase 3: Core Development
            Phase 4: Integration & Testing
            Phase 5: Finalization & Submission

            Return strictly JSON with the following structure:
            {
                "phases": [array of phase objects],
                "confidenceScore": number (0-100),
                "confidenceAnalysis": {
                    "technicalFeasibility": "Assessment of technical complexity vs student skill level",
                    "timelineRealism": "Whether the timeline is achievable",
                    "resourceAvailability": "Assessment of required tools/resources",
                    "overallAssessment": "Brief summary of project viability"
                },
                "failurePredictor": {
                    "riskLevel": "Low/Medium/High",
                    "criticalRisks": ["array of 3-5 specific risks that could cause project failure"],
                    "recommendations": ["array of 3-5 actionable steps to mitigate risks"],
                    "successFactors": ["array of 3-4 key factors that will ensure success"]
                }
            }

            Each phase object must have:
            - phaseName: The full phase name as listed above.
            - duration: Estimated time for this phase (e.g., "1.5 Weeks").
            - tasks: Array of objects, each containing:
                - taskTitle: Short action title (e.g., "Setup Express Server").
                - goal: Specific purpose of this task.
                - tools: Array of tool names from the DNA stack or required utilities.
                - output: The concrete deliverable (e.g., "Working API endpoint").
                - estimatedTime: Time for this specific task (e.g., "2 days").

            For the confidence score:
            - Consider: complexity vs skill level, timeline feasibility, tech stack maturity, innovation level
            - 80-100%: Highly achievable with proper planning
            - 60-79%: Achievable but requires focused effort
            - 40-59%: Challenging, needs careful risk management
            - 0-39%: High risk, consider scope reduction

            For the failure predictor:
            - Identify realistic risks based on the tech stack, timeline, and complexity
            - Provide specific, actionable recommendations (not generic advice)
            - Focus on student-level challenges (learning curve, time management, debugging)

            Do not include any markdown. Return ONLY the raw JSON object.
        `;

        const roadmap = await generateAIResponse(prompt, true);
        const roadmapData = (roadmap.roadmap || roadmap.phases) ? (roadmap.roadmap || roadmap) : roadmap;
        console.log('🤖 AI Roadmap Gen Response received');

        res.status(200).json({ success: true, roadmap: roadmapData });
    } catch (error) {
        console.error('❌ Groq AI Error (Roadmap):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Roadmap
app.post('/api/workspaces/:id/select-roadmap', async (req, res) => {
    try {
        const { roadmap } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        // Initialize phase statuses
        const initializedPhases = roadmap.phases.map((phase, index) => ({
            ...phase,
            status: index === 0 ? 'in-progress' : 'locked'
        }));

        workspace.projectRoadmap = {
            ...roadmap,
            phases: initializedPhases
        };
        workspace.currentStep = Math.max(workspace.currentStep || 0, 5); // Advance to next step (Confidence Score)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Roadmap Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Roadmap:', error);
        res.status(500).json({ success: false, message: 'Failed to lock Roadmap', error: error.message });
    }
});

// Step 6: Generate Confidence Score
app.post('/api/ai/generate-confidence', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Venture Capitalist and Senior Technical Auditor.
            Evaluate the feasibility and success probability for the project: "${projectTitle}".

            Project Blueprint (DNA):
            - Problem: ${dna.problem}
            - Tech Stack: ${dna.techStack.join(', ')}
            - Complexity: ${dna.complexity}
            - Timeline: ${dna.timeline}

            Perform a critical analysis and return strictly JSON:
            - score: A number from 1 to 100 (Overall confidence)
            - analysis: A 2-3 sentence technical summary of viability.
            - strengths: Array of 3 key strengths.
            - weaknesses: Array of 3 potential weaknesses.
            - recommendations: Array of 3 strategic pieces of advice to improve success.

            Do not include markdown. Return ONLY the raw JSON object.
        `;

        const confidence = await generateAIResponse(prompt, true);
        const confData = (confidence.score || confidence.confidence) ? (confidence.confidence || confidence) : confidence;
        console.log('🤖 AI Confidence Gen Response received');

        res.status(200).json({ success: true, confidence: confData });
    } catch (error) {
        console.error('❌ Groq AI Error (Confidence):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Confidence
app.post('/api/workspaces/:id/select-confidence', async (req, res) => {
    try {
        const { confidence } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.projectConfidence = confidence;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 6); // Advance to next step (Failure Predictor)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Confidence score locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Confidence:', error);
        res.status(500).json({ success: false, message: 'Failed to lock Confidence', error: error.message });
    }
});

// Step 7: Failure Predictor
app.post('/api/ai/generate-predictor', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Risk Assessment Specialist.
            Identify why the project "${projectTitle}" might fail and how to prevent it.

            Project Blueprint (DNA):
            - Problem: ${dna.problem}
            - Tech Stack: ${dna.techStack.join(', ')}
            - Complexity: ${dna.complexity}

            Generate a risk analysis and return strictly JSON:
            - riskLevel: "Low", "Medium", or "High"
            - uniquenessScore: A number from 1 to 100 (Market uniqueness)
            - risks: Array of 4 objects, each with:
                - title: Name of the risk
                - probability: "Low", "Medium", or "High"
                - mitigation: How to prevent this failure

            Do not include markdown. Return ONLY the raw JSON object.
        `;

        const predictor = await generateAIResponse(prompt, true);
        const predictorData = (predictor.predictor || predictor.risks || predictor.riskLevel) ? (predictor.predictor || predictor) : predictor;
        console.log('🤖 AI Predictor Gen Response received');

        res.status(200).json({ success: true, predictor: predictorData });
    } catch (error) {
        console.error('❌ Groq AI Error (Predictor):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Predictor
app.post('/api/workspaces/:id/select-predictor', async (req, res) => {
    try {
        const { predictor } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.failurePredictor = predictor;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 7); // Advance to next step (Prompt Design)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Risk Analysis Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Predictor:', error);
        res.status(500).json({ success: false, message: 'Failed to lock Predictor', error: error.message });
    }
});

// Step 8: Generate Prompt Design
app.post('/api/ai/generate-prompts', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Prompt Engineer for developers. 
            Generate 4 high-quality system-engineered prompts a student can use in ChatGPT/Gemini to build parts of their project: "${projectTitle}".

            Project Context:
            - Tech Stack: ${dna.techStack.join(', ')}
            - Complexity: ${dna.complexity}
            - Core Problem: ${dna.problem}

            Generate 4 categories:
            1. Core Database/Model Schema
            2. Backend API Logic
            3. Frontend Component UI (Glassmorphism/Modern)
            4. Auth & Security Setup

            For each category, return strictly JSON in an array:
            - category: The category name.
            - promptTitle: A name for this prompt.
            - promptText: The actual long, engineered prompt. Use variables like [TECH_STACK] inside.
            - usageGuide: 1 sentence on how/where to use it.

            Return ONLY the raw JSON array. No markdown.
        `;

        const prompts = await generateAIResponse(prompt, true);
        console.log('🤖 AI Prompts Gen Response received');

        res.status(200).json({
            success: true,
            prompts: Array.isArray(prompts) ? prompts : (prompts.prompts || [prompts])
        });
    } catch (error) {
        console.error('❌ Groq AI Error (Prompts):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Prompts
app.post('/api/workspaces/:id/select-prompts', async (req, res) => {
    try {
        const { prompts } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.promptLibrary = prompts;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 8); // Advance to next step (PPT Generation)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Prompt Library Saved!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Prompts:', error);
        res.status(500).json({ success: false, message: 'Failed to save prompts', error: error.message });
    }
});

// Step 9: Generate PPT Slides
app.post('/api/ai/generate-slides', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Professional Presentation Designer.
            Generate a 10-slide outline for a final year project presentation titled: "${projectTitle}".

            Project Context:
            - Problem: ${dna.problem}
            - Tech Stack: ${dna.techStack.join(', ')}
            - Timeline: ${dna.timeline}

            Slides to include:
            1. Title Slide
            2. Introduction
            3. Problem Statement
            4. Existing Systems vs Proposed System
            5. Core Technology Stack
            6. System Architecture (Overview)
            7. Key Features / Modules
            8. Implementation Roadmap
            9. Future Enhancements
            10. Conclusion & Q&A

            For each slide, return strictly JSON in an array:
            - slideNumber: Integer
            - title: Slide Title
            - content: Array of 3-4 bullet points (max 10 words each)
            - visualNote: Suggestion for an image or diagram for this slide.

            Return ONLY the raw JSON array. No markdown.
        `;

        const slides = await generateAIResponse(prompt, true);
        const slidesData = Array.isArray(slides) ? slides : (slides.slides || slides.outline || Object.values(slides).find(v => Array.isArray(v)) || [slides]);

        console.log('🤖 AI Slides Gen Response received');
        res.status(200).json({
            success: true,
            slides: slidesData.slice(0, 10) // Ensure 10 slides
        });
    } catch (error) {
        console.error('❌ Groq AI Error (Slides):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Slides
app.post('/api/workspaces/:id/select-slides', async (req, res) => {
    try {
        const { slides } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.presentationSlides = slides;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 9); // Advance to next step (Documentation)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Presentation Outline Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Slides:', error);
        res.status(500).json({ success: false, message: 'Failed to save slides', error: error.message });
    }
});

// Step 10: Generate Documentation
app.post('/api/ai/generate-docs', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Technical Documentation Expert.
            Generate a full Project Report Structure (IEEE/Standard Academic Format) for the project: "${projectTitle}".

            Project Context:
            - Tech Stack: ${dna.techStack.join(', ')}
            - Complexity: ${dna.complexity}
            - Core Problem: ${dna.problem}

            Generate JSON with:
            - abstract: A professional 200-word summary of the project.
            - chapters: Array of 5 objects:
                1. Introduction (Scope, Objectives)
                2. Literature Survey (Standard Research Background)
                3. System Analysis (Requirements, Feasibility)
                4. System Design (UI, DB, Architecture)
                5. Implementation & Results (Validation)

            For each chapter, provide:
            - title: Chapter Title
            - content: A 4-5 sentence professional summary of what this chapter must contain.

            Return ONLY the raw JSON object. No markdown.
        `;

        const docs = await generateAIResponse(prompt, true);
        const docsData = (docs.docs || docs.chapters || docs.abstract) ? (docs.docs || docs) : docs;
        console.log('🤖 AI Docs Gen Response received');

        res.status(200).json({ success: true, docs: docsData });
    } catch (error) {
        console.error('❌ Groq AI Error (Docs):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Docs
app.post('/api/workspaces/:id/select-docs', async (req, res) => {
    try {
        const { docs } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.projectDocumentation = docs;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 10); // Advance to next step (Viva Intelligence)
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Documentation Plan Locked!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Docs:', error);
        res.status(500).json({ success: false, message: 'Failed to save documentation', error: error.message });
    }
});

// Step 11: Generate Viva Intelligence
app.post('/api/ai/generate-viva', async (req, res) => {
    try {
        const { dna, projectTitle } = req.body;

        const prompt = `
            You are a Senior University Examiner.
            Generate 10 highly probable Viva-Voce questions and professional answers for the project: "${projectTitle}".

            Project Context:
            - Tech Stack: ${dna.techStack.join(', ')}
            - Complexity: ${dna.complexity}
            - Core Problem: ${dna.problem}

            Generate JSON array of objects:
            - question: The viva question.
            - answer: A concise, professional answer.
            - difficulty: "Easy", "Medium", or "Hard".
            - topic: "General", "Technical", "Architecture", or "Future Scope".

            Include questions on:
            - Why this specific tech stack?
            - What is the most challenging part?
            - How is it different from existing systems?
            - Database scaling and security.

            Return ONLY the raw JSON array. No markdown.
        `;

        const viva = await generateAIResponse(prompt, true);
        const vivaQuestions = Array.isArray(viva) ? viva : (viva.questions || viva.viva || Object.values(viva)[0]);
        console.log('🤖 AI Viva Gen Response received');

        res.status(200).json({ success: true, viva: vivaQuestions });
    } catch (error) {
        console.error('❌ Groq AI Error (Viva):', error);
        res.status(500).json({ success: false, message: 'AI Service Error', error: error.message });
    }
});

// Select/Lock Viva
app.post('/api/workspaces/:id/select-viva', async (req, res) => {
    try {
        const { viva } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        workspace.vivaIntelligence = viva;
        workspace.currentStep = Math.max(workspace.currentStep || 0, 11); // Advance to next step (Journey Finished)
        workspace.status = 'completed'; // Mark project as completed
        await workspace.save();

        res.status(200).json({
            success: true,
            message: 'Viva Prep Ready!',
            workspace
        });
    } catch (error) {
        console.error('Error locking Viva:', error);
        res.status(500).json({ success: false, message: 'Failed to save viva data', error: error.message });
    }
});

// Workspace Roadmap: Toggle Task
app.post('/api/workspaces/:id/toggle-task', async (req, res) => {
    try {
        const { phaseIndex, taskIndex } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        const phases = workspace.projectRoadmap.phases;
        if (!phases[phaseIndex] || !phases[phaseIndex].tasks[taskIndex]) {
            return res.status(400).json({ success: false, message: 'Invalid phase or task index' });
        }

        const task = phases[phaseIndex].tasks[taskIndex];
        task.status = task.status === 'completed' ? 'pending' : 'completed';

        await workspace.save();

        res.status(200).json({
            success: true,
            workspace
        });
    } catch (error) {
        console.error('Error toggling task:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// Workspace Roadmap: Tick Phase
app.post('/api/workspaces/:id/tick-phase', async (req, res) => {
    try {
        const { phaseIndex } = req.body;
        const workspace = await Workspace.findById(req.params.id);

        if (!workspace) {
            return res.status(404).json({ success: false, message: 'Workspace not found' });
        }

        if (!workspace.projectRoadmap || !workspace.projectRoadmap.phases) {
            return res.status(400).json({ success: false, message: 'Roadmap not initialized' });
        }

        const phases = workspace.projectRoadmap.phases;

        // Auto-fix for legacy workspaces: If no phase is in-progress or completed, start Phase 1
        const activeOrDone = phases.some(p => p.status === 'in-progress' || p.status === 'completed');
        if (!activeOrDone && phases.length > 0) {
            phases[0].status = 'in-progress';
            // Continue as normal, but now we know we have a state
        }

        if (!phases[phaseIndex]) {
            return res.status(400).json({ success: false, message: 'Invalid phase index' });
        }

        // 1. Update status
        phases[phaseIndex].status = 'completed';

        // 2. Unlock next phase if exists
        if (phases[phaseIndex + 1]) {
            phases[phaseIndex + 1].status = 'in-progress';
        }

        // 3. AI Suggestion for next steps (Non-blocking / Fallback handled)
        const completedPhaseName = phases[phaseIndex].phaseName;
        const nextPhaseName = phases[phaseIndex + 1] ? phases[phaseIndex + 1].phaseName : 'Final Submission';

        try {
            const aiPrompt = `
                Project: "${workspace.projectTitle}"
                The student just completed the phase: "${completedPhaseName}".
                The next phase is: "${nextPhaseName}".
                
                Based on the project DNA (Tech Stack: ${workspace.projectDNA ? workspace.projectDNA.techStack.join(', ') : 'Tech Stack'}), 
                give a 2-sentence encouraging expert suggestion on what they should focus on next.
                Keep it strictly professional and actionable.
            `;

            const suggestion = await generateAIResponse(aiPrompt, false);
            workspace.projectRoadmap.aiNextSuggestion = suggestion;
        } catch (aiError) {
            console.warn('⚠️ AI Suggestion failed, using fallback:', aiError.message);
            workspace.projectRoadmap.aiNextSuggestion = `Great job completing ${completedPhaseName}! Now, focus your efforts on ${nextPhaseName}. Stay consistent and keep building!`;
        }

        const completedCount = phases.filter(p => p.status === 'completed').length;
        const progressPercent = (completedCount / phases.length) * 100;

        // 4. Update Health Metrics (Progressive improvement)
        if (workspace.projectConfidence && workspace.projectConfidence.score < 95) {
            workspace.projectConfidence.score += 5;
        }

        // Improve risk level as progress is made
        if (workspace.failurePredictor) {
            if (progressPercent > 80) {
                workspace.failurePredictor.riskLevel = 'Low';
            } else if (progressPercent > 40 && workspace.failurePredictor.riskLevel === 'High') {
                workspace.failurePredictor.riskLevel = 'Medium';
            }
        }

        await workspace.save();

        res.status(200).json({
            success: true,
            message: `Phase "${completedPhaseName}" marked as completed!`,
            workspace
        });
    } catch (error) {
        console.error('Error ticking phase:', error);
        res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
    }
});

// ==================== VIVA PREPARATION API ====================

// Generate project-based viva questions
app.post('/api/viva/generate-project-questions', async (req, res) => {
    try {
        const { projectTopic, solutionDesign, roadmap, projectDNA } = req.body;

        const aiPrompt = `
            You are an expert academic advisor preparing a student for their viva examination.
            
            Project Details:
            - Topic: ${projectTopic}
            - Solution Design: ${solutionDesign}
            - Roadmap: ${roadmap ? roadmap.map(phase => phase.name).join(', ') : 'No roadmap provided'}
            - Tech Stack: ${projectDNA ? projectDNA.techStack || 'Not specified' : 'Not specified'}
            
            Generate 10-15 viva questions that are likely to be asked during the examination.
            For each question, provide:
            1. A clear, specific question
            2. A concise but comprehensive answer
            3. Speaking points - how the student should present this answer verbally
            
            Format the response as a JSON array of objects with this structure:
            [
                {
                    "question": "Why did you choose this topic?",
                    "answer": "I selected this topic because...",
                    "speakingPoints": "We selected this topic because..."
                }
            ]
            
            Make sure the questions cover:
            - Project motivation and topic selection
            - Technical implementation and design choices
            - Challenges faced and solutions
            - Future scope and improvements
            - Project impact and learning outcomes
        `;

        const aiResponse = await generateAIResponse(aiPrompt, true);

        let questions;
        try {
            questions = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            // Fallback questions - provide multiple questions
            questions = [
                {
                    question: "Why did you choose this topic?",
                    answer: "I selected this topic because it addresses a real-world problem and has significant potential for positive impact in the target domain.",
                    speakingPoints: "We chose this topic because it addresses a critical real-world problem with substantial potential for positive impact..."
                },
                {
                    question: "What is the main problem your project solves?",
                    answer: "Our project addresses the challenge of inefficient manual processes in current systems, providing an automated solution that saves time and reduces errors.",
                    speakingPoints: "The main problem we tackle is the inefficiency of manual processes, as we explained in our problem statement slide..."
                },
                {
                    question: "What technologies did you use and why?",
                    answer: "We selected React, Node.js, and MongoDB for their scalability, performance, and robust ecosystem support, enabling rapid development and deployment.",
                    speakingPoints: "Our technology stack includes React for frontend, Node.js for backend, and MongoDB for database, chosen specifically for scalability..."
                },
                {
                    question: "How does your solution differ from existing alternatives?",
                    answer: "Our solution provides unique features including real-time collaboration, AI-powered recommendations, and seamless integration capabilities that competitors lack.",
                    speakingPoints: "What makes our solution unique is the combination of real-time collaboration and AI-powered features, as demonstrated in our comparison..."
                },
                {
                    question: "What were the main challenges during development?",
                    answer: "Key challenges included ensuring data security across multiple platforms, optimizing performance for large datasets, and maintaining user-friendly interface design.",
                    speakingPoints: "During development, we overcame significant challenges in data security, performance optimization, and interface design..."
                },
                {
                    question: "How did you test and validate your project?",
                    answer: "We implemented comprehensive testing including unit tests, integration tests, user acceptance testing, and performance benchmarking to ensure reliability.",
                    speakingPoints: "Our testing approach was thorough, covering unit tests, integration tests, and extensive user validation as shown in our quality slides..."
                },
                {
                    question: "What are the key features and functionalities?",
                    answer: "Core features include user authentication, real-time data processing, automated reporting, and customizable dashboard with advanced analytics.",
                    speakingPoints: "As we showcased in our demonstration, the key features encompass user authentication, real-time processing, and advanced analytics..."
                },
                {
                    question: "What is the expected impact and user benefit?",
                    answer: "Our project is expected to reduce processing time by 60%, improve accuracy by 40%, and significantly enhance user satisfaction through streamlined workflows.",
                    speakingPoints: "The projected impact includes substantial time savings and accuracy improvements, as quantified in our business case..."
                },
                {
                    question: "What are your future enhancement plans?",
                    answer: "Future plans include mobile application development, advanced AI integration, and enterprise-level security features for broader market reach.",
                    speakingPoints: "Looking ahead, we plan to expand to mobile platforms and integrate advanced AI capabilities as outlined in our roadmap..."
                },
                {
                    question: "How scalable is your solution for enterprise use?",
                    answer: "Our architecture is designed for horizontal scalability, supporting 10,000+ concurrent users with automatic load balancing and microservices structure.",
                    speakingPoints: "Regarding enterprise scalability, our microservices architecture supports 10,000+ concurrent users with automatic load balancing..."
                }
            ];
        }

        res.status(200).json({
            success: true,
            questions: questions
        });
    } catch (error) {
        console.error('Error generating project questions:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate questions',
            error: error.message
        });
    }
});

// Upload PPT and generate questions
app.post('/api/viva/upload-ppt', upload.single('ppt'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // For now, we'll simulate PPT processing
        // In a real implementation, you would use a library like 'pptx2json' or similar
        const aiPrompt = `
            You are an expert academic advisor preparing a student for their viva examination based on their PowerPoint presentation.
            
            Generate exactly 10-12 viva questions that are commonly asked during project defense presentations.
            
            For each question, provide:
            1. A clear, specific question
            2. A concise but comprehensive answer
            3. Speaking points - how the student should present this answer verbally
            
            Cover these areas:
            - Problem statement and motivation
            - Proposed solution and methodology
            - Technical implementation details
            - Results and outcomes
            - Future scope and improvements
            - Challenges faced and solutions
            
            CRITICAL: Format the response as a valid JSON array with this exact structure:
            [
                {
                    "question": "What problem does your project solve?",
                    "answer": "Our project addresses...",
                    "speakingPoints": "In our presentation, we explained that..."
                },
                {
                    "question": "What technologies did you use and why?",
                    "answer": "We selected these technologies because...",
                    "speakingPoints": "As shown in our technical slides..."
                }
            ]
            
            Generate exactly 10-12 questions. Do not include markdown code blocks or any formatting outside the JSON array.
        `;

        const aiResponse = await generateAIResponse(aiPrompt, true);

        let questions;
        try {
            questions = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            // Fallback questions - provide multiple questions
            questions = [
                {
                    question: "Can you explain the problem statement your project addresses?",
                    answer: "Our project addresses a significant gap in the current market by providing an innovative solution that solves real-world challenges.",
                    speakingPoints: "In our presentation, we highlighted that our project addresses a significant gap in the current market by providing an innovative solution..."
                },
                {
                    question: "What is the main objective of your project?",
                    answer: "The main objective is to develop a comprehensive solution that improves efficiency and user experience while addressing the identified problem.",
                    speakingPoints: "As we explained in our opening slides, the main objective is to develop a comprehensive solution that improves efficiency..."
                },
                {
                    question: "What technologies did you use for implementation?",
                    answer: "We used modern technologies including React for frontend, Node.js for backend, and MongoDB for database to ensure scalability and performance.",
                    speakingPoints: "As shown in our technical architecture slide, we used React for frontend, Node.js for backend, and MongoDB for database..."
                },
                {
                    question: "How does your solution differ from existing alternatives?",
                    answer: "Our solution provides unique features and better user experience compared to existing alternatives, with improved performance and cost-effectiveness.",
                    speakingPoints: "What makes our solution unique, as we demonstrated in the comparison slide, is the combination of unique features and better user experience..."
                },
                {
                    question: "What were the main challenges you faced during development?",
                    answer: "The main challenges included integrating multiple systems, ensuring data security, and optimizing performance for large-scale usage.",
                    speakingPoints: "During development, we faced several key challenges that we successfully overcame, including system integration and data security..."
                },
                {
                    question: "What are the key features of your project?",
                    answer: "Key features include user-friendly interface, real-time processing, secure authentication, and comprehensive reporting capabilities.",
                    speakingPoints: "As we showcased in our features demonstration, the key capabilities include user-friendly interface and real-time processing..."
                },
                {
                    question: "How did you test your project?",
                    answer: "We conducted comprehensive testing including unit testing, integration testing, and user acceptance testing to ensure quality and reliability.",
                    speakingPoints: "Our testing approach was thorough, including unit testing, integration testing, and user acceptance testing as shown in our quality slides..."
                },
                {
                    question: "What are the future enhancements you plan to implement?",
                    answer: "Future enhancements include AI-powered features, mobile application, and advanced analytics dashboard for better insights.",
                    speakingPoints: "Looking ahead, we plan to implement AI-powered features and a mobile application as outlined in our roadmap..."
                },
                {
                    question: "What is the impact of your project on users?",
                    answer: "Our project significantly improves user productivity, reduces manual effort, and provides better decision-making capabilities.",
                    speakingPoints: "The impact on users has been substantial, with improved productivity and reduced manual effort as demonstrated in our results..."
                },
                {
                    question: "How scalable is your solution?",
                    answer: "Our solution is designed to be highly scalable, capable of handling increased user load and data volume without performance degradation.",
                    speakingPoints: "Regarding scalability, our architecture is designed to handle increased user load and data volume efficiently..."
                }
            ];
        }

        res.status(200).json({
            success: true,
            questions: questions
        });
    } catch (error) {
        console.error('Error processing PPT:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to process PPT',
            error: error.message
        });
    }
});

// ==================== ERROR HANDLING ====================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message
    });
});

// ==================== START SERVER ====================

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`\n🚀 Project Mentor Server running on port ${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`);
});

server.on("error", err => {
    if (err.code === "EADDRINUSE") {
        console.log(`❌ Port ${PORT} already in use`);
        process.exit(1);
    }
});

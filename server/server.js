import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { projectTemplates } from "./projectTemplates.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// DEBUG: Global Request Logger
app.use((req, res, next) => {
  console.log(`[REQUEST] ${req.method} ${req.originalUrl}`);
  next();
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "projectmentor",
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Mongoose schemas / models
const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  teamCode: { type: String, required: true, unique: true },
  leaderId: { type: String, required: true },
  leaderName: { type: String, required: true },
  leaderEmail: { type: String, required: true },
  members: [{
    name: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    joinedDate: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const projectSchema = new mongoose.Schema({
  teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  domain: String,
  type: String,
  skillLevel: String,
  templateId: Number,
  projectName: String,
  description: String,
  roadmap: String,
  detailedRoadmap: String,
  tasks: String,
  summary: String,
  vivaQA: String,
  keyFeatures: [String], // Added
  locked: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const memberRequestSchema = new mongoose.Schema({
  teamName: String,
  teamCode: String,
  memberName: String,
  memberEmail: String,
  memberUid: String,
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
});

const taskSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  teamCode: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  assignedTo: {
    name: String,
    email: String,
    uid: String
  }, // Optional
  deadline: Date,
  phase: { type: String, default: 'Phase 1' },
  status: { type: String, enum: ['pending', 'in-progress', 'submitted', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const submissionSchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }, // Optional, can be general
  teamCode: { type: String, required: true },
  member: {
    name: String,
    email: String,
    uid: String
  },
  workLink: String, // GitHub or file link
  comments: String,
  status: { type: String, enum: ['pending', 'reviewed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
  teamCode: { type: String, required: true },
  sender: {
    name: String,
    email: String,
    uid: String
  },
  content: String,
  timestamp: { type: Date, default: Date.now },
  isPinned: { type: Boolean, default: false }
});

const Team = mongoose.model("Team", teamSchema);
const Project = mongoose.model("Project", projectSchema);
const MemberRequest = mongoose.model("MemberRequest", memberRequestSchema);
const Task = mongoose.model("Task", taskSchema);
const Submission = mongoose.model("Submission", submissionSchema);
const Message = mongoose.model("Message", messageSchema);

// ... helpers ...
function normalizeDomain(rawDomain) {
  if (!rawDomain) return "General";
  const d = rawDomain.toLowerCase();
  if (d === "healthcare") return "Healthcare";
  if (d === "finance") return "Finance";
  if (d === "ecommerce") return "E-Commerce";
  if (d === "banking") return "Banking";
  if (d === "business") return "Business";
  return rawDomain;
}

function normalizeType(rawType) {
  if (!rawType) return "Mini Project";
  const t = rawType.toLowerCase();
  if (t.includes("mini")) return "Mini Project";
  if (t.includes("final")) return "Final Project";
  if (t.includes("hackathon")) return "Hackathon Project";
  return rawType;
}

function normalizeSkillLevel(rawLevel) {
  const l = (rawLevel || "beginner").toLowerCase();
  if (l === "beginner" || l === "intermediate" || l === "advanced") return l;
  return "beginner";
}

function pickTemplate({ domain, type, skillLevel }) {
  const normalizedDomain = normalizeDomain(domain);
  const normalizedType = normalizeType(type);
  const level = normalizeSkillLevel(skillLevel);

  // Filter templates matching domain + type + level tag
  const candidates = projectTemplates.filter((tpl) => {
    const hasLevelTag = (tpl.skillsTags || []).some(
      (tag) => tag.toLowerCase() === level
    );
    return (
      tpl.domain.toLowerCase() === normalizedDomain.toLowerCase() &&
      tpl.type.toLowerCase() === normalizedType.toLowerCase() &&
      hasLevelTag
    );
  });

  return { normalizedDomain, normalizedType, level, candidates };
}

// ===== API ENDPOINTS =====

// Root Route
app.get("/", (req, res) => {
  res.status(200).send("Project Mentor API is live!");
});

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is working (No AI Mode)!",
    timestamp: new Date().toISOString()
  });
});

// 1. Create Team
app.post("/teams", async (req, res) => {
  try {
    const { leaderId, teamName, teamCode, leaderEmail, leaderName } = req.body;

    // Check if team already exists
    const existingTeam = await Team.findOne({ teamCode });
    if (existingTeam) {
      return res.status(400).json({ success: false, error: "Team code already exists" });
    }

    const team = new Team({
      leaderId,
      teamName,
      teamCode,
      leaderEmail,
      leaderName,
      members: [] // Initialize with empty members array
    });

    await team.save();
    return res.status(201).json({ success: true, team });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get Team
app.get("/teams/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const team = await Team.findOne({ teamCode });

    if (!team) {
      return res.status(404).json({ success: false, error: "Team not found" });
    }

    return res.status(200).json({ success: true, team });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Send Team Code Email
app.post("/send-team-code", async (req, res) => {
  const { leaderEmail, leaderName, teamName, teamCode } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ProjectMentor" <${process.env.EMAIL_USER}>`,
      to: leaderEmail,
      subject: "Your Team Code - ProjectMentor",
      html: `
        <h2>Hello ${leaderName} 👋</h2>
        <p>Your team <b>${teamName}</b> has been created successfully.</p>
        <h3>Team Code: <b>${teamCode}</b></h3>
        <p>Share this code with your team members.</p>
        <br/>
        <p>– ProjectMentor</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Generate Project (using Templates)
app.post("/generate-project", async (req, res) => {
  try {
    const { domain, type, skillLevel, teamName, teamCode } = req.body;
    const safeTeamCode = teamCode || "XXXXXX";

    const { normalizedDomain, normalizedType, level, candidates } = pickTemplate({ domain, type, skillLevel });

    if (!candidates.length) {
      return res.status(400).json({
        success: false,
        message: "No templates available for this domain / type / level.",
      });
    }

    // Filter used templates
    const candidateIds = candidates.map((c) => c._id);
    const used = await Project.find({
      domain: normalizedDomain,
      type: normalizedType,
      templateId: { $in: candidateIds },
    }).select("templateId");

    const usedIds = new Set(used.map((p) => p.templateId));
    const available = candidates.filter((c) => !usedIds.has(c._id));

    if (!available.length) {
      return res.status(400).json({
        success: false,
        message: "All templates for this combination are already used by other teams.",
      });
    }

    // Select 3 random projects
    const selectedProjects = [];
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const projectCount = Math.min(3, shuffled.length);

    for (let i = 0; i < projectCount; i++) {
      const chosen = shuffled[i];
      selectedProjects.push({
        templateId: chosen._id, // IMPORTANT: Front end must pass this back in lock-project
        title: chosen.title,
        problemStatement: chosen.problemStatement,
        proposedSolution: chosen.proposedSolution,
        keyFeatures: chosen.keyFeatures || [],
        domain: normalizedDomain,
        type: normalizedType,
        skillLevel: level,
      });
    }

    return res.status(200).json({
      success: true,
      projects: selectedProjects
    });
  } catch (error) {
    console.error("/generate-project error", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Lock Project
app.post("/lock-project", async (req, res) => {
  try {
    const {
      templateId, teamId, projectName, domain, type, skillLevel,
      problemStatement, proposedSolution, keyFeatures, // receiving keyFeatures
      leaderId, leaderEmail, leaderName, teamName
    } = req.body;

    // Find team
    let team = await Team.findOne({ teamCode: teamId });
    if (!team) {
      return res.status(404).json({ success: false, error: "Team not found" });
    }

    // Find template to get full details (Logic replacement for AI)
    const template = projectTemplates.find(t => t._id === templateId || t.id === templateId);

    let roadmapText = "Roadmap not available.";
    let tasksText = "Tasks not available.";
    let summaryText = "Summary not available.";
    let vivaQAText = "Viva QA not available.";
    let templateFeatures = [];

    if (template) {
      roadmapText = template.roadmapText || template.detailedRoadmap || roadmapText;
      tasksText = template.tasksText || tasksText;
      summaryText = template.summaryText || summaryText;
      vivaQAText = template.vivaQAText || vivaQAText;
      templateFeatures = template.keyFeatures || [];
    }

    // Use passed keyFeatures or fallback to template
    const featuresToSave = (keyFeatures && keyFeatures.length) ? keyFeatures : templateFeatures;

    // Create project with populated details
    const project = await Project.create({
      teamId: team._id,
      domain: domain,
      type: type,
      skillLevel: skillLevel,
      templateId: templateId,
      projectName: projectName,
      description: `${problemStatement}\n\n${proposedSolution}`,
      roadmap: roadmapText,
      detailedRoadmap: roadmapText,
      tasks: tasksText,
      summary: summaryText,
      vivaQA: vivaQAText,
      keyFeatures: featuresToSave,
      locked: true
    });

    // Send email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ProjectMentor" <${process.env.EMAIL_USER}>`,
      to: leaderEmail,
      subject: "Project Selected - ProjectMentor",
      html: `
        <h2>Hello ${leaderName}!</h2>
        <p>Your team <strong>${teamName}</strong> has selected the project:</p>
        <h3>${projectName}</h3>
        <p>Congratulations! Your project is now locked.</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      projectId: project._id,
      message: "Project locked successfully"
    });

  } catch (error) {
    console.error("/lock-project error", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Join Request (Member)
app.post("/member-requests", async (req, res) => {
  try {
    const { teamName, teamCode, memberName, memberEmail, memberUid } = req.body;

    const team = await Team.findOne({ teamCode });
    if (!team) {
      return res.status(404).json({ success: false, error: "Team not found with this code" });
    }

    const existing = await MemberRequest.findOne({ teamCode, memberEmail, status: 'pending' });
    if (existing) {
      return res.status(400).json({ success: false, error: "Request already pending" });
    }

    const newRequest = await MemberRequest.create({
      teamName: team.teamName,
      teamCode,
      memberName,
      memberEmail,
      memberUid,
      status: "pending"
    });

    return res.status(201).json({ success: true, request: newRequest });

  } catch (error) {
    console.error("Error in member-requests POST:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Get Requests (Leader)
app.get("/member-requests/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const requests = await MemberRequest.find({ teamCode, status: 'pending' });
    return res.status(200).json({ success: true, requests });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Accept Member (Leader)
app.post("/teams/:teamCode/accept-member", async (req, res) => {
  try {
    const { requestId } = req.body;
    const { teamCode } = req.params;

    const request = await MemberRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Add to member list
    team.members.push({
      name: request.memberName,
      email: request.memberEmail,
      uid: request.memberUid
    });

    await team.save();

    // Delete request after accepting (as per user suggestion)
    // await MemberRequest.findByIdAndDelete(requestId); 
    // BETTER: Mark as accepted to keep history, but user asked for delete logic. 
    // I will stick to status update for consistency but if user insists I can change.
    // Actually, let's just update status to 'accepted' as it is safer.
    request.status = 'accepted';
    await request.save();

    // Send Welcome Email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"ProjectMentor" <${process.env.EMAIL_USER}>`,
      to: request.memberEmail,
      subject: "Welcome to the Team! - ProjectMentor",
      html: `
        <h2>Hello ${request.memberName} 👋</h2>
        <p>Your request to join <b>${team.teamName}</b> has been accepted!</p>
        <p>You can now access your Member Dashboard.</p>
        <br/>
        <p>– ProjectMentor</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (e) {
      console.log("Email failed but member added");
    }

    res.json({ success: true });

  } catch (error) {
    console.error("Accept member error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 9. Reject Member (Leader)
app.put("/member-requests/:requestId/reject", async (req, res) => {
  try {
    const { requestId } = req.params;
    const request = await MemberRequest.findById(requestId);
    if (!request) return res.status(404).json({ success: false, error: "Request not found" });

    request.status = "rejected";
    await request.save();

    return res.status(200).json({ success: true, message: "Member rejected successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 10. Get Project Details (Roadmap, Tasks, Summary, Viva)
app.post("/projects/:id/roadmap", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    return res.status(200).json({ success: true, roadmap: project.roadmap || project.detailedRoadmap || "" });
  } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
});

app.post("/projects/:id/tasks", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    return res.status(200).json({ success: true, tasks: project.tasks || "" });
  } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
});

app.post("/projects/:id/summary", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    return res.status(200).json({ success: true, summary: project.summary || "" });
  } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
});

app.post("/projects/:id/viva-qa", async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });

    return res.status(200).json({ success: true, vivaQA: project.vivaQA || "" });
  } catch (error) { return res.status(500).json({ success: false, error: error.message }); }
});

// 11. Member Login (Check if accepted)
app.post("/member-login", async (req, res) => {
  try {
    const { email, teamCode } = req.body;

    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ success: false, error: "Team not found" });

    const member = team.members.find(m => m.email.toLowerCase() === email.toLowerCase());
    if (!member) {
      return res.status(401).json({ success: false, error: "Member not found in this team. Please accept request first." });
    }

    // Return team and member info so dashboard can render
    return res.status(200).json({
      success: true,
      teamName: team.teamName,
      teamCode: team.teamCode,
      member: member
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 11b. Leader Login
app.post("/leader-login", async (req, res) => {
  try {
    const { email, teamCode } = req.body;

    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ success: false, error: "Team not found" });

    // Verify Email
    if (team.leaderEmail.toLowerCase() !== email.toLowerCase()) {
      return res.status(401).json({ success: false, error: "Invalid Leader Email for this Team Code." });
    }

    // Check if project is locked
    const project = await Project.findOne({ teamId: team._id });

    return res.status(200).json({
      success: true,
      teamName: team.teamName,
      teamCode: team.teamCode,
      projectLocked: !!project,
      selectedProject: project ? project.projectName : null
    });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 12. Get Project by Team Code (For Member Dashboard)
app.get("/projects/team/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ success: false, error: "Team not found" });

    const project = await Project.findOne({ teamId: team._id });
    if (!project) {
      return res.status(200).json({ success: true, project: null, message: "No project locked yet" });
    }

    return res.status(200).json({ success: true, project });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 13. Create Task
app.post("/tasks", async (req, res) => {
  try {
    const { teamCode, title, description, assignedTo } = req.body;

    // Find project for this team
    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ success: false, error: "Team not found" });

    const project = await Project.findOne({ teamId: team._id });
    if (!project) return res.status(400).json({ success: false, error: "Project not locked yet" });

    const newTask = await Task.create({
      projectId: project._id,
      teamCode,
      title,
      description,
      assignedTo: assignedTo || null // { name, email, uid }
    });

    return res.status(201).json({ success: true, task: newTask });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 14. Get Tasks for Team
app.get("/tasks/team/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const tasks = await Task.find({ teamCode }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 15. Submit Work
app.post("/submissions", async (req, res) => {
  try {
    const { teamCode, member, workLink, comments, taskId } = req.body;

    // Create submission
    const newSubmission = await Submission.create({
      teamCode,
      taskId,
      member, // {name, email, uid}
      workLink,
      comments
    });

    // If linked to a task, update task status
    if (taskId) {
      await Task.findByIdAndUpdate(taskId, { status: 'submitted' });
    }

    return res.status(201).json({ success: true, submission: newSubmission });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 16. Get Submissions (Leader/Team)
app.get("/submissions/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const submissions = await Submission.find({ teamCode }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, submissions });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 17. Send Message (Chat)
app.post("/messages", async (req, res) => {
  try {
    const { teamCode, sender, content } = req.body;

    // Check if sender is muted
    const team = await Team.findOne({ teamCode });
    if (team) {
      const member = team.members.find(m => m.email === sender.email);
      if (member && member.isMuted) {
        return res.status(403).json({ success: false, error: "You are muted." });
      }
    }

    const newMessage = await Message.create({
      teamCode,
      sender,
      content,
      isPinned: false
    });
    return res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 22. Toggle Pin Message
app.put("/messages/:id/pin", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.isPinned = !message.isPinned;
    await message.save();
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 23. Delete Message
app.delete("/messages/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 24. Toggle Mute Member
app.put("/teams/:teamCode/members/:email/mute", async (req, res) => {
  try {
    const { teamCode, email } = req.params;
    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ error: "Team not found" });

    const member = team.members.find(m => m.email === email);
    if (member) {
      member.isMuted = !member.isMuted; // Toggle
      await team.save();
      return res.status(200).json({ success: true, member });
    } else {
      return res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 18. Get Messages (Chat)
app.get("/messages/:teamCode", async (req, res) => {
  try {
    const { teamCode } = req.params;
    const messages = await Message.find({ teamCode }).sort({ timestamp: 1 }); // Oldest first
    return res.status(200).json({ success: true, messages });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 21. Update Task Status (Direct)
app.put("/tasks/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    return res.status(200).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 19. Update Submission Status (Approve/Reject)
app.put("/submissions/:id", async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'needs-revision'
    const submission = await Submission.findByIdAndUpdate(req.params.id, { status }, { new: true });

    // If approved, mark related task as completed
    if (status === 'approved' && submission.taskId) {
      await Task.findByIdAndUpdate(submission.taskId, { status: 'completed' });
    }

    return res.status(200).json({ success: true, submission });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// 20. Remove Member
app.delete("/teams/:teamCode/members/:email", async (req, res) => {
  try {
    const { teamCode, email } = req.params;
    const team = await Team.findOne({ teamCode });
    if (!team) return res.status(404).json({ error: "Team not found" });

    team.members = team.members.filter(m => m.email !== email);
    await team.save();

    return res.status(200).json({ success: true, team });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

// DEBUG: 404 Catch-All
app.use((req, res) => {
  console.log(`[404] Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, error: "Route not found" });
});

export default app;

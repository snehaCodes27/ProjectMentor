import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Search, Edit3, Dna, Layers, Map, Zap, AlertCircle, Terminal,
    Presentation, FileText, GraduationCap, Lock, CheckCircle2,
    ArrowLeft, BadgeCheck, Sparkles, Rocket, ChevronRight, X, LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import TopicSelection from '../components/TopicSelection';
import ProjectNameSelection from '../components/ProjectNameSelection';
import ProjectDNAGeneration from '../components/ProjectDNAGeneration';
import SolutionArchitecture from '../components/SolutionArchitecture';
import RoadmapGeneration from '../components/RoadmapGeneration';
import ConfidenceScore from '../components/ConfidenceScore';
import FailurePredictor from '../components/FailurePredictor';

import PromptDesign from '../components/PromptDesign';
import PPTGeneration from '../components/PPTGeneration';
import Documentation from '../components/Documentation';
import VivaIntelligence from '../components/VivaIntelligence';
import WorkspaceDashboard from '../components/WorkspaceDashboard';
import './ProjectJourney.css';
import { API_URL } from '../config';

export default function ProjectJourney() {
    const { workspaceId } = useParams();
    const navigate = useNavigate();
    const [workspace, setWorkspace] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [activeStepId, setActiveStepId] = useState(null);
    const [loading, setLoading] = useState(true);

    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userName = userProfile.name || 'Student';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const steps = [
        { title: 'Topic Selection', icon: Search, desc: 'Find the perfect research area' },
        { title: 'Project Name Selection', icon: Edit3, desc: 'Give your idea a professional identity' },
        { title: 'Project DNA Generation', icon: Dna, desc: 'Define tech stack and core architecture' },
        { title: 'Solution Design', icon: Layers, desc: 'Detailed module and system workflow' },
        { title: 'Roadmap Generation', icon: Map, desc: 'Timeline with confidence score & failure analysis' },
        { title: 'Confidence Score', icon: BadgeCheck, desc: 'AI technical audit & success probability' },
        { title: 'Failure Predictor', icon: AlertCircle, desc: 'Risk analysis & mitigation strategies' },
        { title: 'Prompt Design', icon: Terminal, desc: 'Engineered prompts for development' },
        { title: 'PPT Generation', icon: Presentation, desc: 'Professional presentation slides' },
        { title: 'Documentation', icon: FileText, desc: 'Complete project report generation' },
        { title: 'Viva Intelligence', icon: GraduationCap, desc: 'Prepare for defense and Q&A' }
    ];

    useEffect(() => {
        const fetchWorkspace = async () => {
            try {
                const response = await fetch(`${API_URL}/api/workspaces/${workspaceId}`);
                const data = await response.json();
                if (data.success) {
                    setWorkspace(data.workspace);
                    // In a real app, we'd fetch the current progress step from the DB
                    setCurrentStep(data.workspace.currentStep || 0);
                }
            } catch (error) {
                console.error('Error fetching workspace:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspace();
    }, [workspaceId]);

    const refreshWorkspace = async () => {
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspaceId}`);
            const data = await response.json();
            if (data.success) {
                setWorkspace(data.workspace);
                setCurrentStep(data.workspace.currentStep || 0);
            }
        } catch (error) {
            console.error('Error refreshing workspace:', error);
        }
    };

    const handleStepClick = (index) => {
        if (index <= currentStep) {
            setActiveStepId(index);
        }
    };

    if (loading) {
        return (
            <div className="journey-loading">
                <div className="spinner"></div>
                <p>Preparing your AI Project Journey...</p>
            </div>
        );
    }

    if (currentStep >= 9) {
        return (
            <WorkspaceDashboard
                workspace={workspace}
                onUpdate={(updatedWs) => setWorkspace(updatedWs)}
            />
        );
    }

    return (
        <div className="project-journey">
            <div className="journey-header">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={20} />
                </button>
                <div className="journey-user-info">
                    <div className="user-greeting">
                        <BadgeCheck size={18} className="verified-icon" />
                        <span>Hello, <span className="highlight">{userName}</span></span>
                    </div>
                    <h1 className="journey-title">Let's start making real-world project</h1>
                </div>
                <div className="header-right-actions">
                    <div className="workspace-badge">
                        <Rocket size={16} />
                        <span>{workspace?.teamName}</span>
                    </div>
                    <button className="logout-top-btn" onClick={handleLogout} title="Logout Session">
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="journey-container">
                <div className="steps-timeline">
                    {steps.map((step, index) => {
                        const isLocked = index > currentStep;
                        const isCompleted = index < currentStep;
                        const isActive = index === currentStep;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`step-card ${isLocked ? 'locked' : ''} ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                onClick={() => handleStepClick(index)}
                            >
                                <div className="step-number-box">
                                    {isCompleted ? (
                                        <CheckCircle2 size={24} className="success-icon" />
                                    ) : isLocked ? (
                                        <Lock size={20} className="lock-icon" />
                                    ) : (
                                        <span className="step-number">{index + 1}</span>
                                    )}
                                </div>

                                <div className="step-icon-box">
                                    <step.icon size={24} />
                                </div>

                                <div className="step-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-desc">{step.desc}</p>
                                </div>

                                {!isLocked && (
                                    <div className="step-action-hint">
                                        <ChevronRight size={20} />
                                    </div>
                                )}

                                {isActive && (
                                    <div className="active-glow"></div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                <div className="journey-sidebar">
                    <div className="journey-stats glass-container">
                        <h3>Project Status</h3>
                        <div className="stats-item">
                            <span>Step Progress</span>
                            <span>{currentStep + 1} / {steps.length}</span>
                        </div>
                        <div className="progress-bar-main">
                            <div
                                className="progress-fill-main"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            ></div>
                        </div>
                        <button
                            className="btn btn-primary-gradient continue-journey-btn"
                            onClick={() => setActiveStepId(currentStep)}
                        >
                            <Sparkles size={18} />
                            Continue Journey
                        </button>
                    </div>

                    <div className="ai-tip-box glass-container">
                        <div className="tip-header">
                            <Zap size={18} />
                            <span>AI Assistant Tip</span>
                        </div>
                        <p>Complete the "Topic Selection" to unlock the "Project Name Selection". AI will guide you based on your branch and year.</p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {activeStepId !== null && (
                    <div className="step-execution-overlay">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="step-execution-modal glass-container"
                        >
                            <button className="close-step-btn" onClick={() => setActiveStepId(null)}>
                                <X size={24} />
                            </button>

                            {!workspace ? (
                                <div className="step-error">
                                    <AlertCircle size={48} />
                                    <h2>Workspace Data Missing</h2>
                                    <p>We couldn't load your project details. Please try refreshing or re-opening from the dashboard.</p>
                                    <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
                                </div>
                            ) : (
                                <>
                                    {activeStepId === 0 && (
                                        <TopicSelection
                                            workspace={workspace}
                                            onTopicSelected={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 1 && (
                                        <ProjectNameSelection
                                            workspace={workspace}
                                            onNameSelected={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 2 && (
                                        <ProjectDNAGeneration
                                            workspace={workspace}
                                            onDNALocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 3 && (
                                        <SolutionArchitecture
                                            workspace={workspace}
                                            onSolutionLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                setActiveStepId(updatedWs.currentStep); // Always advance to next step
                                            }}
                                        />
                                    )}

                                    {activeStepId === 4 && (
                                        <RoadmapGeneration
                                            workspace={workspace}
                                            onRoadmapLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 5 && (
                                        <ConfidenceScore
                                            workspace={workspace}
                                            onScoreLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 6 && (
                                        <FailurePredictor
                                            workspace={workspace}
                                            onPredictorLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 7 && (
                                        <PromptDesign
                                            workspace={workspace}
                                            onPromptsLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 8 && (
                                        <PPTGeneration
                                            workspace={workspace}
                                            onSlidesLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 9 && (
                                        <Documentation
                                            workspace={workspace}
                                            onDocsLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                if (activeStepId === currentStep) setActiveStepId(updatedWs.currentStep);
                                            }}
                                        />
                                    )}

                                    {activeStepId === 10 && (
                                        <VivaIntelligence
                                            workspace={workspace}
                                            onVivaLocked={(updatedWs) => {
                                                setWorkspace(updatedWs);
                                                setCurrentStep(updatedWs.currentStep);
                                                setActiveStepId(null); // Journey Complete!
                                            }}
                                        />
                                    )}

                                    {activeStepId > 10 && (
                                        <div className="step-placeholder">
                                            <h2>Journey Complete!</h2>
                                            <p>You have successfully engineered your entire project journey with AI.</p>
                                            <button className="btn btn-primary-gradient" onClick={() => navigate('/dashboard')}>
                                                Go to Workspace
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

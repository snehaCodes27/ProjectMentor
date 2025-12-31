import { useState, useEffect } from 'react';
import {
    Flag, Calendar, CheckSquare, Wrench, Package,
    Lock, ArrowDown, Briefcase, Clock, AlertCircle, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RoadmapTracker from './RoadmapTracker';
import './RoadmapGeneration.css';
import { API_URL } from '../config';

export default function RoadmapGeneration({ workspace, onRoadmapLocked }) {
    const [loading, setLoading] = useState(true);
    const [roadmap, setRoadmap] = useState(null);
    const [error, setError] = useState(null);
    const [expandedPhases, setExpandedPhases] = useState([0]); // Only first phase expanded by default
    const [showAnalysis, setShowAnalysis] = useState(true);

    // If roadmap is already locked into the workspace, show the interactive tracker instead
    if (workspace.projectRoadmap && workspace.projectRoadmap.phases && workspace.projectRoadmap.phases.length > 0 && workspace.currentStep > 4) {
        return (
            <div className="roadmap-preview-locked">
                <div className="step-header">
                    <span className="step-badge">Phase 5</span>
                    <h2 className="step-main-title">Active Project Roadmap</h2>
                    <p className="step-subtitle">Your project is live! Track your progress and get AI guidance below.</p>
                </div>
                <RoadmapTracker
                    workspace={workspace}
                    onUpdate={(updatedWs) => {
                        onRoadmapLocked(updatedWs);
                    }}
                />
            </div>
        );
    }

    const generateRoadmap = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-roadmap`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setRoadmap(data.roadmap);
                setLoading(false);
            } else {
                setError('AI failed to generate roadmap. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error generating roadmap:', error);
            setError('Connection error. Please check your internet.');
            setLoading(false);
        }
    };

    useEffect(() => {
        if (workspace.projectRoadmap && workspace.projectRoadmap.phases && workspace.projectRoadmap.phases.length > 0) {
            setRoadmap(workspace.projectRoadmap);
            setLoading(false);
            return;
        }

        if (roadmap || workspace.currentStep > 4) {
            if (roadmap) setLoading(false);
            return;
        }

        generateRoadmap();
    }, [workspace.projectRoadmap, workspace.currentStep]);

    const handleLock = async () => {
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-roadmap`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ roadmap: roadmap })
            });
            const data = await response.json();
            if (data.success) {
                onRoadmapLocked(data.workspace);
            }
        } catch (error) {
            console.error('Error locking roadmap:', error);
        }
    };

    const togglePhase = (index) => {
        setExpandedPhases(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    if (loading) {
        return (
            <div className="roadmap-loader-container">
                <div className="calendar-spinner">
                    <Calendar size={60} className="floating-calendar" />
                </div>
                <h2 className="loading-txt">Building Your Master Plan...</h2>
                <p className="loading-subtxt">Calculating distinct phases, tasks, and deadlines.</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="roadmap-error-container">
                <AlertCircle size={48} className="error-icon" />
                <h3>Generation Failed</h3>
                <p>{error}</p>
                <button onClick={generateRoadmap} className="btn-retry">Try Again</button>
            </div>
        );
    }

    if (!roadmap || !roadmap.phases) {
        return <div className="error-text">No roadmap data available.</div>;
    }

    return (
        <div className="roadmap-container">
            <div className="step-header">
                <span className="step-badge">Phase 5</span>
                <h2 className="step-main-title">Personalized Project Roadmap</h2>
                <p className="step-subtitle">A step-by-step guide from Idea to Completion.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="roadmap-timeline"
            >
                {/* Compact Analysis Section */}
                {roadmap.confidenceScore !== undefined && (
                    <div className="roadmap-analysis-compact">
                        <div className="analysis-header" onClick={() => setShowAnalysis(!showAnalysis)}>
                            <div className="analysis-summary">
                                <div className="score-badge-inline" style={{
                                    background: roadmap.confidenceScore >= 80 ? '#10b981' :
                                        roadmap.confidenceScore >= 60 ? '#f59e0b' :
                                            roadmap.confidenceScore >= 40 ? '#f97316' : '#ef4444'
                                }}>
                                    {roadmap.confidenceScore}%
                                </div>
                                <span className="analysis-title">Confidence Score</span>
                                <span className="divider">•</span>
                                <span className={`risk-badge-inline risk-${roadmap.failurePredictor?.riskLevel?.toLowerCase()}`}>
                                    {roadmap.failurePredictor?.riskLevel} Risk
                                </span>
                            </div>
                            {showAnalysis ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </div>

                        <AnimatePresence>
                            {showAnalysis && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="analysis-details-compact"
                                >
                                    <div className="compact-grid">
                                        {roadmap.confidenceAnalysis && (
                                            <div className="compact-section">
                                                <h4>📊 Analysis</h4>
                                                <p className="compact-text">{roadmap.confidenceAnalysis.overallAssessment}</p>
                                            </div>
                                        )}
                                        {roadmap.failurePredictor && (
                                            <>
                                                <div className="compact-section">
                                                    <h4>⚠️ Top Risks</h4>
                                                    <ul className="compact-list">
                                                        {roadmap.failurePredictor.criticalRisks?.slice(0, 2).map((risk, idx) => (
                                                            <li key={idx}>{risk}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="compact-section">
                                                    <h4>💡 Key Actions</h4>
                                                    <ul className="compact-list">
                                                        {roadmap.failurePredictor.recommendations?.slice(0, 2).map((rec, idx) => (
                                                            <li key={idx}>{rec}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Collapsible Roadmap Phases */}
                <div className="phases-compact">
                    {roadmap.phases.map((phase, index) => (
                        <div key={index} className="roadmap-phase-card-compact glass-panel">
                            <div className="phase-header-compact" onClick={() => togglePhase(index)}>
                                <div className="phase-title-group">
                                    <div className="phase-index">{index + 1}</div>
                                    <div>
                                        <h3>{phase.phaseName}</h3>
                                        <span className="phase-meta">
                                            <Clock size={12} /> {phase.duration} • {phase.tasks.length} tasks
                                        </span>
                                    </div>
                                </div>
                                {expandedPhases.includes(index) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>

                            <AnimatePresence>
                                {expandedPhases.includes(index) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="phase-tasks-list-compact"
                                    >
                                        {phase.tasks.map((task, tIndex) => (
                                            <div key={tIndex} className="task-item-compact">
                                                <div className="task-header-compact">
                                                    <h4>{task.taskTitle}</h4>
                                                    <span className="task-time">{task.estimatedTime}</span>
                                                </div>
                                                <p className="task-goal">{task.goal}</p>
                                                <div className="task-footer">
                                                    <span className="task-tools">🔧 {task.tools.slice(0, 2).join(', ')}</span>
                                                    <span className="task-output">📦 {task.output}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="roadmap-actions">
                    <button className="btn-lock-roadmap" onClick={handleLock}>
                        <Lock size={16} /> Lock Roadmap & Start Building
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

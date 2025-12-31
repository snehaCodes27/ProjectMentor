import { useState, useEffect } from 'react';
import {
    CheckCircle2, Circle, Clock, AlertTriangle,
    Zap, TrendingUp, ShieldAlert, Sparkles,
    Lock, ArrowRight, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './RoadmapTracker.css';
import { API_URL } from '../config';

export default function RoadmapTracker({ workspace, onUpdate }) {
    const [ticking, setTicking] = useState(null);
    const [localWorkspace, setLocalWorkspace] = useState(workspace);

    useEffect(() => {
        setLocalWorkspace(workspace);
    }, [workspace]);

    const phases = localWorkspace.projectRoadmap?.phases || [];
    const completedCount = phases.filter(p => p.status === 'completed').length;
    const progressPercent = phases.length > 0 ? (completedCount / phases.length) * 100 : 0;

    const handleTaskToggle = async (pIdx, tIdx) => {
        try {
            const wsId = localWorkspace._id || localWorkspace.id;
            const response = await fetch(`${API_URL}/api/workspaces/${wsId}/toggle-task`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phaseIndex: pIdx, taskIndex: tIdx })
            });
            const data = await response.json();
            if (data.success) {
                setLocalWorkspace(data.workspace);
                if (onUpdate) onUpdate(data.workspace);
            }
        } catch (err) {
            console.error('Task toggle failed:', err);
        }
    };

    const isAllTasksDone = (phase) => {
        if (!phase.tasks || phase.tasks.length === 0) return true;
        return phase.tasks.every(t => t.status === 'completed');
    };

    const handleTick = async (index) => {
        const targetIndex = index !== undefined ? index : 0;
        if (!phases[targetIndex] || phases[targetIndex].status === 'completed' || ticking !== null) return;

        setTicking(targetIndex);
        console.log('Ticking phase...', targetIndex);
        try {
            const wsId = localWorkspace._id || localWorkspace.id;
            const response = await fetch(`${API_URL}/api/workspaces/${wsId}/tick-phase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phaseIndex: targetIndex })
            });
            const data = await response.json();

            if (data.success) {
                setLocalWorkspace(data.workspace);
                if (onUpdate) onUpdate(data.workspace);
            } else {
                console.error('Failed to update phase:', data.message);
            }
        } catch (err) {
            console.error('Failed to tick phase:', err);
        } finally {
            setTicking(null);
        }
    };

    // Auto-init for first time users - only if essentially empty
    useEffect(() => {
        const hasActive = phases.some(p => p.status === 'in-progress' || p.status === 'completed');
        if (phases.length > 0 && !hasActive && localWorkspace._id && ticking === null) {
            handleTick(0);
        }
    }, [phases, localWorkspace._id]);

    const getStatusIcon = (status, index) => {
        if (status === 'completed') return (
            <div className="custom-checkbox checked">
                <CheckCircle2 size={24} />
            </div>
        );
        if (ticking === index) return <div className="status-spinner"></div>;
        if (status === 'locked') return (
            <div className="custom-checkbox locked">
                <Lock size={18} />
            </div>
        );
        if (status === 'delayed') return (
            <div className="custom-checkbox delayed">
                <AlertTriangle size={18} />
            </div>
        );
        return (
            <div className="custom-checkbox in-progress">
                <Circle size={24} />
            </div>
        );
    };

    return (
        <div className="roadmap-tracker-container">
            {/* Health Header */}
            <div className="health-dashboard">
                <div className="health-card progress-main glass-container">
                    <div className="health-label">
                        <TrendingUp size={16} /> <span>Overall Progress</span>
                    </div>
                    <div className="progress-value">{Math.round(progressPercent)}%</div>
                    <div className="progress-bar-container">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <div className="health-card health-meter glass-container">
                    <div className="health-label">
                        <Activity size={16} /> <span>Confidence Score</span>
                    </div>
                    <div className="score-display">
                        <span className="score-num">{localWorkspace.projectConfidence?.score || 0}</span>
                        <span className="score-unit">%</span>
                    </div>
                    <div className="score-status">Technically Sound</div>
                </div>

                <div className="health-card risk-meter glass-container">
                    <div className="health-label">
                        <ShieldAlert size={16} /> <span>Failure Risk</span>
                    </div>
                    <div className="risk-display">
                        <span className="risk-level">{localWorkspace.failurePredictor?.riskLevel || 'Low'}</span>
                    </div>
                    <div className="risk-indicator-bar">
                        <div className={`risk-indicator ${localWorkspace.failurePredictor?.riskLevel?.toLowerCase()}`} />
                    </div>
                </div>
            </div>

            {/* AI Suggestion Box */}
            <AnimatePresence>
                {localWorkspace.projectRoadmap?.aiNextSuggestion && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="ai-suggestion-banner glass-container"
                    >
                        <div className="suggestion-icon">
                            <Sparkles size={20} />
                        </div>
                        <div className="suggestion-content">
                            <strong>AI Project Guide:</strong>
                            <p>{localWorkspace.projectRoadmap.aiNextSuggestion}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Failure Warning Banner */}
            {localWorkspace.failurePredictor?.riskLevel === 'High' && (
                <div className="risk-warning-banner">
                    <AlertTriangle size={20} />
                    <span><strong>High Risk Warning:</strong> AI predicts potential bottlenecks in integration. Check mitigations.</span>
                </div>
            )}

            {/* Roadmap Phases Grid */}
            <div className="phases-grid">
                {phases.map((phase, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`phase-tracker-card glass-container ${phase.status}`}
                    >
                        <div className="phase-card-header">
                            <div className="phase-check-trigger">
                                {getStatusIcon(phase.status, index)}
                            </div>
                            <div className="phase-info">
                                <span className="phase-tag">Phase {index + 1}</span>
                                <h3>{phase.phaseName}</h3>
                            </div>
                            {phase.status === 'completed' && <div className="locked-badge">LOCKED ✓</div>}
                        </div>

                        <div className="phase-card-body">
                            <div className="phase-meta">
                                <Clock size={14} /> <span>{phase.duration}</span>
                            </div>

                            {/* Only show tasks for in-progress or completed phases */}
                            {(phase.status === 'in-progress' || phase.status === 'completed') && (
                                <div className="phase-tasks-expanded">
                                    {phase.tasks?.map((task, tIdx) => (
                                        <div key={tIdx} className={`mini-task-item ${task.status === 'completed' ? 'done' : ''}`}>
                                            {phase.status === 'in-progress' ? (
                                                <div
                                                    className={`task-checkbox ${task.status === 'completed' ? 'checked' : ''}`}
                                                    onClick={() => handleTaskToggle(index, tIdx)}
                                                >
                                                    {task.status === 'completed' ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                                                </div>
                                            ) : (
                                                <div className="task-dot"></div>
                                            )}
                                            <div className="task-main">
                                                <span className="mini-task-title">{task.taskTitle}</span>
                                                <div className="mini-task-labels">
                                                    {task.tools?.slice(0, 2).map((tool, kitIdx) => (
                                                        <span key={kitIdx} className="mini-tool-pill">{tool}</span>
                                                    ))}
                                                    {task.output && <span className="mini-output-pill">Output: {task.output}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {phase.status === 'in-progress' && (
                            <button
                                className={`btn-complete-phase ${!isAllTasksDone(phase) ? 'disabled' : ''}`}
                                onClick={() => isAllTasksDone(phase) && handleTick(index)}
                                disabled={ticking !== null || !isAllTasksDone(phase)}
                            >
                                {ticking === index ? (
                                    <div className="status-spinner small"></div>
                                ) : (
                                    <>
                                        <CheckCircle2 size={18} />
                                        <span>{isAllTasksDone(phase) ? 'Mark as Completed' : 'Tasks Pending...'}</span>
                                    </>
                                )}
                            </button>
                        )}

                        {phase.status === 'in-progress' && (
                            <div className="current-indicator">
                                <Zap size={14} /> ACTIVE PHASE
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="roadmap-judge-line">
                <Zap size={14} />
                <span>Each roadmap phase is trackable, lockable, and directly connected to AI guidance and project health.</span>
            </div>
        </div>
    );
}

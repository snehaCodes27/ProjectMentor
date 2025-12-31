
import { useState, useEffect } from 'react';
import {
    Dna, Terminal, Database, Shield, Lock,
    CheckCircle2, AlertTriangle, Layers, Clock, Zap, Edit3
} from 'lucide-react';
import { motion } from 'framer-motion';
import './ProjectDNAGeneration.css';
import { API_URL } from '../config';

const timelineOptions = ["2 Weeks", "4 Weeks", "6 Weeks", "8 Weeks", "12 Weeks", "4 Months", "6 Months"];

export default function ProjectDNAGeneration({ workspace, onDNALocked }) {
    const [status, setStatus] = useState('loading'); // loading, complete
    const [loadingText, setLoadingText] = useState('Initializing DNA Sequence...');
    const [dnaData, setDnaData] = useState(null);
    const [editingTimeline, setEditingTimeline] = useState(false);

    // Auto-run sequence
    useEffect(() => {
        // If DNA already exists, load it and skip generation
        if (workspace.projectDNA && workspace.projectDNA.problem) {
            setDnaData(workspace.projectDNA);
            setStatus('complete');
            return;
        }

        const generateDNA = async () => {
            // Sequence of loading messages
            const messages = [
                'Analyzing Topic & Domain...',
                'Parsing Project Name impact...',
                'Evaluating Complexity Level...',
                'Calculating Innovation Factor...',
                'Building Core Architecture...'
            ];

            // Trigger simulated steps
            for (let i = 0; i < messages.length; i++) {
                setLoadingText(messages[i]);
                await new Promise(r => setTimeout(r, 1200));
            }

            // Actual API Call
            try {
                const response = await fetch(`${API_URL}/api/ai/generate-dna`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        topic: workspace.selectedTopic.title,
                        domain: workspace.selectedTopic.domain,
                        projectTitle: workspace.projectTitle,
                        projectTagline: workspace.projectTagline,
                        problem: workspace.selectedTopic.problem,
                        solution: workspace.selectedTopic.solution
                    })
                });
                const data = await response.json();

                if (data.success) {
                    setDnaData(data.dna);
                    setStatus('complete');
                } else {
                    setLoadingText('Failed to generate. Retrying...');
                    setTimeout(() => generateDNA(), 2000);
                }
            } catch (err) {
                console.error('DNA Gen Error:', err);
                setLoadingText('Connection Error. Retrying...');
                setTimeout(() => generateDNA(), 3000);
            }
        };

        generateDNA();
    }, [workspace]);

    const handleLock = async () => {
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-dna`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dna: dnaData })
            });
            const data = await response.json();
            if (data.success) {
                onDNALocked(data.workspace);
            }
        } catch (error) {
            console.error('Error locking DNA:', error);
        }
    };

    if (status === 'loading') {
        return (
            <div className="dna-loader-container">
                <div className="dna-spinner">
                    <Dna size={80} className="spinning-dna" />
                </div>
                <h2 className="loading-title">Creating Your Project DNA...</h2>
                <p className="loading-subtitle fade-text">{loadingText}</p>

                <div className="console-log-box">
                    <p>{'>'} System: Project Mentor AI</p>
                    <p>{'>'} Target: {workspace.projectTitle}</p>
                    <p>{'>'} Status: <span className="blink">PROCESSING</span></p>
                </div>
            </div>
        );
    }

    return (
        <div className="dna-result-container">
            <div className="step-header">
                <span className="step-badge">Phase 3</span>
                <h2 className="step-main-title">Project DNA Generated</h2>
                <p className="step-subtitle">This blueprint is now the single source of truth for your project.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="dna-blueprint-card"
            >
                <div className="dna-card-header">
                    <Dna size={32} className="dna-icon-static" />
                    <h3>{workspace.projectTitle} <span className="code-text">_DNA_v1.0</span></h3>
                </div>

                <div className="dna-grid">
                    <div className="dna-field full-width">
                        <label><AlertTriangle size={16} /> Core Problem</label>
                        <p>{dnaData.problem}</p>
                    </div>

                    <div className="dna-field full-width">
                        <label><Zap size={16} /> Innovation Angle</label>
                        <p className="highlight-text">{dnaData.innovation}</p>
                    </div>

                    <div className="dna-field">
                        <label><Shield size={16} /> Target Users</label>
                        <p>{dnaData.targetUsers}</p>
                    </div>

                    <div className="dna-field">
                        <label><Clock size={16} /> Timeline Fit</label>
                        {editingTimeline ? (
                            <div className="edit-timeline-wrapper">
                                <select
                                    className="timeline-select"
                                    value={timelineOptions.includes(dnaData.timeline) ? dnaData.timeline : 'custom'}
                                    onChange={(e) => {
                                        if (e.target.value !== 'custom') {
                                            setDnaData({ ...dnaData, timeline: e.target.value });
                                            setEditingTimeline(false);
                                        } else {
                                            setDnaData({ ...dnaData, timeline: '' }); // Clear for custom input
                                        }
                                    }}
                                    autoFocus
                                >
                                    {timelineOptions.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                    <option value="custom">Custom...</option>
                                </select>
                                {(!timelineOptions.includes(dnaData.timeline) && dnaData.timeline !== 'custom') && (
                                    <div className="custom-timeline-input-group">
                                        <input
                                            type="text"
                                            placeholder="e.g. 10 Weeks"
                                            value={dnaData.timeline}
                                            onChange={(e) => setDnaData({ ...dnaData, timeline: e.target.value })}
                                            className="timeline-input"
                                        />
                                        <button className="save-mini-btn" onClick={() => setEditingTimeline(false)}>
                                            <CheckCircle2 size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="editable-value-row">
                                <p>{dnaData.timeline}</p>
                                <button className="icon-btn-edit-small" onClick={() => setEditingTimeline(true)}>
                                    <Edit3 size={14} /> Change
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="dna-field">
                        <label><Layers size={16} /> Complexity</label>
                        <div className={`complexity-badge ${dnaData.complexity?.toLowerCase()}`}>
                            {dnaData.complexity}
                        </div>
                    </div>

                    <div className="dna-field">
                        <label><CheckCircle2 size={16} /> Feasibility Score</label>
                        <div className="feasibility-badge">
                            {dnaData.feasibilityScore}
                        </div>
                    </div>

                    <div className="dna-field full-width tech-stack-section">
                        <label><Database size={16} /> Recommended Tech Stack</label>
                        <div className="tech-tags">
                            {dnaData.techStack?.map((tech, i) => (
                                <span key={i} className="tech-tag-dna">{tech}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="dna-lock-section">
                    <p className="lock-warning">
                        <Lock size={14} /> Locking this DNA will define the roadmap for all future steps.
                    </p>
                    <button className="btn-lock-dna" onClick={handleLock}>
                        Lock DNA & Continue
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

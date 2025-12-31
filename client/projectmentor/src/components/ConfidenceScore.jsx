import { useState, useEffect } from 'react';
import {
    Zap, Rocket, Shield, Target, AlertTriangle,
    CheckCircle, MessageSquare, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfidenceScore.css';
import { API_URL } from '../config';

export default function ConfidenceScore({ workspace, onConfidenceLocked }) {
    const [confidence, setConfidence] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState('');

    const generateScore = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-confidence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setConfidence(data.confidence);
            } else {
                setError(data.message || 'Failed to generate confidence score');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLock = async () => {
        setLocking(true);
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-confidence`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ confidence })
            });
            const data = await response.json();
            if (data.success) {
                onConfidenceLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to lock confidence score.');
        } finally {
            setLocking(false);
        }
    };

    if (loading) {
        return (
            <div className="analysis-loading-state">
                <div className="radar-scanner">
                    <div className="scanner-line"></div>
                </div>
                <h3>AI Technical Audit in Progress...</h3>
                <p>Analyzing viability, tech-stack synergy, and market fit.</p>
            </div>
        );
    }

    if (!confidence) {
        return (
            <div className="generate-confidence-start">
                <div className="hero-visual">
                    <Zap size={60} className="zap-icon" />
                </div>
                <h2>Project Confidence Score</h2>
                <p>Let AI perform a deep technical audit of your project blueprint to calculate its success probability.</p>
                <button className="btn btn-primary-gradient big-btn" onClick={generateScore}>
                    Perform Technical Audit
                </button>
            </div>
        );
    }

    const getScoreColor = (score) => {
        if (score >= 80) return '#10b981';
        if (score >= 60) return '#f59e0b';
        return '#ef4444';
    };

    return (
        <div className="confidence-results">
            <div className="score-header-section">
                <div className="score-circle-container">
                    <svg viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" className="circle-bg" />
                        <motion.circle
                            cx="50" cy="50" r="45"
                            className="circle-fill"
                            initial={{ strokeDasharray: "0 283" }}
                            animate={{ strokeDasharray: `${(confidence.score / 100) * 283} 283` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ stroke: getScoreColor(confidence.score) }}
                        />
                    </svg>
                    <div className="score-text">
                        <span className="number">{confidence.score}%</span>
                        <span className="label">Confidence</span>
                    </div>
                </div>
                <div className="audit-summary">
                    <h3>Audit Analysis</h3>
                    <p>{confidence.analysis}</p>
                </div>
            </div>

            <div className="audit-details-grid">
                <div className="audit-card strength">
                    <div className="card-head">
                        <CheckCircle size={20} />
                        <h4>Key Strengths</h4>
                    </div>
                    <ul>
                        {confidence.strengths.map((s, i) => <li key={i}>{s}</li>)}
                    </ul>
                </div>

                <div className="audit-card weakness">
                    <div className="card-head">
                        <AlertTriangle size={20} />
                        <h4>Potential Risks</h4>
                    </div>
                    <ul>
                        {confidence.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                    </ul>
                </div>

                <div className="audit-card recommendations full-width">
                    <div className="card-head">
                        <Target size={20} />
                        <h4>AI Recommendations for Success</h4>
                    </div>
                    <div className="rec-list">
                        {confidence.recommendations.map((r, i) => (
                            <div key={i} className="rec-item">
                                <TrendingUp size={16} />
                                <span>{r}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="results-actions">
                <button className="btn-secondary" onClick={generateScore}>Re-perform Audit</button>
                <button className="btn-primary-gradient" onClick={handleLock} disabled={locking}>
                    {locking ? 'Locking...' : 'Lock Analysis & Continue'}
                </button>
            </div>
        </div>
    );
}

import { useState } from 'react';
import {
    AlertOctagon, ShieldAlert, Sparkles,
    ArrowRight, Info, TrendingDown, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import './FailurePredictor.css';
import { API_URL } from '../config';

export default function FailurePredictor({ workspace, onPredictorLocked }) {
    const [predictor, setPredictor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState('');

    const generateAnalysis = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-predictor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setPredictor(data.predictor);
            } else {
                setError(data.message || 'Failed to generate risk analysis');
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
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-predictor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ predictor })
            });
            const data = await response.json();
            if (data.success) {
                onPredictorLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to lock analysis.');
        } finally {
            setLocking(false);
        }
    };

    if (loading) {
        return (
            <div className="risk-loading-state">
                <div className="warning-pulse">
                    <AlertOctagon size={60} />
                </div>
                <h3>Calculating Failure Vectors...</h3>
                <p>Simulating 1,000+ development scenarios to predict bottlenecks.</p>
            </div>
        );
    }

    if (!predictor) {
        return (
            <div className="generate-predictor-start">
                <div className="threat-visual">
                    <ShieldAlert size={64} className="shield-icon" />
                </div>
                <h2>Failure Predictor</h2>
                <p>Identify critical risks and hidden traps before they derail your project. AI analyzes technical and research gaps.</p>
                <button className="btn btn-warning big-btn" onClick={generateAnalysis}>
                    Predict Potential Failures
                </button>
            </div>
        );
    }

    const getRiskColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f59e0b';
            case 'low': return '#10b981';
            default: return 'var(--primary)';
        }
    };

    return (
        <div className="predictor-results">
            <div className="top-risk-dashboard">
                <div className="risk-level-card" style={{ borderColor: getRiskColor(predictor.riskLevel) }}>
                    <label>Overall Risk Level</label>
                    <h2 style={{ color: getRiskColor(predictor.riskLevel) }}>{predictor.riskLevel}</h2>
                </div>
                <div className="uniqueness-card">
                    <label>Market Uniqueness</label>
                    <div className="unique-score-row">
                        <Sparkles size={20} className="text-primary" />
                        <h2>{predictor.uniquenessScore}%</h2>
                    </div>
                </div>
            </div>

            <h3 className="risks-title">Identified Risk Vectors</h3>
            <div className="risks-grid">
                {predictor.risks.map((risk, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="risk-outcome-card"
                    >
                        <div className="risk-meta">
                            <span className={`risk-probability ${risk.probability.toLowerCase()}`}>
                                {risk.probability} Probability
                            </span>
                        </div>
                        <h4>{risk.title}</h4>
                        <div className="mitigation-box">
                            <div className="mitigation-label">
                                <ShieldAlert size={14} />
                                <span>Mitigation Strategy</span>
                            </div>
                            <p>{risk.mitigation}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="predictor-footer">
                <div className="insight-note">
                    <Info size={18} />
                    <p>Focus on High Probability risks first. These are the most likely reasons for project rejection or failure.</p>
                </div>
                <div className="actions">
                    <button className="btn-secondary" onClick={generateAnalysis}>Recalculate Risks</button>
                    <button className="btn-primary-gradient" onClick={handleLock} disabled={locking}>
                        {locking ? 'Lock & Continue' : 'Acknowledge Risks'}
                    </button>
                </div>
            </div>
        </div>
    );
}

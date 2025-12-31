import { useState } from 'react';
import {
    Sparkles, RefreshCw, CheckCircle2, Edit3,
    Briefcase, Zap, Rocket, Shield, Target, Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProjectNameSelection.css';
import { API_URL } from '../config';

const nameStyles = [
    { id: 'technical', name: 'Technical', icon: Briefcase, desc: 'Professional & Descriptive' },
    { id: 'brand', name: 'Brand', icon: Rocket, desc: 'Catchy & Short' },
    { id: 'startup', name: 'Startup', icon: Zap, desc: 'Modern & Abstract' },
    { id: 'problem', name: 'Problem-Focused', icon: Target, desc: 'Action-Oriented' },
    { id: 'future', name: 'Future-Tech', icon: Shield, desc: 'Sci-Fi & Advanced' }
];

export default function ProjectNameSelection({ workspace, onNameSelected }) {
    const [names, setNames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Intro/Generate, 2: Results
    const [selectedStyle, setSelectedStyle] = useState('all'); // 'all' or specific style
    const [customIntent, setCustomIntent] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);

    const generateNames = async (style = 'all') => {
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-names`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic: workspace.selectedTopic.title,
                    domain: workspace.selectedTopic.domain,
                    problem: workspace.selectedTopic.problem,
                    solution: workspace.selectedTopic.solution,
                    style,
                    customIntent: style === 'custom' ? customIntent : undefined
                })
            });
            const data = await response.json();
            if (data.success) {
                setNames(data.names);
                setStep(2);
                setShowCustomInput(false);
            }
        } catch (error) {
            console.error('Error generating names:', error);
        } finally {
            setLoading(false);
        }
    };

    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const startEditing = (index, currentName) => {
        setEditingId(index);
        setEditValue(currentName);
    };

    const saveEdit = (index) => {
        const newNames = [...names];
        newNames[index].name = editValue;
        setNames(newNames);
        setEditingId(null);
    };

    const addManualName = () => {
        const newCard = {
            name: "My Project",
            meaning: "Custom project name",
            tagline: "Your custom tagline here",
            style: "Custom",
            vibe: "Bold"
        };
        const newNames = [newCard, ...names];
        setNames(newNames);
        startEditing(0, "My Project");
    };

    const [selectionLoading, setSelectionLoading] = useState(false);
    const [selectionError, setSelectionError] = useState('');

    const handleSelect = async (nameData) => {
        if (selectionLoading) return;
        setSelectionLoading(true);
        setSelectionError('');

        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-name`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameData })
            });
            const data = await response.json();
            if (data.success) {
                onNameSelected(data.workspace);
            } else {
                setSelectionError(data.message || 'Failed to select name');
            }
        } catch (error) {
            console.error('Error selecting name:', error);
            setSelectionError('Connection error. Please try again.');
        } finally {
            setSelectionLoading(false);
        }
    };

    return (
        <div className="name-selection-container">
            {selectionError && <div className="error-banner">{selectionError}</div>}
            <div className="step-header">
                <span className="step-badge">Phase 2</span>
                <h2 className="step-main-title">Choose Your Project Name</h2>
                <p className="step-subtitle">AI suggests powerful and professional names for your project.</p>
            </div>

            {/* Context Card */}
            <div className="project-context-card glass-container">
                <div className="context-item">
                    <label>Selected Topic</label>
                    <p>{workspace?.selectedTopic?.title || 'Unknown Topic'}</p>
                </div>
                <div className="context-item">
                    <label>Core Solution</label>
                    <p>{workspace?.selectedTopic?.solution || 'No solution defined'}</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="start-generation-section"
                    >
                        <div className="ai-brain-visual">
                            <Sparkles size={60} className="floating-icon" />
                        </div>
                        <button
                            className="btn btn-primary-gradient big-gen-btn"
                            onClick={() => generateNames('all')}
                            disabled={loading}
                        >
                            {loading ? 'AI is Thinking...' : 'Generate Smart Names'}
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="names-results-section"
                    >
                        {loading ? (
                            <div className="loading-grid">
                                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton-card"></div>)}
                            </div>
                        ) : (
                            <>
                                <div className="names-grid">
                                    {names.map((n, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="name-card glass-container"
                                        >
                                            <div className="card-badge-top">{n.style || n.styleType}</div>

                                            {editingId === i ? (
                                                <div className="edit-name-box">
                                                    <input
                                                        type="text"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        autoFocus
                                                    />
                                                    <button onClick={() => saveEdit(i)} className="save-edit-btn"><CheckCircle2 size={16} /></button>
                                                </div>
                                            ) : (
                                                <div className="name-title-row">
                                                    <h3 className="project-name-title">{n.name}</h3>
                                                    <button className="icon-btn-edit" onClick={() => startEditing(i, n.name)}>
                                                        <Edit3 size={16} />
                                                    </button>
                                                </div>
                                            )}

                                            <div className="name-details">
                                                <p className="name-meaning"><span className="label-text">Meaning:</span> {n.meaning}</p>
                                                <p className="name-tagline"><span className="label-text">Tagline:</span> "{n.tagline}"</p>
                                            </div>


                                            <div className="vibe-indicator">
                                                <span className={`vibe-dot ${n.vibe?.toLowerCase() || 'professional'}`}></span>
                                                {n.style || n.styleType} Style
                                            </div>

                                            <div className="card-actions">
                                                <button
                                                    className="btn-select-name"
                                                    onClick={() => handleSelect(n)}
                                                    disabled={selectionLoading}
                                                >
                                                    {selectionLoading ? 'Selecting...' : 'Select'}
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        className="create-custom-card"
                                        onClick={addManualName}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        <div className="create-icon-circle">
                                            <Edit3 size={24} />
                                        </div>
                                        <div className="create-custom-text">Create Your Own</div>
                                    </motion.div>
                                </div>

                                <div className="results-footer-actions">
                                    <button className="btn-regenerate-set" onClick={() => generateNames('all')}>
                                        <RefreshCw size={18} /> Suggest New Set
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

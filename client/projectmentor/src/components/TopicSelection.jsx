import { useState } from 'react';
import {
    Cpu, Brain, Shield, Cloud, Terminal,
    Smartphone, Layout, Activity, Heart,
    Leaf, Globe, Sparkles, Send, CheckCircle2,
    BarChart, Edit3, Layers, Zap, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './TopicSelection.css';
import { API_URL } from '../config';

const domains = [
    { id: 'ai', name: 'Artificial Intelligence', icon: Brain },
    { id: 'healthcare', name: 'HealthcareTech', icon: Heart },
    { id: 'fintech', name: 'FinTech', icon: Activity },
    { id: 'smartcity', name: 'Smart City', icon: Globe },
    { id: 'education', name: 'EdTech', icon: Layout },
    { id: 'cyber', name: 'Cybersecurity', icon: Shield },
    { id: 'environment', name: 'Environment / GreenTech', icon: Leaf },
    { id: 'iot', name: 'IoT / Industry 4.0', icon: Cpu }
];

const platforms = [
    { id: 'web', name: 'Web Application', icon: Globe },
    { id: 'app', name: 'Mobile App', icon: Smartphone },
    { id: 'ai', name: 'AI / Model', icon: Brain },
    { id: 'hardware', name: 'Hardware / Robotics', icon: Cpu }
];

const popularSkills = [
    "Python", "JavaScript", "React", "Node.js", "Java",
    "Machine Learning", "Deep Learning", "Data Analytics",
    "UI/UX Design", "Flutter", "Swift", "C++", "Blockchain",
    "Cybersecurity", "IoT", "Cloud (AWS/Azure)", "SQL", "MongoDB"
];

export default function TopicSelection({ workspace, onTopicSelected }) {
    const [step, setStep] = useState(1); // 1: Inputs, 2: AI Generating, 3: Results
    const [formData, setFormData] = useState({
        branch: workspace?.createdBy?.branch || '',
        domain: '',
        skills: '',
        platform: workspace?.platform || '',
        difficulty: 'Medium'
    });
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [otherSkill, setOtherSkill] = useState('');

    const toggleSkill = (skill) => {
        const currentSkills = formData.skills ? formData.skills.split(', ').filter(s => s) : [];
        let newSkills;
        if (currentSkills.includes(skill)) {
            newSkills = currentSkills.filter(s => s !== skill);
        } else {
            newSkills = [...currentSkills, skill];
        }
        setFormData({ ...formData, skills: newSkills.join(', ') });
    };

    const addOtherSkill = () => {
        if (otherSkill.trim()) {
            const currentSkills = formData.skills ? formData.skills.split(', ').filter(s => s) : [];
            if (!currentSkills.includes(otherSkill.trim())) {
                const newSkills = [...currentSkills, otherSkill.trim()];
                setFormData({ ...formData, skills: newSkills.join(', ') });
            }
            setOtherSkill('');
        }
    };

    const handleGenerate = async () => {
        if (!formData.domain || !formData.skills) {
            setError('Please select a domain and share your skills!');
            return;
        }

        setStep(2);
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/ai/generate-topics`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                setTopics(data.topics);
                setStep(3);
            } else {
                setError('Failed to generate topics. Please try again.');
                setStep(1);
            }
        } catch (err) {
            setError('Server connection error. Please try again.');
            setStep(1);
        } finally {
            setLoading(false);
        }
    };

    const [selectionLoading, setSelectionLoading] = useState(false);

    const handleSelect = async (topic) => {
        console.log('Selecting topic for workspace:', workspace);
        if (!workspace || !workspace._id) {
            setError('Error: Invalid Workspace ID. Please refresh.');
            return;
        }

        setSelectionLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-topic`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic })
            });
            const data = await response.json();
            if (data.success) {
                onTopicSelected(data.workspace);
            } else {
                setError('Failed to select topic. Please try again.');
            }
        } catch (err) {
            console.error('Error selecting topic:', err);
            setError('Connection error while selecting topic.');
            alert('CRITICAL ERROR: Could not select topic. Check console or server status.');
        } finally {
            setSelectionLoading(false);
        }
    };

    return (
        <div className="topic-selection-container">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="inputs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="topic-inputs-card"
                    >
                        <div className="step-header">
                            <span className="step-badge">Phase 1</span>
                            <h2 className="step-main-title">Design your perfect project with AI</h2>
                            <p className="step-subtitle">Tell us your interests, and our AI will build a custom roadmap for you.</p>
                        </div>

                        <div className="inputs-grid">
                            <div className="input-field-group">
                                <label>Academic Branch</label>
                                <input
                                    type="text"
                                    value={formData.branch}
                                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                                    placeholder="e.g. Computer Engineering"
                                />
                            </div>

                            <div className="input-field-group">
                                <label>Target Platform</label>
                                <div className="option-chips">
                                    {platforms.map(p => (
                                        <div
                                            key={p.id}
                                            className={`chip ${formData.platform === p.name ? 'active' : ''}`}
                                            onClick={() => setFormData({ ...formData, platform: p.name })}
                                        >
                                            <p.icon size={16} />
                                            <span>{p.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="input-field-group full-width">
                                <label>Select Your Domain</label>
                                <div className="domains-grid">
                                    {domains.map(d => (
                                        <div
                                            key={d.id}
                                            className={`domain-card ${formData.domain === d.name ? 'selected' : ''}`}
                                            onClick={() => setFormData({ ...formData, domain: d.name })}
                                        >
                                            <d.icon size={24} />
                                            <span>{d.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="input-field-group full-width">
                                <label>Skills & Interests (Select multiple)</label>
                                <div className="skills-chips-container">
                                    {popularSkills.map(skill => {
                                        const isSelected = formData.skills.split(', ').includes(skill);
                                        return (
                                            <div
                                                key={skill}
                                                className={`skill-pill ${isSelected ? 'active' : ''}`}
                                                onClick={() => toggleSkill(skill)}
                                            >
                                                {skill}
                                                {isSelected && <CheckCircle2 size={14} />}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="other-skill-input">
                                    <input
                                        type="text"
                                        placeholder="Other skill (e.g. PHP, Rust...)"
                                        value={otherSkill}
                                        onChange={(e) => setOtherSkill(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && addOtherSkill()}
                                    />
                                    <button type="button" onClick={addOtherSkill} className="btn-add-mini">
                                        <Plus size={16} /> Add
                                    </button>
                                </div>
                            </div>

                            <div className="input-field-group">
                                <label>Difficulty Level</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                                >
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Advanced</option>
                                </select>
                            </div>
                        </div>

                        {error && <p className="error-msg">{error}</p>}

                        <button className="btn btn-primary-gradient generate-btn" onClick={handleGenerate}>
                            <Sparkles size={20} />
                            Generate Project Topics
                        </button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="ai-generating-screen"
                    >
                        <div className="ai-loader-box">
                            <div className="ai-pulse-circle"></div>
                            <Sparkles size={48} className="ai-icon-pulse" />
                        </div>
                        <h2 className="ai-status-title">AI is designing your future...</h2>
                        <div className="ai-progress-steps">
                            <p>Analyzing student profile...</p>
                            <p>Scanning current tech trends...</p>
                            <p>Validating uniqueness...</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="topic-results-screen"
                    >
                        <div className="results-header">
                            <h2>Choose your project path</h2>
                            <button className="btn-text" onClick={() => setStep(1)}>
                                <Edit3 size={16} /> Edit Inputs
                            </button>
                        </div>
                        {error && <div className="error-banner">{error}</div>}

                        <div className="topics-cards-grid">
                            {topics.map((t, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="topic-result-card glass-container clickable-card"
                                    onClick={() => !selectionLoading && handleSelect(t)}
                                >
                                    <div className="card-top">
                                        <div className="card-badge">{t.domain}</div>
                                        <div className="innovation-rating">
                                            {[...Array(5)].map((_, idx) => (
                                                <Sparkles key={idx} size={14} className={idx < t.innovationLevel ? 'active' : 'inactive'} />
                                            ))}
                                        </div>
                                    </div>

                                    <h3 className="topic-card-title">{t.title}</h3>

                                    <div className="card-section">
                                        <label><Zap size={14} /> The Problem</label>
                                        <p>{t.problem}</p>
                                    </div>

                                    <div className="card-section">
                                        <label><Brain size={14} /> Proposed Solution</label>
                                        <p>{t.solution}</p>
                                    </div>

                                    <div className="tech-stack-preview">
                                        {t.techStack?.map((tech, idx) => (
                                            <span key={idx} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>

                                    <div className="card-footer">
                                        <div className="impact-info">
                                            <BarChart size={14} />
                                            <span>{t.outcome}</span>
                                        </div>
                                        <div
                                            className="select-topic-btn"
                                        >
                                            {selectionLoading ? 'Locking...' : 'Select Topic'}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="results-footer">
                            <button className="btn btn-secondary" onClick={handleGenerate}>
                                <Sparkles size={18} />
                                Try Another Set
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

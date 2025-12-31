import { useState } from 'react';
import {
    Terminal, Copy, Check, MessageSquare,
    Zap, Code, Globe, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PromptDesign.css';
import { API_URL } from '../config';

export default function PromptDesign({ workspace, onPromptsLocked }) {
    const [prompts, setPrompts] = useState(workspace.promptLibrary || []);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [error, setError] = useState('');

    const generatePrompts = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-prompts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setPrompts(data.prompts);
            } else {
                setError(data.message || 'Failed to generate prompts');
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
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-prompts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompts })
            });
            const data = await response.json();
            if (data.success) {
                onPromptsLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to save library.');
        } finally {
            setLocking(false);
        }
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (loading) {
        return (
            <div className="prompt-loading-state">
                <div className="terminal-loader">
                    <Terminal size={50} />
                    <div className="typing-indicator">
                        <span></span><span></span><span></span>
                    </div>
                </div>
                <h3>Engineering System Prompts...</h3>
                <p>Creating highly specific project-based prompts for AI assistants.</p>
            </div>
        );
    }

    if (prompts.length === 0) {
        return (
            <div className="generate-prompts-start">
                <div className="prompt-hero">
                    <Terminal size={64} className="terminal-icon" />
                </div>
                <h2>AI Copilot: Prompt Design</h2>
                <p>Generate precise, high-performance prompts that you can paste into ChatGPT or Gemini to build your code faster.</p>
                <button className="btn btn-primary-gradient big-btn" onClick={generatePrompts}>
                    Generate Prompt Library
                </button>
            </div>
        );
    }

    return (
        <div className="prompt-design-results">
            <div className="results-header">
                <h2>Your AI Prompt Library</h2>
                <p>Copy these prompts and use them in ChatGPT to build your project.</p>
            </div>

            <div className="prompts-grid">
                {prompts.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="prompt-card glass-container"
                    >
                        <div className="prompt-badge">{p.category}</div>
                        <h3>{p.promptTitle}</h3>
                        <p className="usage-guide">
                            <Zap size={14} /> {p.usageGuide}
                        </p>

                        <div className="prompt-text-box">
                            <pre>{p.promptText}</pre>
                            <button
                                className={`copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                                onClick={() => copyToClipboard(p.promptText, i)}
                            >
                                {copiedIndex === i ? <Check size={16} /> : <Copy size={16} />}
                                {copiedIndex === i ? 'Copied!' : 'Copy Prompt'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="prompt-footer">
                <button className="btn-secondary" onClick={generatePrompts}>Regenerate Library</button>
                <button className="btn-primary-gradient" onClick={handleLock} disabled={locking}>
                    {locking ? 'Saving...' : 'Lock Library & Next'}
                </button>
            </div>
        </div>
    );
}

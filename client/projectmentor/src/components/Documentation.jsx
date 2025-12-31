import { useState } from 'react';
import {
    FileText, Download, ScrollText,
    BookOpen, CheckCircle2, FileCheck, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import './Documentation.css';
import { API_URL } from '../config';

export default function Documentation({ workspace, onDocsLocked }) {
    const [docs, setDocs] = useState(workspace.projectDocumentation || null);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState('');

    const generateDocs = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-docs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setDocs(data.docs);
            } else {
                setError(data.message || 'Failed to generate documentation');
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
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-docs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ docs })
            });
            const data = await response.json();
            if (data.success) {
                onDocsLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to save documentation.');
        } finally {
            setLocking(false);
        }
    };

    if (loading) {
        return (
            <div className="docs-loading-state">
                <div className="paper-fly-loader">
                    <FileText size={50} />
                </div>
                <h3>Compiling Project Thesis...</h3>
                <p>Writing abstract, analyzing system requirements, and drafting chapters.</p>
            </div>
        );
    }

    if (!docs) {
        return (
            <div className="generate-docs-start">
                <div className="docs-hero">
                    <ScrollText size={64} className="docs-icon" />
                </div>
                <h2>Project Documentation Generator</h2>
                <p>Generate a complete IEEE-standard report structure, including a professional abstract and 5 detailed chapters.</p>
                <button className="btn btn-primary-gradient big-btn" onClick={generateDocs}>
                    Generate Report Structure
                </button>
            </div>
        );
    }

    return (
        <div className="documentation-results">
            <div className="abstract-section glass-container">
                <div className="section-head">
                    <BookOpen size={20} />
                    <h3>Abstract</h3>
                </div>
                <p>{docs.abstract}</p>
            </div>

            <h3 className="chapters-title">Report Chapters Outline</h3>
            <div className="chapters-grid">
                {(docs.chapters || []).map((chapter, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="chapter-card glass-container"
                    >
                        <div className="chapter-meta">
                            <span className="chapter-label">Chapter {i + 1}</span>
                        </div>
                        <h4>{chapter.title}</h4>
                        <p>{chapter.content}</p>
                        <div className="include-status">
                            <CheckCircle2 size={14} /> <span>Structured for PDF</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="docs-footer">
                <div className="footer-note">
                    <Info size={16} />
                    <span>Use this structure as the foundation of your final Black-Book report.</span>
                </div>
                <div className="actions">
                    <button className="btn-secondary" onClick={generateDocs}>Regenerate Docs</button>
                    <button className="btn-primary-gradient" onClick={handleLock} disabled={locking}>
                        {locking ? 'Locking...' : 'Lock Documentation & Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}

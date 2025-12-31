import { useState } from 'react';
import {
    Presentation, Image as ImageIcon, Layout,
    ChevronLeft, ChevronRight, Download, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './PPTGeneration.css';
import { API_URL } from '../config';

export default function PPTGeneration({ workspace, onSlidesLocked }) {
    const [slides, setSlides] = useState(workspace.presentationSlides || []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [error, setError] = useState('');

    const generateSlides = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-slides`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                setSlides(data.slides);
                setCurrentIndex(0);
            } else {
                setError(data.message || 'Failed to generate slides');
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
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-slides`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slides })
            });
            const data = await response.json();
            if (data.success) {
                onSlidesLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to save presentation.');
        } finally {
            setLocking(false);
        }
    };

    if (loading) {
        return (
            <div className="ppt-loading-state">
                <div className="slide-loader">
                    <Layout size={50} />
                    <div className="slide-shimmer"></div>
                </div>
                <h3>Designing Presentation Slides...</h3>
                <p>Curating content, visual notes, and presentation flow.</p>
            </div>
        );
    }

    if (slides.length === 0) {
        return (
            <div className="generate-ppt-start">
                <div className="ppt-hero">
                    <Presentation size={64} className="ppt-icon" />
                </div>
                <h2>Project Presentation Architect</h2>
                <p>Let AI structure your 10-slide final presentation with professional talking points and visual cues.</p>
                <button className="btn btn-primary-gradient big-btn" onClick={generateSlides}>
                    Draft Presentation Outline
                </button>
            </div>
        );
    }

    return (
        <div className="ppt-generation-results">
            <div className="slides-viewer-container">
                <div className="slide-navigation">
                    <button
                        className="nav-btn"
                        onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                    >
                        <ChevronLeft />
                    </button>
                    <span className="slide-counter">Slide {currentIndex + 1} of {slides.length}</span>
                    <button
                        className="nav-btn"
                        onClick={() => setCurrentIndex(prev => Math.min(slides.length - 1, prev + 1))}
                        disabled={currentIndex === slides.length - 1}
                    >
                        <ChevronRight />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: -20 }}
                        className="slide-canvas glass-container"
                    >
                        <div className="slide-header">
                            <span className="slide-num">#{slides[currentIndex]?.slideNumber}</span>
                            <h2>{slides[currentIndex]?.title}</h2>
                        </div>

                        <div className="slide-body">
                            <ul className="slide-bullet-points">
                                {(slides[currentIndex]?.content || []).map((point, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="slide-visual-note">
                            <div className="note-label">
                                <ImageIcon size={14} />
                                <span>Design Insight</span>
                            </div>
                            <p>{slides[currentIndex]?.visualNote}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="ppt-footer">
                <div className="ppt-info">
                    <Sparkles size={16} />
                    <span>Use this structure to create your PowerPoint slides.</span>
                </div>
                <div className="actions">
                    <button className="btn-secondary" onClick={generateSlides}>Redraft Outline</button>
                    <button className="btn-primary-gradient" onClick={handleLock} disabled={locking}>
                        {locking ? 'Locking...' : 'Lock Presentation & Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}

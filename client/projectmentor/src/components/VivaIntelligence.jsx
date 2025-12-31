import { useState, useEffect, useRef } from 'react';
import {
    GraduationCap, MessageCircle, HelpCircle, Upload, FileText, Brain, Sparkles, ChevronDown, ChevronUp,
    Mic, MicOff, Play, X, ArrowRight, RotateCcw, Download, Eye, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './VivaIntelligence.css';
import './VivaPreparation.css';
import { API_URL } from '../config';

export default function VivaIntelligence({ workspace, onVivaLocked }) {
    const [questions, setQuestions] = useState(workspace.vivaIntelligence || []);
    const [loading, setLoading] = useState(false);
    const [locking, setLocking] = useState(false);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [error, setError] = useState('');

    // New state for VIVA sections
    const [activeSection, setActiveSection] = useState('project');
    const [projectQuestions, setProjectQuestions] = useState([]);
    const [pptQuestions, setPptQuestions] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [projectLoading, setProjectLoading] = useState(false);
    const [showVivaSections, setShowVivaSections] = useState(true); // New state to control view

    // Practice Mode State
    const [mode, setMode] = useState('list'); // 'list' or 'practice'
    const [practiceIndex, setPracticeIndex] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [showComparison, setShowComparison] = useState(false);

    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize Speech Recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const results = Array.from(event.results);
                const currentTranscript = results
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscript(currentTranscript);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech Recognition Error:', event.error);
                setIsRecording(false);
            };

            recognitionRef.current.onend = () => {
                setIsRecording(false);
            };
        }
    }, []);

    const toggleRecording = () => {
        if (!recognitionRef.current) {
            alert('Speech recognition is not supported in your browser. Please try Chrome.');
            return;
        }

        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        } else {
            setTranscript('');
            setShowComparison(false);
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const stopAndShowResult = () => {
        if (isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
        setShowComparison(true);
    };

    const generateQuestions = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`${API_URL}/api/ai/generate-viva`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dna: workspace.projectDNA,
                    projectTitle: workspace.projectTitle
                })
            });
            const data = await response.json();
            if (data.success) {
                const vivaData = Array.isArray(data.viva) ? data.viva : (data.viva?.questions || []);
                setQuestions(vivaData);
            } else {
                setError(data.message || 'Failed to generate Viva questions');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // New functions for VIVA sections
    const generateProjectQuestions = async () => {
        setProjectLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/viva/generate-project-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectTopic: workspace.projectTitle || '',
                    solutionDesign: workspace.solutionDesign || '',
                    roadmap: workspace.projectRoadmap?.phases || [],
                    projectDNA: workspace.projectDNA || ''
                })
            });

            const data = await response.json();
            if (data.success) {
                setProjectQuestions(data.questions);
            } else {
                setError('Failed to generate project questions');
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            setError('Error generating questions');
        } finally {
            setProjectLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.ppt') && !file.name.endsWith('.pptx')) {
            setError('Please upload a PowerPoint file (.ppt or .pptx)');
            return;
        }

        setUploadedFile(file);
        setUploading(true);

        const formData = new FormData();
        formData.append('ppt', file);

        try {
            const response = await fetch(`${API_URL}/api/viva/upload-ppt`, {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setPptQuestions(data.questions);
            } else {
                setError('Failed to process PPT');
            }
        } catch (error) {
            console.error('Error uploading PPT:', error);
            setError('Error uploading PPT');
        } finally {
            setUploading(false);
        }
    };

    const downloadQuestions = (questions, filename) => {
        const content = questions.map((q, index) =>
            `Q${index + 1}: ${q.question}\nAnswer: ${q.answer}\nHow to Speak: ${q.speakingPoints}\n\n`
        ).join('');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleLock = async () => {
        if (workspace.currentStep >= 11) {
            return;
        }
        setLocking(true);
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-viva`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ viva: questions })
            });
            const data = await response.json();
            if (data.success) {
                onVivaLocked(data.workspace);
            }
        } catch (err) {
            setError('Failed to save Viva data.');
        } finally {
            setLocking(false);
        }
    };

    if (loading) {
        return (
            <div className="viva-loading-state">
                <div className="brain-pulse">
                    <Brain size={60} />
                </div>
                <h3>Simulating Expert Examination...</h3>
                <p>Curating the toughest questions based on your architecture and code.</p>
            </div>
        );
    }

    if (showVivaSections && questions.length === 0) {
        return (
            <div className="viva-preparation-new">
                <div className="viva-header">
                    <GraduationCap size={48} className="viva-icon" />
                    <h2>VIVA Preparation</h2>
                    <p>Master your project presentation with AI-powered questions and answers</p>
                </div>

                <div className="section-tabs">
                    <button
                        className={`tab-btn ${activeSection === 'project' ? 'active' : ''}`}
                        onClick={() => setActiveSection('project')}
                    >
                        <Brain size={20} />
                        Project Questions
                    </button>
                    <button
                        className={`tab-btn ${activeSection === 'ppt' ? 'active' : ''}`}
                        onClick={() => setActiveSection('ppt')}
                    >
                        <Upload size={20} />
                        PPT Based Questions
                    </button>
                </div>

                {activeSection === 'project' && (
                    <div className="project-section">
                        <div className="section-header">
                            <h3>
                                <Sparkles size={24} />
                                Project-Based Viva Questions
                            </h3>
                            <p>Generate personalized questions based on your project details</p>
                        </div>

                        <div className="project-info">
                            <h4>Current Project: {workspace.projectTitle || 'Untitled Project'}</h4>
                            <div className="project-details">
                                {workspace.solutionDesign && (
                                    <div className="detail-item">
                                        <strong>Solution Design:</strong> {workspace.solutionDesign.substring(0, 150)}...
                                    </div>
                                )}
                                {workspace.projectRoadmap?.phases && workspace.projectRoadmap.phases.length > 0 && (
                                    <div className="detail-item">
                                        <strong>Roadmap:</strong> {workspace.projectRoadmap.phases.length} phases planned
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            className="btn btn-primary-gradient big-btn"
                            onClick={generateProjectQuestions}
                            disabled={projectLoading}
                        >
                            {projectLoading ? (
                                <>
                                    <Loader2 size={20} className="spinning" />
                                    Generating Questions...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Generate Questions
                                </>
                            )}
                        </button>

                        {projectQuestions.length > 0 && (
                            <div className="questions-container">
                                <div className="questions-header">
                                    <h4>
                                        <Brain size={20} />
                                        Generated Questions ({projectQuestions.length})
                                    </h4>
                                    <div className="questions-actions">
                                        <button
                                            className="download-btn"
                                            onClick={() => downloadQuestions(projectQuestions, 'project-viva-questions.txt')}
                                        >
                                            <Download size={16} />
                                            Download
                                        </button>
                                        <button
                                            className="mock-test-btn"
                                            onClick={() => {
                                                setShowVivaSections(false);
                                                setMode('practice');
                                                // Set questions for practice mode
                                                setQuestions(projectQuestions.map(q => ({
                                                    ...q,
                                                    difficulty: 'Medium',
                                                    topic: 'Project'
                                                })));
                                            }}
                                        >
                                            <MessageCircle size={16} />
                                            Mock Test Answer
                                        </button>
                                    </div>
                                </div>

                                <div className="questions-list">
                                    {projectQuestions.map((q, index) => (
                                        <div key={index} className="question-card">
                                            <div className="question-number">Q{index + 1}</div>
                                            <div className="question-content">
                                                <h5>{q.question}</h5>
                                                <div className="answer-section">
                                                    <strong>Answer:</strong>
                                                    <p>{q.answer}</p>
                                                </div>
                                                <div className="speaking-section">
                                                    <strong>How to Speak:</strong>
                                                    <p className="speaking-points">{q.speakingPoints}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {activeSection === 'ppt' && (
                    <div className="ppt-section">
                        <div className="section-header">
                            <h3>
                                <FileText size={24} />
                                PPT-Based Viva Questions
                            </h3>
                            <p>Upload your presentation to generate customized questions</p>
                        </div>

                        <div className="upload-area">
                            <input
                                type="file"
                                id="ppt-upload"
                                accept=".ppt,.pptx"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="ppt-upload" className="upload-label">
                                <Upload size={48} />
                                <h4>Upload Your PPT</h4>
                                <p>Click to browse or drag and drop</p>
                                <span className="file-types">Supported: .ppt, .pptx</span>
                            </label>

                            {uploadedFile && (
                                <div className="uploaded-file">
                                    <FileText size={20} />
                                    <span>{uploadedFile.name}</span>
                                    {uploading && <Loader2 size={16} className="spinning" />}
                                </div>
                            )}
                        </div>

                        {pptQuestions.length > 0 && (
                            <div className="questions-container">
                                <div className="questions-header">
                                    <h4>
                                        <FileText size={20} />
                                        PPT-Based Questions ({pptQuestions.length})
                                    </h4>
                                    <div className="questions-actions">
                                        <button
                                            className="download-btn"
                                            onClick={() => downloadQuestions(pptQuestions, 'ppt-viva-questions.txt')}
                                        >
                                            <Download size={16} />
                                            Download
                                        </button>
                                        <button
                                            className="mock-test-btn"
                                            onClick={() => {
                                                setMode('practice');
                                                // Set PPT questions for practice mode
                                                setQuestions(pptQuestions.map(q => ({
                                                    ...q,
                                                    difficulty: 'Medium',
                                                    topic: 'PPT'
                                                })));
                                            }}
                                        >
                                            <MessageCircle size={16} />
                                            Mock Test Answer
                                        </button>
                                    </div>
                                </div>

                                <div className="questions-list">
                                    {pptQuestions.map((q, index) => (
                                        <div key={index} className="question-card">
                                            <div className="question-number">Q{index + 1}</div>
                                            <div className="question-content">
                                                <h5>{q.question}</h5>
                                                <div className="answer-section">
                                                    <strong>Answer:</strong>
                                                    <p>{q.answer}</p>
                                                </div>
                                                <div className="speaking-section">
                                                    <strong>Presentation Script:</strong>
                                                    <p className="speaking-points">{q.speakingPoints}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        );
    }

    if (mode === 'practice') {
        const currentQ = questions[practiceIndex];
        return (
            <div className="viva-practice-mode">
                <div className="practice-header">
                    <button className="btn-close-practice" onClick={() => {
                        setMode('list');
                        setShowVivaSections(true);
                    }}>
                        <X size={20} /> Exit Practice
                    </button>
                    <div className="practice-progress">
                        Question {practiceIndex + 1} of {questions.length}
                    </div>
                </div>

                <motion.div
                    key={practiceIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="practice-card glass-container"
                >
                    <div className="practice-meta">
                        <span className={`difficulty-tag ${currentQ.difficulty.toLowerCase()}`}>{currentQ.difficulty}</span>
                        <span className="topic-tag">{currentQ.topic}</span>
                    </div>

                    <h2 className="practice-question">{currentQ.question}</h2>

                    <div className="practice-interaction">
                        {!showComparison ? (
                            <div className="recording-zone">
                                <div className={`mic-button ${isRecording ? 'recording' : ''}`} onClick={toggleRecording}>
                                    {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
                                </div>
                                <p className="recording-status">
                                    {isRecording ? 'Listening... Speak your answer now.' : 'Click the mic to practice speaking.'}
                                </p>

                                {transcript && (
                                    <div className="live-transcript">
                                        <p>"{transcript}"</p>
                                    </div>
                                )}

                                {transcript && !isRecording && (
                                    <button className="btn-show-comparison" onClick={stopAndShowResult}>
                                        Done & Check Answer
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="comparison-zone">
                                <div className="user-transcription-box">
                                    <label>Your Answer:</label>
                                    <p>{transcript || "(No speech detected)"}</p>
                                </div>

                                <div className="model-answer-box">
                                    <label><CheckCircle size={14} /> Model Answer:</label>
                                    <p>{currentQ.answer}</p>
                                </div>

                                <div className="practice-actions">
                                    <button className="btn-retry-viva" onClick={() => { setShowComparison(false); setTranscript(''); }}>
                                        <RotateCcw size={16} /> Try Again
                                    </button>
                                    {practiceIndex < questions.length - 1 ? (
                                        <button className="btn-next-viva" onClick={() => {
                                            setPracticeIndex(practiceIndex + 1);
                                            setShowComparison(false);
                                            setTranscript('');
                                        }}>
                                            Next Question <ArrowRight size={16} />
                                        </button>
                                    ) : (
                                        <button className="btn-next-viva" onClick={() => setMode('list')}>
                                            Finish Practice 🎉
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="viva-intelligence-results">
            <div className="viva-header-row">
                <div className="viva-info-banner glass-container">
                    <Sparkles size={20} />
                    <p>We've generated strategic questions. Prepare for your viva with our tools.</p>
                </div>
                <button className="btn-practice-viva" onClick={() => setMode('practice')}>
                    <Play size={16} /> Mock Interview Mode
                </button>
            </div>

            <div className="qa-list">
                {questions.map((item, i) => (
                    <div key={i} className={`qa-card glass-container ${expandedIndex === i ? 'active' : ''}`}>
                        <div
                            className="qa-header"
                            onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        >
                            <div className="qa-meta">
                                <span className={`difficulty-tag ${item.difficulty.toLowerCase()}`}>
                                    {item.difficulty}
                                </span>
                                <span className="topic-tag">{item.topic}</span>
                            </div>
                            <div className="question-row">
                                <HelpCircle size={18} className="q-icon" />
                                <h4>{item.question}</h4>
                                {expandedIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>

                        <AnimatePresence>
                            {expandedIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="qa-body"
                                >
                                    <div className="answer-box">
                                        <div className="a-label">
                                            <CheckCircle size={14} /> <span>Model Answer</span>
                                        </div>
                                        <p>{item.answer}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="viva-footer">
                <button className="btn-secondary" onClick={generateQuestions}>Regenerate Prep</button>
                <button
                    className="btn btn-primary-gradient"
                    onClick={handleLock}
                    disabled={locking || workspace.currentStep >= 11}
                >
                    {locking ? 'Finalizing...' : (workspace.currentStep >= 11 ? 'Journey Completed ✓' : 'Finish Journey')}
                </button>
            </div>
        </div>
    );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Upload, FileText, Sparkles, Clock, CheckCircle, AlertCircle, Loader2, Download, Eye } from 'lucide-react';
import './VivaPreparation.css';
import { API_URL } from '../config';

export default function VivaPreparation() {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('project');
    const [loading, setLoading] = useState(false);
    const [projectQuestions, setProjectQuestions] = useState([]);
    const [pptQuestions, setPptQuestions] = useState([]);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [projectData, setProjectData] = useState(null);

    // Get current workspace data
    useEffect(() => {
        const currentWorkspace = JSON.parse(localStorage.getItem('currentWorkspace') || '{}');
        setProjectData(currentWorkspace);
    }, []);

    const generateProjectQuestions = async () => {
        if (!projectData) {
            alert('Please select a project first');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/viva/generate-project-questions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    projectTopic: projectData.projectTopic || '',
                    solutionDesign: projectData.solutionDesign || '',
                    roadmap: projectData.roadmap || [],
                    projectDNA: projectData.projectDNA || ''
                })
            });

            const data = await response.json();
            if (data.success) {
                setProjectQuestions(data.questions);
            } else {
                alert('Failed to generate questions');
            }
        } catch (error) {
            console.error('Error generating questions:', error);
            alert('Error generating questions');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.name.endsWith('.ppt') && !file.name.endsWith('.pptx')) {
            alert('Please upload a PowerPoint file (.ppt or .pptx)');
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
                alert('Failed to process PPT');
            }
        } catch (error) {
            console.error('Error uploading PPT:', error);
            alert('Error uploading PPT');
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

    return (
        <div className="viva-preparation">
            <div className="viva-header">
                <button className="back-btn" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={20} />
                    Back to Dashboard
                </button>
                <h1>
                    <Brain size={32} />
                    VIVA Preparation
                </h1>
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

            <div className="content-area">
                {activeSection === 'project' && (
                    <div className="project-section">
                        <div className="section-header">
                            <h2>
                                <Sparkles size={24} />
                                Project-Based Viva Questions
                            </h2>
                            <p>Generate personalized questions based on your project details</p>
                        </div>

                        {projectData && (
                            <div className="project-info">
                                <h3>Current Project: {projectData.projectTopic || 'Untitled Project'}</h3>
                                <div className="project-details">
                                    {projectData.solutionDesign && (
                                        <div className="detail-item">
                                            <strong>Solution Design:</strong> {projectData.solutionDesign.substring(0, 150)}...
                                        </div>
                                    )}
                                    {projectData.roadmap && projectData.roadmap.length > 0 && (
                                        <div className="detail-item">
                                            <strong>Roadmap:</strong> {projectData.roadmap.length} phases planned
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        <button
                            className="generate-btn"
                            onClick={generateProjectQuestions}
                            disabled={loading || !projectData}
                        >
                            {loading ? (
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
                                    <h3>
                                        <CheckCircle size={20} />
                                        Generated Questions ({projectQuestions.length})
                                    </h3>
                                    <button
                                        className="download-btn"
                                        onClick={() => downloadQuestions(projectQuestions, 'project-viva-questions.txt')}
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>

                                <div className="questions-list">
                                    {projectQuestions.map((q, index) => (
                                        <div key={index} className="question-card">
                                            <div className="question-number">Q{index + 1}</div>
                                            <div className="question-content">
                                                <h4>{q.question}</h4>
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
                            <h2>
                                <FileText size={24} />
                                PPT-Based Viva Questions
                            </h2>
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
                                <h3>Upload Your PPT</h3>
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
                                    <h3>
                                        <CheckCircle size={20} />
                                        PPT-Based Questions ({pptQuestions.length})
                                    </h3>
                                    <button
                                        className="download-btn"
                                        onClick={() => downloadQuestions(pptQuestions, 'ppt-viva-questions.txt')}
                                    >
                                        <Download size={16} />
                                        Download
                                    </button>
                                </div>

                                <div className="questions-list">
                                    {pptQuestions.map((q, index) => (
                                        <div key={index} className="question-card">
                                            <div className="question-number">Q{index + 1}</div>
                                            <div className="question-content">
                                                <h4>{q.question}</h4>
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
            </div>
        </div>
    );
}

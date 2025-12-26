import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import '../App.css';

const ProjectSelection = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { teamName, teamCode } = location.state || {}; // Expecting state passed from dashboard

    const [domain, setDomain] = useState('Healthcare');
    const [projectType, setProjectType] = useState('Mini Project');
    const [skillLevel, setSkillLevel] = useState('beginner');
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [detailView, setDetailView] = useState(null); // Project object being viewed details for
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setProjects([]);
        setDetailView(null);

        const user = auth.currentUser;
        if (!user) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/generate-project`, {
                domain,
                type: projectType,
                skillLevel,
                teamName,
                teamCode,
                leaderId: user.uid
            });

            if (res.data.success) {
                setProjects(res.data.projects);
            } else {
                setError(res.data.message || "Failed to generate projects");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.message || "Server Error");
        } finally {
            setLoading(false);
        }
    };

    const handleLockProject = async () => {
        if (!detailView) return;
        setLoading(true);
        const user = auth.currentUser;

        try {
            const res = await axios.post(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/lock-project`, {
                templateId: detailView.templateId,
                teamId: teamCode, // using teamCode as ID based on flow
                projectName: detailView.title,
                domain: detailView.domain,
                type: detailView.type,
                skillLevel: detailView.skillLevel,
                problemStatement: detailView.problemStatement,
                proposedSolution: detailView.proposedSolution,
                keyFeatures: detailView.keyFeatures,
                leaderId: user.uid,
                leaderEmail: user.email,
                leaderName: user.displayName,
                teamName: teamName
            });

            if (res.data.success) {
                alert("Project Locked! Check your email.");
                navigate('/leader/dashboard', {
                    state: {
                        teamName,
                        teamCode,
                        selectedProject: detailView.title,
                        projectLocked: true
                    }
                });
            }
        } catch (err) {
            console.error(err);
            alert("Failed to lock project: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="splash-container" style={{ justifyContent: 'flex-start', paddingTop: '2rem', height: 'auto', minHeight: '100vh', overflowY: 'auto' }}>
            <h2 className="splash-title" style={{ fontSize: '2rem' }}>Generate Project</h2>
            <p style={{ marginBottom: '2rem', color: '#ccc' }}>Define parameters for your {teamName} team.</p>

            <div className="glass-card" style={{ width: '90%', maxWidth: '800px', marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <select value={domain} onChange={(e) => setDomain(e.target.value)} style={{ padding: '10px', borderRadius: '5px' }}>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                        <option value="E-Commerce">E-Commerce</option>
                    </select>
                    <select value={projectType} onChange={(e) => setProjectType(e.target.value)} style={{ padding: '10px', borderRadius: '5px' }}>
                        <option value="Mini Project">Mini Project</option>
                        <option value="Final Project">Final Project</option>
                        <option value="Hackathon Project">Hackathon Project</option>
                    </select>
                    <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)} style={{ padding: '10px', borderRadius: '5px' }}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <button
                    className="btn-primary"
                    onClick={handleGenerate}
                    disabled={loading}
                    style={{ width: '100%' }}
                >
                    {loading ? 'Processing...' : 'Generate Projects'}
                </button>
                {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </div>

            {/* Project List */}
            {projects.length > 0 && !detailView && (
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {projects.map((proj, idx) => (
                        <div
                            key={idx}
                            className="glass-card"
                            style={{ width: '300px', cursor: 'pointer', border: '1px solid #00c6ff' }}
                            onClick={() => setDetailView(proj)}
                        >
                            <h3 style={{ fontSize: '1.2rem', color: '#00c6ff' }}>{proj.title}</h3>
                            <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Click to view details</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Detail View */}
            {detailView && (
                <div className="glass-card" style={{ width: '90%', maxWidth: '800px', animation: 'fadeIn 0.5s' }}>
                    <button onClick={() => setDetailView(null)} style={{ background: 'transparent', border: '1px solid #ccc', color: 'white', padding: '5px 10px', borderRadius: '5px', marginBottom: '1rem' }}>Back to List</button>
                    <h2 style={{ color: '#00c6ff' }}>{detailView.title}</h2>

                    <div style={{ textAlign: 'left', marginTop: '1.5rem' }}>
                        <h4 style={{ color: '#ddd' }}>Problem Statement:</h4>
                        <p style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>{detailView.problemStatement}</p>

                        <h4 style={{ color: '#ddd' }}>Proposed Solution:</h4>
                        <p style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '5px', marginBottom: '1rem' }}>{detailView.proposedSolution}</p>

                        <h4 style={{ color: '#ddd' }}>Key Features:</h4>
                        <ul style={{ paddingLeft: '20px', marginBottom: '1rem' }}>
                            {detailView.keyFeatures.map((feat, i) => (
                                <li key={i}>{feat}</li>
                            ))}
                        </ul>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button
                            className="btn-primary"
                            style={{ flex: 1, background: 'linear-gradient(90deg, #ff416c, #ff4b2b)' }}
                            onClick={handleLockProject}
                            disabled={loading}
                        >
                            {loading ? 'Locking...' : '🔒 Lock This Project'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectSelection;

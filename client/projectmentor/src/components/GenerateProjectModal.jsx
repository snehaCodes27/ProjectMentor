import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';

const GenerateProjectModal = ({ show, onClose, teamName, teamCode, onProjectLocked }) => {
    const [domain, setDomain] = useState('Healthcare');
    const [projectType, setProjectType] = useState('Mini Project');
    const [skillLevel, setSkillLevel] = useState('beginner');
    const [generatedProjects, setGeneratedProjects] = useState([]);
    const [detailView, setDetailView] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenerate = async () => {
        setLoading(true);
        setError('');
        setGeneratedProjects([]);
        setDetailView(null);

        const user = auth.currentUser;
        if (!user) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/generate-project`, {
                domain,
                type: projectType,
                skillLevel,
                teamName,
                teamCode,
                leaderId: user.uid
            });

            if (res.data.success) {
                setGeneratedProjects(res.data.projects);
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
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/lock-project`, {
                templateId: detailView.templateId,
                teamId: teamCode,
                projectName: detailView.title,
                domain: detailView.domain,
                type: detailView.type,
                skillLevel: detailView.skillLevel,
                problemStatement: detailView.problemStatement,
                proposedSolution: detailView.proposedSolution,
                keyFeatures: detailView.keyFeatures,
                techStack: detailView.techStack, // Assuming backend provides this now or will be added
                roadmap: detailView.roadmap, // Assuming backend provides this
                leaderId: user.uid,
                leaderEmail: user.email,
                leaderName: user.displayName,
                teamName: teamName
            });

            if (res.data.success) {
                alert("Project Locked! Check your email.");
                onProjectLocked(detailView.title);
                setGeneratedProjects([]);
                setDetailView(null);
                onClose();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to lock project: " + (err.response?.data?.error || err.message));
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1100, backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-card" style={{ width: '95%', maxWidth: '1000px', height: '90%', overflowY: 'auto', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#ff6b6b' }}
                >
                    ✖
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🎲 Generate & Select Project</h2>

                {/* Generation Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
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
                    <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
                        {loading ? 'Generating...' : 'Generate 🎲'}
                    </button>
                </div>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

                {/* List View */}
                {generatedProjects.length > 0 && !detailView && (
                    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {generatedProjects.map((proj, idx) => (
                            <div key={idx} className="glass-card" style={{ width: '280px', cursor: 'pointer', border: '1px solid var(--primary-color)' }} onClick={() => setDetailView(proj)}>
                                <h3 style={{ fontSize: '1.1rem', color: 'var(--primary-color)' }}>{proj.title}</h3>
                                <p style={{ fontSize: '0.9rem', color: '#666' }}>Click for details</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* Detail View (Nested) */}
                {detailView && (
                    <div style={{ textAlign: 'left', padding: '1rem', animation: 'fadeIn 0.3s' }}>
                        <button onClick={() => setDetailView(null)} style={{ marginBottom: '1rem', padding: '5px 10px', cursor: 'pointer' }}>⬅ Back to List</button>
                        <h3 style={{ color: 'var(--primary-color)' }}>{detailView.title}</h3>

                        <div className="modal-content-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                <strong>Problem:</strong> {detailView.problemStatement}
                            </div>
                            <div style={{ background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                <strong>Solution:</strong> {detailView.proposedSolution}
                            </div>
                        </div>


                        <div style={{ marginTop: '1rem' }}>
                            <strong>Key Features:</strong>
                            <ul>
                                {detailView.keyFeatures?.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                        </div>

                        {/* Placeholder for tech stack and roadmap if available */}
                        {detailView.techStack && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Tech Stack:</strong> {Array.isArray(detailView.techStack) ? detailView.techStack.join(', ') : detailView.techStack}
                            </div>
                        )}

                        <button className="btn-primary" style={{ width: '100%', marginTop: '2rem' }} onClick={handleLockProject} disabled={loading}>
                            {loading ? 'Locking...' : '🔒 Confirm & Lock Project'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateProjectModal;

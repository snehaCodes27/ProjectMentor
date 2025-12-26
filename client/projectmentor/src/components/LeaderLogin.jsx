import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const LeaderLogin = () => {
    const [email, setEmail] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/leader-login`, {
                email,
                teamCode
            });

            if (res.data.success) {
                // Navigate to dashboard with state
                navigate('/leader/dashboard', {
                    state: {
                        teamName: res.data.teamName,
                        teamCode: res.data.teamCode,
                        projectLocked: res.data.projectLocked,
                        selectedProject: res.data.selectedProject
                    }
                });
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Login Failed. Invalid credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="splash-container">
            <div className="glass-card" style={{ maxWidth: '400px', width: '90%' }}>
                <button
                    onClick={() => navigate('/role-selection')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--text-dark)',
                        fontWeight: 'bold',
                        padding: 0
                    }}
                >
                    ← Back
                </button>

                <h2 className="splash-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    👑 Leader Login
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    Access your Team Dashboard
                </p>

                {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>❌ {error}</p>}

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>📧</span>
                        <input
                            type="email"
                            placeholder="Registered Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '45px', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>🔑</span>
                        <input
                            type="text"
                            placeholder="Team Code"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                            required
                            style={{ paddingLeft: '45px', width: '100%', boxSizing: 'border-box', textTransform: 'uppercase' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
                        {loading ? 'Verifying...' : 'Access Dashboard 🚀'}
                    </button>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                        Don't have a team yet? <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/leader/register')}>Register</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LeaderLogin;

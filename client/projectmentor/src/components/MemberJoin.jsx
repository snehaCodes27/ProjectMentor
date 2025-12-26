import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MemberJoin = () => {
    const [memberName, setMemberName] = useState('');
    const [memberEmail, setMemberEmail] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamCode, setTeamCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const [isLoginMode, setIsLoginMode] = useState(false); // Toggle between Join and Login

    const handleJoinRequest = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/member-requests`, {
                memberName,
                memberEmail,
                teamName,
                teamCode,
                memberUid: 'temp-uid-' + Date.now()
            });
            setSuccess('Request sent successfully! Please wait for Leader approval.');
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send request");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const loginRes = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/member-login`, {
                email: memberEmail,
                teamCode: teamCode
            });

            if (loginRes.data.success) {
                const sessionData = {
                    teamName: loginRes.data.teamName,
                    teamCode: loginRes.data.teamCode,
                    memberName: loginRes.data.member.name,
                    memberEmail: memberEmail // Ensure we save the email used to login!
                };
                localStorage.setItem('memberSession', JSON.stringify(sessionData));

                navigate('/member/dashboard', {
                    state: sessionData
                });
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login Failed. Check Team Code or Email, or wait for approval.");
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

                {/* TABS */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #ccc' }}>
                    <button
                        onClick={() => { setIsLoginMode(false); setError(''); setSuccess(''); }}
                        style={{
                            flex: 1, padding: '10px', background: 'transparent', border: 'none', cursor: 'pointer',
                            borderBottom: !isLoginMode ? '3px solid var(--primary-color)' : 'none',
                            fontWeight: !isLoginMode ? 'bold' : 'normal',
                            color: 'var(--primary-color)'
                        }}
                    >
                        New Request
                    </button>
                    <button
                        onClick={() => { setIsLoginMode(true); setError(''); setSuccess(''); }}
                        style={{
                            flex: 1, padding: '10px', background: 'transparent', border: 'none', cursor: 'pointer',
                            borderBottom: isLoginMode ? '3px solid var(--primary-color)' : 'none',
                            fontWeight: isLoginMode ? 'bold' : 'normal',
                            color: 'var(--primary-color)'
                        }}
                    >
                        Member Login
                    </button>
                </div>

                <h2 className="splash-title" style={{ fontSize: '1.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                    {isLoginMode ? "🔑 Access Dashboard" : "👋 Join a Team"}
                </h2>

                {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>❌ {error}</p>}

                {success && <div style={{ textAlign: 'center' }}>
                    <p style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>✅ {success}</p>
                    <button className="btn-primary" onClick={() => navigate('/')}>Back to Home</button>
                </div>}

                {!success && (
                    <form onSubmit={isLoginMode ? handleLogin : handleJoinRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

                        {!isLoginMode && (
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={memberName}
                                onChange={(e) => setMemberName(e.target.value)}
                                required={!isLoginMode}
                            />
                        )}

                        <input
                            type="email"
                            placeholder="Your Email"
                            value={memberEmail}
                            onChange={(e) => setMemberEmail(e.target.value)}
                            required
                        />

                        {!isLoginMode && (
                            <input
                                type="text"
                                placeholder="Team Name"
                                value={teamName}
                                onChange={(e) => setTeamName(e.target.value)}
                                required={!isLoginMode}
                            />
                        )}

                        <input
                            type="text"
                            placeholder="Team Code"
                            value={teamCode}
                            onChange={(e) => setTeamCode(e.target.value)}
                            required
                            style={{ textTransform: 'uppercase' }}
                        />

                        <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                            {isLoginMode ? "Enter Dashboard 🚀" : "Send Request 📩"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MemberJoin;

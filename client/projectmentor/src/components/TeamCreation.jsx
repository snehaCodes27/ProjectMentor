import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import createTeamIcon from '../assets/create team.png';
import '../App.css';

const TeamCreation = () => {
    const [teamName, setTeamName] = useState('');
    const [leaderName, setLeaderName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setLeaderName(user.displayName || '');
            } else {
                navigate('/leader/register');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const generateTeamCode = () => {
        return Math.random().toString(36).substring(2, 8).toUpperCase();
    };

    const handleCreateTeam = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const user = auth.currentUser;
        if (!user) {
            setError("User not authenticated");
            setLoading(false);
            return;
        }

        const code = generateTeamCode();

        try {
            // 1. Create Team in DB
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/teams`, {
                leaderId: user.uid,
                teamName: teamName,
                teamCode: code,
                leaderEmail: user.email,
                leaderName: leaderName || user.displayName
            });

            // 2. Send Code via Email
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/send-team-code`, {
                leaderEmail: user.email,
                leaderName: leaderName || user.displayName,
                teamName: teamName,
                teamCode: code
            });

            // Navigate to Dashboard
            navigate('/leader/dashboard', { state: { teamName, teamCode: code } });

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.error || "Failed to create team");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="splash-container">
            <div className="glass-card" style={{ maxWidth: '450px', width: '90%', textAlign: 'center' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <img
                        src={createTeamIcon}
                        alt="Create Team"
                        style={{ width: '100px', height: '100px', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(230,216,195,0.5))' }}
                    />
                </div>

                <h2 className="splash-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                    Create Squad ⚔️
                </h2>
                <p style={{ color: 'var(--accent-color)', marginBottom: '2rem' }}>
                    Every legendary project needs a name!
                </p>

                {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem' }}>❌ {error}</p>}

                <form onSubmit={handleCreateTeam} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginLeft: '5px' }}>Leader Name</label>
                        <input
                            type="text"
                            value={leaderName}
                            onChange={(e) => setLeaderName(e.target.value)}
                            required
                            disabled
                            style={{ marginTop: '0.5rem', width: '100%', boxSizing: 'border-box', opacity: 0.7 }}
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label style={{ color: 'var(--primary-color)', fontSize: '0.9rem', marginLeft: '5px' }}>Team Name</label>
                        <input
                            type="text"
                            placeholder="e.g. The Code Avengers 🦸‍♂️"
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            required
                            style={{ marginTop: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }} disabled={loading}>
                        {loading ? '🔮 Summoning Team...' : '🚀 Create Team & Get Code'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TeamCreation;

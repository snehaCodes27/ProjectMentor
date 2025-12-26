import React from 'react';
import { useNavigate } from 'react-router-dom';
import leaderIcon from '../assets/leader.png';
import memberIcon from '../assets/member.png';
import '../App.css';

const RoleSelection = () => {
    const navigate = useNavigate();

    return (
        <div className="splash-container">
            <h2 className="splash-title" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Select Your Role</h2>
            <div className="responsive-flex" style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                <div
                    className="glass-card"
                    style={{ cursor: 'pointer', textAlign: 'center', width: '250px' }}
                    onClick={() => navigate('/leader/register')}
                >
                    <img src={leaderIcon} alt="Leader" style={{ width: '100px', height: '100px', marginBottom: '1rem' }} />
                    <h3>Leader</h3>
                    <p style={{ color: 'var(--accent-color)' }}>Create a team and manage project.</p>
                </div>
                <div
                    className="glass-card"
                    style={{ cursor: 'pointer', textAlign: 'center', width: '250px' }}
                    onClick={() => navigate('/member/join')}
                >
                    <img src={memberIcon} alt="Member" style={{ width: '100px', height: '100px', marginBottom: '1rem' }} />
                    <h3>Member</h3>
                    <p style={{ color: 'var(--accent-color)' }}>Join a team and view tasks.</p>
                </div>
            </div>
        </div>
    );
};

export default RoleSelection;

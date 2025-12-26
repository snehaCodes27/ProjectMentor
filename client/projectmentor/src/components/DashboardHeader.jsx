import React from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = ({ teamName, teamCode, memberCount, projectTitle, onOpenSettings }) => {
    const navigate = useNavigate();

    return (
        <nav className="dashboard-header">
            <div className="header-info">
                {/* Team Name */}
                <div className="header-item">
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Team Name</span>
                    <h2 style={{ margin: '5px 0 0 0', color: 'var(--primary-color)', fontSize: '1.5rem' }}>{teamName}</h2>
                </div>

                {/* Team Code */}
                <div className="header-item header-divider">
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Team Code</span>
                    <h3 style={{ margin: '5px 0 0 0', fontSize: '1.2rem', fontFamily: 'monospace', color: '#333' }}>{teamCode}</h3>
                </div>

                {/* Total Members */}
                <div className="header-item header-divider">
                    <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Total Members</span>
                    <h3 style={{ margin: '5px 0 0 0', fontSize: '1.2rem' }}>👥 {memberCount}</h3>
                </div>

                {/* Project Title (if active) */}
                {projectTitle && (
                    <div className="header-item header-divider">
                        <span style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Project Title</span>
                        <h3 style={{ margin: '5px 0 0 0', fontSize: '1.2rem', color: 'var(--secondary-color)' }}>🚀 {projectTitle}</h3>
                    </div>
                )}
            </div>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={onOpenSettings}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#666',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '50%',
                        transition: 'background 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    title="Settings"
                    onMouseOver={(e) => { e.currentTarget.style.background = '#f0f0f0'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                    ⚙️
                </button>

                <button
                    onClick={() => navigate('/role-selection')}
                    style={{
                        background: 'transparent',
                        border: '1px solid #ff6b6b',
                        color: '#ff6b6b',
                        padding: '8px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#ff6b6b'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff6b6b'; }}
                >
                    Logout 🚪
                </button>
            </div>
        </nav>
    );
};

export default DashboardHeader;

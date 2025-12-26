import React from 'react';

const TeamProgress = ({ tasks }) => {
    const total = tasks.length || 1;
    const phase1 = tasks.filter(t => t.phase === 'Phase 1' && t.status === 'completed').length;
    const phase2 = tasks.filter(t => t.phase === 'Phase 2' && t.status === 'completed').length;
    const phase3 = tasks.filter(t => t.phase === 'Phase 3' && t.status === 'completed').length;

    const p1Total = tasks.filter(t => t.phase === 'Phase 1').length || 1;
    const p2Total = tasks.filter(t => t.phase === 'Phase 2').length || 1;
    const p3Total = tasks.filter(t => t.phase === 'Phase 3').length || 1;

    const p1Pct = (phase1 / p1Total) * 100;
    const p2Pct = (phase2 / p2Total) * 100;
    const p3Pct = (phase3 / p3Total) * 100;

    const overallProgress = Math.round((tasks.filter(t => t.status === 'completed').length / (tasks.length || 1)) * 100);

    const Circle = ({ r }) => (
        <circle cx="60" cy="60" r={r} fill="none" stroke="#ddd" strokeWidth="8" />
    );
    const ProgressCircle = ({ pct, color, r }) => (
        <circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${(2 * Math.PI * r) * (pct / 100)} ${2 * Math.PI * r}`}
            strokeLinecap="round" transform="rotate(-90 60 60)" />
    );

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '1rem', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                <svg width="120" height="120">
                    <Circle r="20" /> <ProgressCircle pct={p1Pct} color="#4caf50" r="20" />
                    <Circle r="35" /> <ProgressCircle pct={p2Pct} color="#2196f3" r="35" />
                    <Circle r="50" /> <ProgressCircle pct={p3Pct} color="#9c27b0" r="50" />
                </svg>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1rem', fontWeight: 'bold' }}>
                    {overallProgress}%
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#4caf50' }}></div>
                    <span style={{ fontSize: '0.9rem' }}>Phase 1: <strong>{Math.round(p1Pct)}%</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#2196f3' }}></div>
                    <span style={{ fontSize: '0.9rem' }}>Phase 2: <strong>{Math.round(p2Pct)}%</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#9c27b0' }}></div>
                    <span style={{ fontSize: '0.9rem' }}>Phase 3: <strong>{Math.round(p3Pct)}%</strong></span>
                </div>
            </div>
        </div>
    );
};

export default TeamProgress;

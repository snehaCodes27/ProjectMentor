import React from 'react';

const ReportsView = ({ tasks, members, onClose }) => {
    // Basic Calculations
    const totalTasks = tasks.length || 0;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Member Contribution
    const memberStats = members.map(m => {
        const assigned = tasks.filter(t => t.assignedTo?.email === m.email).length;
        const done = tasks.filter(t => t.assignedTo?.email === m.email && t.status === 'completed').length;
        return { name: m.name, assigned, done, rate: assigned ? Math.round((done / assigned) * 100) : 0 };
    });

    const handlePrint = () => {
        window.print();
    };

    const handleExport = () => {
        const data = {
            timestamp: new Date().toISOString(),
            summary: { totalTasks, completedTasks, completionRate },
            memberStats
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'team_report.json';
        a.click();
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1200, backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-card" style={{ width: '90%', maxWidth: '800px', maxHeight: '90%', overflowY: 'auto', position: 'relative', background: '#fff', color: '#333' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#ff6b6b' }}
                >
                    ✖
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>📊 Team Performance Reports</h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '10px' }}>
                        <h3 style={{ margin: '0 0 1rem 0' }}>Task Completion</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{completionRate}%</div>
                        <p>{completedTasks} / {totalTasks} Tasks Completed</p>
                    </div>
                    <div style={{ padding: '1.5rem', background: '#f8f9fa', borderRadius: '10px' }}>
                        <h3 style={{ margin: '0 0 1rem 0' }}>Team Activity</h3>
                        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--secondary-color)' }}>{members.length}</div>
                        <p>Active Members</p>
                    </div>
                </div>

                <h3>👤 Member Contributions</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', marginBottom: '2rem' }}>
                    <thead>
                        <tr style={{ background: '#eee', textAlign: 'left' }}>
                            <th style={{ padding: '10px' }}>Member</th>
                            <th style={{ padding: '10px' }}>Assigned</th>
                            <th style={{ padding: '10px' }}>Completed</th>
                            <th style={{ padding: '10px' }}>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {memberStats.map((m, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                                <td style={{ padding: '10px' }}>{m.name}</td>
                                <td style={{ padding: '10px' }}>{m.assigned}</td>
                                <td style={{ padding: '10px' }}>{m.done}</td>
                                <td style={{ padding: '10px' }}>
                                    <div style={{ background: '#e0e0e0', borderRadius: '5px', height: '10px', width: '100px', display: 'inline-block', marginRight: '10px' }}>
                                        <div style={{ background: 'var(--primary-color)', width: `${m.rate}%`, height: '100%', borderRadius: '5px' }}></div>
                                    </div>
                                    {m.rate}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <button className="btn-primary" onClick={handleExport}>📥 Export JSON</button>
                    <button className="btn-secondary" onClick={handlePrint} style={{ background: '#6c757d', color: 'white' }}>🖨️ Print Report</button>
                </div>
            </div>
        </div>
    );
};

export default ReportsView;

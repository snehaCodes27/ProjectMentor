import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SettingsView = ({ teamCode, teamName, onClose }) => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!newPassword) return alert("Enter a new password");
        setLoading(true);
        try {
            const user = auth.currentUser;
            if (user) {
                await user.updatePassword(newPassword);
                alert("Password updated successfully!");
                setNewPassword('');
            }
        } catch (err) {
            alert("Error: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExportProject = async () => {
        try {
            // Fetch comprehensive data
            const [teamRes, taskRes, subRes, msgRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/teams/${teamCode}`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks/team/${teamCode}`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/submissions/${teamCode}`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/${teamCode}`)
            ]);

            const fullData = {
                team: teamRes.data.team,
                tasks: taskRes.data.tasks,
                submissions: subRes.data.submissions,
                messages: msgRes.data.messages,
                exportedAt: new Date().toISOString()
            };

            const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `project_export_${teamCode}.json`;
            a.click();
        } catch (err) {
            alert("Failed to export data");
            console.error(err);
        }
    };

    const handleCloseProject = () => {
        const confirm = window.confirm("⚠ DANGER ZONE: Are you sure you want to CLOSE this project? \n\nThis is a simulation, but in a real app this would archive/lock the project permanently.");
        if (confirm) {
            alert("Project Closed (Simulation). You would typically be redirected to an archive view.");
            // navigate('/dashboard'); // Example
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1200, backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-card" style={{ width: '90%', maxWidth: '600px', background: '#fff', color: '#333', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#ff6b6b' }}
                >
                    ✖
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>⚙️ Team Settings</h2>

                {/* Team Info */}
                <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>📂 Project Details</h4>
                    <p><strong>Team Name:</strong> {teamName}</p>
                    <p><strong>Team Code:</strong> {teamCode}</p>
                </div>

                {/* Account Security */}
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>🔐 Security</h4>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                        <button className="btn-primary" onClick={handleChangePassword} disabled={loading}>
                            {loading ? 'Updating...' : 'Update Password'}
                        </button>
                    </div>
                </div>

                {/* Data Management */}
                <div style={{ marginBottom: '2rem' }}>
                    <h4 style={{ margin: '0 0 10px 0' }}>💾 Data Management</h4>
                    <button onClick={handleExportProject} style={{ width: '100%', padding: '10px', background: '#2196f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        📤 Export All Project Data
                    </button>
                </div>

                {/* Danger Zone */}
                <div style={{ padding: '1rem', border: '1px solid #ff6b6b', borderRadius: '8px', background: '#fff5f5' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#dc3545' }}>🚫 Danger Zone</h4>
                    <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Once you close the project, it cannot be reopened.</p>
                    <button onClick={handleCloseProject} style={{ width: '100%', padding: '10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Close Project
                    </button>
                </div>

            </div>
        </div>
    );
};

export default SettingsView;

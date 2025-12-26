import React, { useEffect } from 'react';
import axios from 'axios';

const ManageTeamModal = ({ show, onClose, teamName, teamCode, requests, members, fetchMembersAndRequests }) => {

    useEffect(() => {
        if (show) {
            fetchMembersAndRequests();
        }
    }, [show, fetchMembersAndRequests]);

    const handleAccept = async (requestId) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/teams/${teamCode}/accept-member`, { requestId });
            fetchMembersAndRequests(); // Refresh
        } catch (err) {
            alert(err.response?.data?.error || "Failed to accept");
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/member-requests/${requestId}/reject`);
            fetchMembersAndRequests(); // Refresh
        } catch (err) {
            alert("Failed to reject");
        }
    };

    const handleRemoveMember = async (email) => {
        if (!window.confirm("Are you sure you want to remove this member?")) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/teams/${teamCode}/members/${email}`);
            fetchMembersAndRequests();
        } catch (err) { alert("Failed to remove"); }
    };

    const handleMuteMember = async (email) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/teams/${teamCode}/members/${email}/mute`);
            fetchMembersAndRequests(); // Refresh to show new status
        } catch (err) { alert("Failed to update mute status"); }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(teamCode);
        alert("Team Code copied to clipboard!");
    };

    if (!show) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1100, backdropFilter: 'blur(5px)'
        }}>
            <div className="glass-card" style={{ width: '90%', maxWidth: '900px', maxHeight: '90%', overflowY: 'auto', position: 'relative' }}>
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#ff6b6b' }}
                >
                    ✖
                </button>

                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>🏰 Manage Team: {teamName}</h2>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '10px' }}>Code: {teamCode}</span>
                    <button onClick={copyToClipboard} className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.9rem' }}>📋 Copy</button>
                </div>

                <div className="responsive-flex">
                    {/* Pending Requests */}
                    <div className="glass-card" style={{ flex: 1, minWidth: '300px', border: '1px solid var(--accent-color)' }}>
                        <h3 style={{ color: 'var(--primary-color)' }}>Pending Requests ⏳</h3>
                        {requests.length === 0 ? <p style={{ color: '#666' }}>No pending requests.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {requests.map(req => (
                                    <li key={req._id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ textAlign: 'left' }}>
                                            <strong>{req.memberName}</strong><br />
                                            <span style={{ fontSize: '0.8rem', color: '#555' }}>{req.memberEmail}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button onClick={() => handleAccept(req._id)} style={{ background: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>✓</button>
                                            <button onClick={() => handleReject(req._id)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>✗</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Current Members */}
                    <div className="glass-card" style={{ flex: 1, minWidth: '300px', border: '1px solid var(--accent-color)' }}>
                        <h3 style={{ color: 'var(--primary-color)' }}>Current Members 👥</h3>
                        {members.length === 0 ? <p style={{ color: '#666' }}>No members yet.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {members.map((mem, idx) => (
                                    <li key={mem.uid || idx} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <strong>{mem.name}</strong> <span style={{ fontSize: '0.8rem', color: '#888' }}>({mem.role || 'Member'})</span><br />
                                            <span style={{ fontSize: '0.8rem', color: '#555' }}>{mem.email}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <button onClick={() => handleMuteMember(mem.email)} style={{ background: 'transparent', border: '1px solid orange', color: 'orange', borderRadius: '5px', cursor: 'pointer' }}>
                                                {mem.isMuted ? '🔇' : '🔊'}
                                            </button>
                                            <button onClick={() => handleRemoveMember(mem.email)} style={{ background: 'transparent', border: '1px solid red', color: 'red', borderRadius: '5px', cursor: 'pointer' }}>🗑️</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageTeamModal;

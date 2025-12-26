import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const ManageTeam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { teamCode, teamName } = location.state || {}; // Passed from dashboard
    const [requests, setRequests] = useState([]);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!teamCode) return;
        fetchMembersAndRequests();
    }, [teamCode]);

    const fetchMembersAndRequests = async () => {
        try {
            // Fetch requests
            const reqRes = await axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/member-requests/${teamCode}`);
            setRequests(reqRes.data.requests);

            // Fetch team details for members
            const teamRes = await axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/teams/${teamCode}`);
            setMembers(teamRes.data.team.members || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch data");
        }
    };

    const handleAccept = async (requestId) => {
        try {
            await axios.post(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/teams/${teamCode}/accept-member`, { requestId });
            fetchMembersAndRequests(); // Refresh
        } catch (err) {
            setError(err.response?.data?.error || "Failed to accept");
        }
    };

    const handleReject = async (requestId) => {
        try {
            await axios.put(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/member-requests/${requestId}/reject`);
            fetchMembersAndRequests(); // Refresh
        } catch (err) {
            setError("Failed to reject");
        }
    };

    return (
        <div className="splash-container" style={{ justifyContent: 'flex-start', padding: '2rem' }}>
            <button className="btn-primary" style={{ alignSelf: 'flex-start', marginBottom: '1rem', fontSize: '0.8rem' }} onClick={() => navigate(-1)}>← Back</button>
            <h2 style={{ color: 'var(--primary-color)', marginBottom: '2rem' }}>Manage Team: {teamName}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', width: '100%', maxWidth: '1000px' }}>
                {/* Pending Requests */}
                <div className="glass-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Pending Requests ⏳</h3>
                    {requests.length === 0 ? <p>No pending requests.</p> : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {requests.map(req => (
                                <li key={req._id} style={{ borderBottom: '1px solid var(--accent-color)', padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{req.memberName}</strong><br />
                                        <span style={{ fontSize: '0.8rem' }}>{req.memberEmail}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button onClick={() => handleAccept(req._id)} style={{ background: 'green', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>✓</button>
                                        <button onClick={() => handleReject(req._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>✗</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Current Members */}
                <div className="glass-card" style={{ flex: 1, minWidth: '300px' }}>
                    <h3>Current Members 👥</h3>
                    {members.length === 0 ? <p>No members yet.</p> : (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {members.map((mem, idx) => (
                                <li key={mem.uid || idx} style={{ borderBottom: '1px solid var(--accent-color)', padding: '1rem 0' }}>
                                    <strong>{mem.name}</strong><br />
                                    <span style={{ fontSize: '0.8rem' }}>{mem.email}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageTeam;

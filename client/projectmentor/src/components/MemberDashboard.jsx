import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const MemberDashboard = () => {
    // In a real app, we'd fetch these from Auth context or passed state after login
    // For now, let's assume valid login passes state or we fetch by hardcoded ID for demo if needed
    // But since flow is "Accept -> Member Dash Open", we might need a way to mock login or just show Dash
    // Let's use useLocation and fallback logic

    // User requested: "member daobr open in that dashnord ther eis one navbar in that there is team name code and select project is display"

    // State
    // State
    const navigate = useNavigate();
    const location = useLocation();

    // Try to get state from location, otherwise fallback to localStorage
    const savedSession = JSON.parse(localStorage.getItem('memberSession'));
    const initialState = location.state || savedSession || {};

    const { teamName, teamCode, memberName } = initialState;

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    const [submissions, setSubmissions] = useState([]);
    const [messages, setMessages] = useState([]);

    // Inputs
    const [workLink, setWorkLink] = useState('');
    const [workComment, setWorkComment] = useState('');
    const [chatMsg, setChatMsg] = useState('');
    const [loading, setLoading] = useState(true);

    const email = initialState.memberEmail || "test@example.com";

    // Redirect if no session found
    useEffect(() => {
        if (!teamCode || !email) {
            // alert("Session expired. Please login again.");
            // navigate('/join-team'); 
            // Commented out for dev smoothness, but in prod we should redirect
        }
    }, [teamCode, email, navigate]);

    // Fetch Data
    useEffect(() => {
        if (!teamCode) return;

        const fetchData = async () => {
            try {
                // 1. Project
                const pRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/team/${teamCode}`);
                if (pRes.data.success) setProject(pRes.data.project);

                // 2. Tasks
                const tRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/tasks/team/${teamCode}`);
                if (tRes.data.success) {
                    const allTasks = tRes.data.tasks || [];
                    setTasks(allTasks);
                    // Filter "My Tasks"
                    setMyTasks(allTasks.filter(t => t.assignedTo && t.assignedTo.email === email));
                }

                // 3. Submissions (for history)
                const sRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/submissions/${teamCode}`);
                if (sRes.data.success) setSubmissions(sRes.data.submissions);

                // 4. Messages
                const mRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/messages/${teamCode}`);
                if (mRes.data.success) setMessages(mRes.data.messages);

            } catch (err) {
                console.error("Error fetching data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // Poll for chat every 5s
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);

    }, [teamCode, email]);

    // Actions
    const handleStartTask = async (taskId) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}`, { status: 'in-progress' });
            // Refresh tasks locally
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: 'in-progress' } : t));
            setMyTasks(myTasks.map(t => t._id === taskId ? { ...t, status: 'in-progress' } : t));
        } catch (err) { alert("Failed to start task"); }
    };

    const handleMarkDone = async (taskId) => {
        if (!window.confirm("Mark this task as completed?")) return;
        try {
            await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tasks/${taskId}`, { status: 'completed' }); // Or 'submitted' if you prefer
            // Refresh tasks locally
            setTasks(tasks.map(t => t._id === taskId ? { ...t, status: 'completed' } : t));
            setMyTasks(myTasks.map(t => t._id === taskId ? { ...t, status: 'completed' } : t));
        } catch (err) { alert("Failed to mark done"); }
    };

    const handleSubmitWork = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/submissions`, {
                teamCode,
                member: { name: memberName, email },
                workLink,
                comments: workComment,
                taskId: null // General submission or link to selected task
            });
            alert("Work Submitted Successfully! 🚀");
            setWorkLink('');
            setWorkComment('');
        } catch (err) {
            alert("Submission failed");
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatMsg.trim()) return;
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/messages`, {
                teamCode,
                sender: { name: memberName, email },
                content: chatMsg
            });
            setChatMsg('');
            // Optimistic update
            setMessages([...messages, { sender: { name: memberName }, content: chatMsg, timestamp: new Date() }]);
        } catch (err) { console.error(err); }
    };

    // Calculations
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    if (!teamCode) return <div className="splash-container"><h2>Access Denied</h2></div>;

    return (
        <div className="splash-container" style={{ justifyContent: 'flex-start', padding: '2rem', height: 'auto', minHeight: '100vh' }}>

            {/* 🔝 Top Section */}
            <nav className="glass-card responsive-nav" style={{
                width: '100%',
                maxWidth: '1200px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                padding: '1rem',
                gap: '1rem'
            }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Team</span>
                        <h3 style={{ margin: 0, color: 'var(--primary-color)', fontSize: '1.2rem' }}>{teamName}</h3>
                    </div>
                    {project && (
                        <div style={{ paddingLeft: '2rem', borderLeft: '1px solid rgba(0,0,0,0.1)' }}>
                            <span style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Project</span>
                            <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{project.projectName}</h4>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '0.8rem', color: '#666' }}>Logged in as</span>
                        <h4 style={{ margin: 0, color: 'var(--primary-color)' }}>{memberName} 👤</h4>
                    </div>
                    <button
                        onClick={() => navigate('/role-selection')}
                        style={{
                            background: '#ff6b6b',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            transition: 'background 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#ff4c4c'}
                        onMouseOut={(e) => e.target.style.background = '#ff6b6b'}
                    >
                        Logout ➔
                    </button>
                </div>
            </nav>

            {loading ? <p>Loading Dashboard...</p> : (
                <div className="member-dashboard-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* LEFT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* 🧩 Section 1: Project Overview */}
                        <div className="glass-card" style={{ textAlign: 'left' }}>
                            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🧩 Project Overview</h2>
                            {project ? (
                                <div>
                                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                        <span className="tag">🏷️ {project.domain}</span>
                                        <span className="tag">🏆 {project.type}</span>
                                        <span className="tag">⭐ {project.skillLevel}</span>
                                    </div>
                                    <p><strong>Problem:</strong> {project.description.split('\n')[0]}</p>
                                    <p style={{ marginTop: '10px' }}><strong>Goal:</strong> Create a full-stack solution with listed key features.</p>
                                </div>
                            ) : (
                                <p>No project locked yet.</p>
                            )}
                        </div>

                        {/* 🗺️ Section 2: My Assigned Tasks */}
                        <div className="glass-card" style={{ textAlign: 'left' }}>
                            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>🗺️ My Assigned Tasks</h2>
                            {myTasks.length === 0 ? <p>No tasks assigned to you explicitly.</p> : (
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {myTasks.map(task => (
                                        <div key={task._id} style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid orange' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h4>{task.title}</h4>
                                                <span style={{ fontSize: '0.8rem', background: '#ffeeba', padding: '2px 8px', borderRadius: '10px' }}>{task.status}</span>
                                            </div>
                                            <p style={{ fontSize: '0.9rem', color: '#666' }}>{task.description}</p>
                                            <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                                                {task.status === 'pending' && (
                                                    <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '5px 10px' }} onClick={() => handleStartTask(task._id)}>▶ Start</button>
                                                )}
                                                {task.status !== 'completed' && (
                                                    <button onClick={() => handleMarkDone(task._id)} style={{ fontSize: '0.8rem', padding: '5px 10px', background: 'transparent', border: '1px solid green', color: 'green', borderRadius: '5px', cursor: 'pointer' }}>✔ Mark Done</button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 📤 Section 3: Submit Work */}
                        <div className="glass-card" style={{ textAlign: 'left' }}>
                            <h2 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>📤 Submit Work</h2>
                            <form onSubmit={handleSubmitWork} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input
                                    type="text"
                                    placeholder="GitHub Link or File URL"
                                    value={workLink}
                                    onChange={(e) => setWorkLink(e.target.value)}
                                    required
                                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #add' }}
                                />
                                <textarea
                                    placeholder="Optional comments..."
                                    value={workComment}
                                    onChange={(e) => setWorkComment(e.target.value)}
                                    rows="2"
                                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #add' }}
                                />
                                <button className="btn-primary">🚀 Submit Work</button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* 📊 Section 4: Team Progress */}
                        <div className="glass-card">
                            <h3>📊 Team Progress</h3>
                            <div style={{ width: '100%', background: '#ddd', height: '20px', borderRadius: '10px', overflow: 'hidden', margin: '1rem 0' }}>
                                <div style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4caf50, #8bc34a)', height: '100%' }}></div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                <span>Completed: <strong>{completedTasks}</strong></span>
                                <span>Total: <strong>{totalTasks}</strong></span>
                            </div>
                            <h1 style={{ marginTop: '1rem', color: 'var(--primary-color)' }}>{progress}%</h1>
                        </div>

                        {/* 💬 Section 5: Team Communication */}
                        <div className="glass-card" style={{ height: '450px', display: 'flex', flexDirection: 'column' }}>
                            <h3>💬 Team Chat</h3>

                            {/* Pinned Messages */}
                            {messages.some(m => m.isPinned) && (
                                <div style={{ background: '#fff3cd', padding: '8px', borderRadius: '5px', marginBottom: '10px', fontSize: '0.85rem' }}>
                                    <strong style={{ display: 'block', marginBottom: '3px' }}>📌 Pinned Updates:</strong>
                                    {messages.filter(m => m.isPinned).map(m => (
                                        <div key={m._id} style={{ marginBottom: '2px' }}>- {m.content}</div>
                                    ))}
                                </div>
                            )}

                            <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(0,0,0,0.02)', padding: '10px', borderRadius: '5px', marginBottom: '10px', textAlign: 'left' }}>
                                {messages.length === 0 ? <p style={{ fontSize: '0.8rem', color: '#ccc' }}>No messages yet.</p> : (
                                    messages.map((msg, i) => (
                                        <div key={i} style={{ marginBottom: '10px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <strong style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>{msg.sender.name}</strong>
                                                {msg.isPinned && <span style={{ fontSize: '0.7rem' }}>📌</span>}
                                            </div>
                                            <p style={{ margin: '2px 0', fontSize: '0.9rem' }}>{msg.content}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                            <form onSubmit={handleSendMessage} style={{ display: 'flex' }}>
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={chatMsg}
                                    onChange={(e) => setChatMsg(e.target.value)}
                                    style={{ flex: 1, padding: '8px', borderRadius: '5px 0 0 5px', border: '1px solid #ccc' }}
                                />
                                <button style={{ padding: '8px 15px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '0 5px 5px 0' }}>➤</button>
                            </form>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default MemberDashboard;

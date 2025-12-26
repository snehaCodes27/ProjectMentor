import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectWorkspaceModal = ({ show, onClose, teamCode, projectDetails, initialTab = 'details', members }) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    // Task State
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [assignedMember, setAssignedMember] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [taskPhase, setTaskPhase] = useState('Phase 1');

    // Chat State
    const [messages, setMessages] = useState([]);
    const [chatMsg, setChatMsg] = useState('');

    // Submissions State
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        if (show) {
            setActiveTab(initialTab);
            fetchTasks(); // Always fetch tasks for counts etc
        }
    }, [show, initialTab, teamCode]);

    useEffect(() => {
        if (show) {
            if (activeTab === 'submitted') fetchSubmissions();
            if (activeTab === 'chat') fetchMessages();
            if (activeTab === 'tasks') fetchTasks();
        }
    }, [activeTab, show, teamCode]);

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/tasks/team/${teamCode}`);
            if (res.data.success) setTasks(res.data.tasks || []);
        } catch (err) { console.error(err); }
    };

    const fetchSubmissions = async () => {
        try {
            const res = await axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/submissions/${teamCode}`);
            if (res.data.success) setSubmissions(res.data.submissions);
        } catch (err) { console.error(err); }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/messages/${teamCode}`);
            if (res.data.success) setMessages(res.data.messages);
        } catch (err) { console.error(err); }
    };

    // --- Task Handlers ---

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const newTask = {
                teamCode,
                title: taskTitle,
                description: taskDesc,
                assignedTo: assignedMember ? JSON.parse(assignedMember) : null,
                deadline: taskDeadline,
                phase: taskPhase
            };
            await axios.post(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/tasks`, newTask);
            alert('Task assigned!');
            setTaskTitle(''); setTaskDesc(''); setAssignedMember(''); setTaskDeadline('');
            fetchTasks();
        } catch (err) {
            alert('Failed to create task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Delete this task?")) return;
        try {
            await axios.delete(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/tasks/${taskId}`);
            fetchTasks();
        } catch (err) { alert("Failed to delete task"); }
    };

    const handleEditTask = async (task) => {
        const newTitle = prompt("Edit Task Title:", task.title);
        if (newTitle === null) return;
        const newDesc = prompt("Edit Description:", task.description);
        if (newDesc === null) return;

        try {
            await axios.put(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/tasks/${task._id}`, { title: newTitle, description: newDesc });
            fetchTasks();
        } catch (err) { alert("Failed to update task"); }
    };

    // --- Chat Handlers ---

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!chatMsg.trim()) return;
        try {
            await axios.post(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/messages`, {
                teamCode,
                sender: { name: 'Leader (You)', email: 'leader@admin.com' }, // In real app, get from auth context
                content: chatMsg
            });
            setChatMsg('');
            fetchMessages();
        } catch (err) { console.error(err); }
    };

    const handlePinMessage = async (msgId) => {
        try { await axios.put(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/messages/${msgId}/pin`); fetchMessages(); }
        catch (err) { alert("Failed to pin"); }
    };

    const handleDeleteMessage = async (msgId) => {
        if (!window.confirm("Delete this message?")) return;
        try { await axios.delete(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/messages/${msgId}`); fetchMessages(); }
        catch (err) { alert("Failed to delete"); }
    };

    const handleFileUpload = () => {
        alert("📎 File Selection Dialog (Simulated)\n\nIn a real app, this would open a file picker and upload to storage.");
    };

    // --- Workspace Details Handlers ---



    if (!show) return null;

    const renderContent = () => {
        switch (activeTab) {
            case 'details':
                return (
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2>📊 Project Details</h2>
                        </div>

                        {projectDetails ? (
                            <div>
                                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.4rem' }}>{projectDetails.projectName}</h3>
                                <div style={{ margin: '1rem 0' }}>
                                    <span className="tag">{projectDetails.domain}</span>
                                    <span className="tag">{projectDetails.type}</span>
                                </div>
                                <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6', color: '#444' }}>{projectDetails.description}</p>
                            </div>
                        ) : <p>Loading...</p>}
                    </div>
                );
            case 'tasks':
                return (
                    <div style={{ textAlign: 'left' }}>
                        <h2>🗂️ Task & Roadmap Manager</h2>
                        {/* Task Creation Form */}
                        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--accent-color)' }}>
                            <h3>➕ Create New Task</h3>
                            <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <input placeholder="Task Title" value={taskTitle} onChange={e => setTaskTitle(e.target.value)} required style={{ padding: '10px' }} />
                                <textarea placeholder="Description" value={taskDesc} onChange={e => setTaskDesc(e.target.value)} required style={{ padding: '10px', minHeight: '80px' }} />

                                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Assign To:</label>
                                        <select value={assignedMember} onChange={e => setAssignedMember(e.target.value)} style={{ width: '100%', padding: '10px' }}>
                                            <option value="">-- Unassigned --</option>
                                            {members.map(m => <option key={m.email} value={JSON.stringify(m)}>{m.name}</option>)}
                                        </select>
                                    </div>

                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Deadline:</label>
                                        <input
                                            type="date"
                                            value={taskDeadline}
                                            onChange={(e) => setTaskDeadline(e.target.value)}
                                            style={{ width: '100%', padding: '10px' }}
                                            required
                                        />
                                    </div>

                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: '#666' }}>Phase:</label>
                                        <select value={taskPhase} onChange={e => setTaskPhase(e.target.value)} style={{ width: '100%', padding: '10px' }}>
                                            <option>Phase 1</option>
                                            <option>Phase 2</option>
                                            <option>Phase 3</option>
                                        </select>
                                    </div>
                                </div>
                                <button className="btn-primary" style={{ alignSelf: 'flex-start', padding: '10px 30px' }}>+ Assign Task</button>
                            </form>
                        </div>
                        {/* Tasks List */}
                        <h3>📋 Roadmap</h3>
                        {tasks.length === 0 ? <p>No tasks yet.</p> : (
                            <div style={{ display: 'grid', gap: '10px' }}>
                                {tasks.map(t => (
                                    <div key={t._id} style={{ background: '#fff', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <strong>{t.title}</strong>
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                                <span style={{ fontSize: '0.8rem', background: '#eee', padding: '2px 6px', borderRadius: '4px', marginRight: '10px' }}>{t.status}</span>
                                                <button onClick={() => handleEditTask(t)} style={{ fontSize: '0.9rem', cursor: 'pointer', border: 'none', background: 'transparent' }}>✏️</button>
                                                <button onClick={() => handleDeleteTask(t._id)} style={{ fontSize: '0.9rem', cursor: 'pointer', border: 'none', background: 'transparent', color: 'red' }}>🗑️</button>
                                            </div>
                                        </div>
                                        <p style={{ fontSize: '0.9rem', color: '#666', margin: '5px 0' }}>{t.description}</p>
                                        <div style={{ fontSize: '0.8rem', color: '#888', display: 'flex', gap: '1rem' }}>
                                            <span>👤 {t.assignedTo?.name || 'Unassigned'}</span>
                                            <span>📅 {t.deadline ? new Date(t.deadline).toLocaleDateString() : 'No Deadline'}</span>
                                            <span>🚩 {t.phase}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case 'chat':
                const pinnedMessages = messages.filter(m => m.isPinned);
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <h2>💬 Team Chat</h2>
                        {/* Pinned Messages */}
                        {pinnedMessages.length > 0 && (
                            <div style={{ background: '#fff3cd', padding: '10px', borderRadius: '5px', marginBottom: '1rem', borderLeft: '4px solid #ffc107' }}>
                                <h4 style={{ margin: '0 0 5px 0' }}>📌 Pinned</h4>
                                {pinnedMessages.map(m => (
                                    <div key={m._id} style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                                        <strong>{m.sender.name}: </strong> {m.content}
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{ flex: 1, overflowY: 'auto', background: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '10px', marginBottom: '1rem' }}>
                            {messages.map(msg => (
                                <div key={msg._id} className="message-bubble" style={{ marginBottom: '1rem', padding: '10px', background: '#fff', borderRadius: '8px', position: 'relative' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <strong>{msg.sender.name} {msg.isPinned && '📌'}</strong>
                                        <span style={{ fontSize: '0.8rem', color: '#888' }}>{new Date(msg.timestamp).toLocaleTimeString()}</span>
                                    </div>
                                    <p style={{ margin: '5px 0' }}>{msg.content}</p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                        <button onClick={() => handlePinMessage(msg._id)} style={{ fontSize: '0.8rem', border: 'none', background: 'transparent', cursor: 'pointer', color: '#007bff' }}>
                                            {msg.isPinned ? 'Unpin' : 'Pin'}
                                        </button>
                                        <button onClick={() => handleDeleteMessage(msg._id)} style={{ fontSize: '0.8rem', border: 'none', background: 'transparent', cursor: 'pointer', color: 'red' }}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button type="button" onClick={handleFileUpload} style={{ fontSize: '1.2rem', padding: '10px', cursor: 'pointer', background: '#e3f2fd', border: 'none', borderRadius: '5px' }}>
                                📎
                            </button>
                            <input
                                value={chatMsg}
                                onChange={e => setChatMsg(e.target.value)}
                                placeholder="Type a message..."
                                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <button className="btn-primary">Send ➤</button>
                        </form>
                    </div>
                );
            case 'submitted':
                return (
                    <div>
                        <h2>📥 Member Submitted Work</h2>
                        <p>Review work submitted by your team members.</p>
                        {submissions.length === 0 ? <p>No submissions found.</p> : (
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {submissions.map(sub => {
                                    const task = tasks.find(t => t._id === sub.taskId);
                                    return (
                                        <li key={sub._id} style={{ background: '#fff', padding: '15px', marginBottom: '10px', borderRadius: '8px', borderLeft: '4px solid var(--secondary-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                <div>
                                                    <h4 style={{ margin: '0 0 5px 0', color: 'var(--primary-color)' }}>{task ? task.title : 'General Submission'}</h4>
                                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
                                                        Submitted by <strong>{sub.member?.name || 'Unknown'}</strong> on {new Date(sub.createdAt).toLocaleDateString()}
                                                    </p>
                                                    {sub.comments && <p style={{ margin: '8px 0 0 0', fontSize: '0.9rem', fontStyle: 'italic', color: '#555' }}>"{sub.comments}"</p>}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                                                    <span style={{
                                                        fontSize: '0.8rem', padding: '4px 10px', borderRadius: '20px', fontWeight: 'bold',
                                                        background: sub.status === 'reviewed' ? '#dcfce7' : '#fef3c7',
                                                        color: sub.status === 'reviewed' ? '#166534' : '#92400e'
                                                    }}>
                                                        {sub.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                                                    </span>
                                                    <a href={sub.workLink} target="_blank" rel="noopener noreferrer"
                                                        style={{ color: 'var(--secondary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                        View Work ↗
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                );

            default:
                return <div>Select an option</div>;
        }
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center',
            zIndex: 1000, backdropFilter: 'blur(8px)'
        }}>
            <div className="glass-card" style={{
                width: '95%', maxWidth: '1200px', height: '90%',
                display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden',
                position: 'relative'
            }}>
                <style>
                    {`
                        .workspace-sidebar button {
                            margin-bottom: 10px;
                            width: 100%;
                            text-align: left;
                            padding: 12px 15px;
                            border-radius: 8px;
                            transition: all 0.2s;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            font-size: 1rem;
                        }
                        .workspace-sidebar button:hover {
                            background: rgba(20, 184, 166, 0.1) !important;
                            transform: translateX(5px);
                        }
                    `}
                </style>
                <div className="workspace-container" style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
                    {/* Sidebar */}
                    <div className="workspace-sidebar" style={{
                        width: '250px', height: '100%', background: 'rgba(255, 255, 255, 0.5)',
                        borderRight: '1px solid var(--accent-color)', display: 'flex', flexDirection: 'column',
                        padding: '1.5rem', overflowY: 'auto'
                    }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary-color)', textAlign: 'center' }}>Workspace</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                            <button
                                onClick={() => setActiveTab('details')}
                                style={{
                                    background: activeTab === 'details' ? 'var(--primary-color)' : 'transparent',
                                    color: activeTab === 'details' ? 'white' : '#555',
                                    border: 'none', fontWeight: '600'
                                }}
                            >
                                ℹ️ Project Details
                            </button>
                            <button
                                onClick={() => setActiveTab('tasks')}
                                style={{
                                    background: activeTab === 'tasks' ? 'var(--primary-color)' : 'transparent',
                                    color: activeTab === 'tasks' ? 'white' : '#555',
                                    border: 'none', fontWeight: '600'
                                }}
                            >
                                🗂️ Tasks & Roadmap
                            </button>
                            <button
                                onClick={() => setActiveTab('chat')}
                                style={{
                                    background: activeTab === 'chat' ? 'var(--primary-color)' : 'transparent',
                                    color: activeTab === 'chat' ? 'white' : '#555',
                                    border: 'none', fontWeight: '600'
                                }}
                            >
                                💬 Team Chat
                            </button>
                            <button
                                onClick={() => setActiveTab('submitted')}
                                style={{
                                    background: activeTab === 'submitted' ? 'var(--primary-color)' : 'transparent',
                                    color: activeTab === 'submitted' ? 'white' : '#555',
                                    border: 'none', fontWeight: '600'
                                }}
                            >
                                📥 Submissions
                            </button>

                            <hr style={{ margin: '1rem 0', borderColor: '#eee' }} />

                            <button onClick={onClose} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', fontWeight: '600' }}>
                                🚪 Close Workspace
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="workspace-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto', position: 'relative' }}>

                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectWorkspaceModal;

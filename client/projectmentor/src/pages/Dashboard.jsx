import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FolderKanban, User, Users, Sparkles, FolderPlus, CheckCircle, Clock, Rocket, Plus, X, ArrowRight, Layout, Smartphone, Brain, Laptop, Terminal, BadgeCheck, Mail, Calendar, LogOut } from 'lucide-react';
import './Dashboard.css';
import { API_URL } from '../config';
import ManageTeamModal from '../components/ManageTeamModal';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState('home');
    const [workspaces, setWorkspaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [managingWorkspace, setManagingWorkspace] = useState(null);
    const navigate = useNavigate();

    // Get user profile from localStorage
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userName = userProfile.name || 'Student';
    const userEmail = userProfile.email || '';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        const fetchWorkspaces = async () => {
            if (!userEmail) return;
            try {
                const response = await fetch(`${API_URL}/api/workspaces/user/${userEmail}`);
                const data = await response.json();
                if (data.success) {
                    setWorkspaces(data.workspaces);
                }
            } catch (error) {
                console.error('Error fetching workspaces:', error);
                // Fallback to localStorage if server is down
                const localWorkspaces = JSON.parse(localStorage.getItem('workspaces') || '[]');
                setWorkspaces(localWorkspaces);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkspaces();
    }, [userEmail]);

    const stats = [
        {
            icon: FolderKanban,
            title: 'Total Projects',
            count: workspaces.length,
            gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#667eea'
        },
        {
            icon: CheckCircle,
            title: 'Completed',
            count: workspaces.filter(w => w.status === 'completed' || (w.currentStep >= 11)).length,
            gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            color: '#43e97b'
        },
        {
            icon: Clock,
            title: 'In Progress',
            count: workspaces.filter(w => (w.status === 'active' || !w.status) && (w.currentStep < 11 || !w.currentStep)).length,
            gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            color: '#fa709a'
        }
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeContent userName={userName} stats={stats} />;
            case 'projects':
                return <ProjectsContent workspaces={workspaces} loading={loading} />;
            case 'team':
                return <TeamContent workspaces={workspaces} onManage={setManagingWorkspace} />;
            case 'profile':
                return <ProfileContent userProfile={userProfile} onLogout={handleLogout} />;
            default:
                return <HomeContent userName={userName} stats={stats} />;
        }
    };

    return (
        <div className="dashboard">
            <div className="dashboard-content">
                {renderContent()}
            </div>

            {managingWorkspace && (
                <ManageTeamModal
                    workspace={managingWorkspace}
                    currentUserEmail={userEmail}
                    onClose={() => setManagingWorkspace(null)}
                    onUpdate={(updatedWs) => {
                        setWorkspaces(prev => prev.map(w => w._id === updatedWs._id ? updatedWs : w));
                        setManagingWorkspace(updatedWs);
                    }}
                />
            )}

            <nav className="bottom-nav">
                <button
                    className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => setActiveTab('home')}
                >
                    <Home size={24} />
                    <span>Home</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    <FolderKanban size={24} />
                    <span>Projects</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'team' ? 'active' : ''}`}
                    onClick={() => setActiveTab('team')}
                >
                    <Users size={24} />
                    <span>Team</span>
                </button>
                <button
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <User size={24} />
                    <span>Profile</span>
                </button>
            </nav>
        </div>
    );
}

function HomeContent({ userName, stats }) {
    return (
        <div className="home-content">
            <div className="welcome-header">
                <div className="welcome-text">
                    <h1 className="dashboard-title">
                        Welcome back, <span className="text-gradient">{userName}</span>! 👋
                    </h1>
                    <p className="dashboard-subtitle">Ready to build something amazing today?</p>
                </div>
                <div className="project-name-badge">
                    <Sparkles size={20} />
                    <span>Project Mentor</span>
                </div>
            </div>

            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="stat-icon" style={{ background: stat.gradient }}>
                            <stat.icon size={28} strokeWidth={2} />
                        </div>
                        <div className="stat-info">
                            <h3 className="stat-count">{stat.count}</h3>
                            <p className="stat-title">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectsContent({ workspaces, loading }) {
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const getPlatformIcon = (platform) => {
        switch (platform?.toLowerCase()) {
            case 'web': return <Layout size={20} />;
            case 'mobile': return <Smartphone size={20} />;
            case 'ai/ml': return <Brain size={20} />;
            case 'desktop': return <Laptop size={20} />;
            default: return <Terminal size={20} />;
        }
    };

    return (
        <div className="projects-content animation-slide-up">
            <div className="projects-header">
                <div>
                    <h2 className="section-title">Your Projects</h2>
                    <p className="dashboard-subtitle">Manage and continue your development journeys</p>
                </div>
                <button className="btn btn-primary create-btn" onClick={() => setShowCreateModal(true)}>
                    <FolderPlus size={20} />
                    New Workspace
                </button>
            </div>

            {loading ? (
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading your workspaces...</p>
                </div>
            ) : workspaces.length > 0 ? (
                <div className="projects-grid">
                    {workspaces.map((ws, index) => (
                        <div key={ws._id || ws.id || index} className="workspace-card-premium" onClick={() => navigate(`/workspace/${ws._id || ws.id}`)}>
                            <div className="ws-card-header">
                                <div className={`ws-platform-badge ${ws.platform?.toLowerCase()}`}>
                                    {getPlatformIcon(ws.platform)}
                                    <span>{ws.platform || 'General'}</span>
                                </div>
                                <div className={`ws-type-tag ${ws.type}`}>
                                    {ws.type === 'team' ? <Users size={14} /> : <User size={14} />}
                                    {ws.type}
                                </div>
                            </div>

                            <h3 className="ws-card-title">{ws.teamName}</h3>
                            <p className="ws-card-year">{ws.year}</p>

                            <div className="ws-card-footer">
                                <div className="ws-progress-info">
                                    <div className="ws-progress-bar">
                                        <div className="ws-progress-fill" style={{ width: (ws.status === 'completed' || ws.currentStep >= 11) ? '100%' : `${Math.max(5, (ws.currentStep || 0) * 9.1)}%` }}></div>
                                    </div>
                                    <span className="ws-status-text">{(ws.status === 'completed' || ws.currentStep >= 11) ? 'Completed' : 'In Progress'}</span>
                                </div>
                                <div className="ws-action-circle">
                                    <ArrowRight size={18} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">
                        <FolderKanban size={64} strokeWidth={1.5} />
                    </div>
                    <h3 className="empty-title">No projects yet</h3>
                    <p className="empty-desc">Start your first project and let AI guide you to success!</p>
                    <button className="btn btn-secondary" onClick={() => setShowCreateModal(true)}>
                        <Sparkles size={20} />
                        Start New Project
                    </button>
                </div>
            )}

            {showCreateModal && <CreateWorkspaceModal onClose={() => setShowCreateModal(false)} />}
        </div>
    );
}

function ProfileContent({ userProfile, onLogout }) {
    const isVerified = !!userProfile.googleId || !!userProfile.emailVerified || true;

    return (
        <div className="profile-content animation-slide-up">
            <div className="profile-header">
                <h2 className="section-title">Account Profile</h2>
            </div>

            <div className="profile-card-premium glass-container">
                <div className="profile-cover-gradient"></div>

                <div className="profile-main-info">
                    <div className="profile-avatar-premium">
                        {userProfile.profilePic ? (
                            <img src={userProfile.profilePic} alt="Profile" className="avatar-img" />
                        ) : (
                            <User size={60} />
                        )}
                        {isVerified && (
                            <div className="verified-badge-main" title="Verified Profile">
                                <BadgeCheck size={20} fill="var(--primary)" color="white" />
                            </div>
                        )}
                    </div>

                    <div className="profile-name-section">
                        <h2 className="profile-display-name">
                            {userProfile.name || 'Student'}
                        </h2>
                        <div className="profile-meta-tags">
                            <span className="profile-email-sub">
                                <Mail size={14} />
                                {userProfile.email}
                            </span>
                            {isVerified && (
                                <span className="verified-tag">
                                    <BadgeCheck size={14} />
                                    Verified Profile
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-details-grid">
                    <div className="profile-info-box">
                        <div className="info-icon-box branch">
                            <Layout size={20} />
                        </div>
                        <div className="info-text">
                            <span className="info-label">Current Branch</span>
                            <span className="info-value">{userProfile.branch || 'Not specified'}</span>
                        </div>
                    </div>

                    <div className="profile-info-box acad-year">
                        <div className="info-icon-box calendar">
                            <Calendar size={20} />
                        </div>
                        <div className="info-text">
                            <span className="info-label">Academic Year</span>
                            <span className="info-value">{userProfile.year || 'Not specified'}</span>
                        </div>
                    </div>

                    <div className="profile-info-box status">
                        <div className="info-icon-box verify">
                            <BadgeCheck size={20} />
                        </div>
                        <div className="info-text">
                            <span className="info-label">Account Status</span>
                            <span className="info-value status-verified">Verified Scholar</span>
                        </div>
                    </div>

                    <div className="profile-info-box logout-box" onClick={onLogout}>
                        <div className="info-icon-box logout">
                            <LogOut size={20} />
                        </div>
                        <div className="info-text">
                            <span className="info-label">System Access</span>
                            <span className="info-value text-danger">Logout Session</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TeamContent({ workspaces, onManage }) {
    const teamWorkspaces = workspaces?.filter(ws => ws.type === 'team') || [];

    return (
        <div className="team-content animation-slide-up">
            <div className="welcome-header">
                <div>
                    <h2 className="section-title">My Team</h2>
                    <p className="dashboard-subtitle">Collaboration settings and colleague list</p>
                </div>
            </div>

            {teamWorkspaces.length > 0 ? (
                <div className="team-grid">
                    {teamWorkspaces.map((ws, index) => (
                        <div key={ws._id || index} className="team-card glass-container">
                            <div className="team-card-header">
                                <div className="team-avatar-group">
                                    <div className="team-avatar">
                                        <Users size={20} />
                                    </div>
                                    <div className="team-member-count">
                                        {(ws.members?.length || 0) + 1} Members
                                    </div>
                                </div>
                                <h3 className="team-card-title">{ws.teamName}</h3>
                            </div>
                            <div className="team-members-preview">
                                {ws.members?.slice(0, 3).map((m, i) => (
                                    <div key={i} className="mini-member-tag" title={m.email}>
                                        {m.email.split('@')[0]}
                                    </div>
                                ))}
                                {ws.members?.length > 3 && <div className="more-members">+{ws.members.length - 3} more</div>}
                            </div>
                            <button className="team-manage-btn" onClick={() => onManage(ws)}>
                                Manage Team
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <div className="empty-icon">
                        <Users size={64} strokeWidth={1.5} />
                    </div>
                    <h3 className="empty-title">Project Collaboration</h3>
                    <p className="empty-desc">You are not part of any team workspaces yet.</p>
                    <button className="btn btn-primary" onClick={() => {
                        const projectsBtn = document.querySelector('.nav-item:nth-child(2)');
                        if (projectsBtn) projectsBtn.click();
                    }}>
                        <Plus size={20} />
                        Join or Create Team
                    </button>
                </div>
            )}
        </div>
    );
}

function CreateWorkspaceModal({ onClose }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        teamName: '',
        year: '',
        platform: '',
        type: 'solo',
        members: []
    });
    const [memberEmail, setMemberEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addMember = () => {
        if (memberEmail && !formData.members.includes(memberEmail)) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)) {
                setFormData({ ...formData, members: [...formData.members, memberEmail] });
                setMemberEmail('');
            } else {
                setStatus({ type: 'error', message: 'Please enter a valid email' });
            }
        }
    };

    const removeMember = (email) => {
        setFormData({ ...formData, members: formData.members.filter(m => m !== email) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const userEmail = userProfile.email || '';

            const response = await fetch(`${API_URL}/api/workspaces`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, createdByEmail: userEmail })
            });

            const data = await response.json();
            console.log('Workspace Create Response:', data);

            if (data.success && data.workspace?._id) {
                setStatus({ type: 'success', message: '✅ Workspace created successfully!' });

                const workspaces = JSON.parse(localStorage.getItem('workspaces') || '[]');
                workspaces.push({
                    ...data.workspace,
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('workspaces', JSON.stringify(workspaces));

                setTimeout(() => {
                    onClose();
                    navigate(`/workspace/${data.workspace._id}`);
                }, 1500);
            } else {
                setStatus({ type: 'error', message: `❌ ${data.message || 'Failed to create workspace. No ID returned.'}` });
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus({ type: 'error', message: '❌ Server expansion error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content workspace-modal-card glass-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-icon-box">
                        <Rocket size={32} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="modal-title">New Workspace</h2>
                        <p className="modal-subtitle">Configure your project environment</p>
                    </div>
                    <button className="close-modal-btn" onClick={onClose}>×</button>
                </div>

                <form onSubmit={handleSubmit} className="workspace-form">
                    <div className="workspace-form-grid">
                        <div className="form-group full-width">
                            <label className="form-label">Team/Project Name</label>
                            <input
                                type="text"
                                name="teamName"
                                className="form-input"
                                placeholder="e.g. Innovators Group"
                                value={formData.teamName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Year of Study</label>
                            <select name="year" className="form-select" value={formData.year} onChange={handleChange} required>
                                <option value="">Select Year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Target Platform</label>
                            <select name="platform" className="form-select" value={formData.platform} onChange={handleChange} required>
                                <option value="">Select Platform</option>
                                <option value="Web">Web Application</option>
                                <option value="Mobile">Mobile App</option>
                                <option value="AI/ML">AI / Machine Learning</option>
                                <option value="IoT">Internet of Things</option>
                                <option value="Other">Other Category</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Workspace Mode</label>
                        <div className="type-selector-grid">
                            <div
                                className={`type-option ${formData.type === 'solo' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, type: 'solo' })}
                            >
                                <User size={24} />
                                <div>
                                    <div className="type-name">Solo</div>
                                    <div className="type-desc">Personal project</div>
                                </div>
                            </div>
                            <div
                                className={`type-option ${formData.type === 'team' ? 'active' : ''}`}
                                onClick={() => setFormData({ ...formData, type: 'team' })}
                            >
                                <Users size={24} />
                                <div>
                                    <div className="type-name">Team</div>
                                    <div className="type-desc">Group collaboration</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {formData.type === 'team' && (
                        <div className="form-group members-section">
                            <label className="form-label">Invite Members</label>
                            <div className="member-input-wrapper">
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="Enter colleague's email"
                                    value={memberEmail}
                                    onChange={(e) => setMemberEmail(e.target.value)}
                                />
                                <button type="button" className="add-member-btn" onClick={addMember}>
                                    <Plus size={20} />
                                </button>
                            </div>
                            {formData.members.length > 0 && (
                                <div className="members-badge-list">
                                    {formData.members.map((email, index) => (
                                        <div key={index} className="member-badge">
                                            <span>{email}</span>
                                            <button type="button" onClick={() => removeMember(email)}><X size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {status.message && (
                        <div className={`form-status-msg ${status.type}`}>
                            {status.message}
                        </div>
                    )}

                    <div className="modal-footer">
                        <button type="button" className="btn-secondary" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary-gradient" disabled={loading}>
                            {loading ? <div className="spinner-small"></div> : 'Create Workspace'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { auth } from '../firebase';
import ReportsView from './ReportsView';
import SettingsView from './SettingsView';
import DashboardHeader from './DashboardHeader';
import ManageTeamModal from './ManageTeamModal';
import GenerateProjectModal from './GenerateProjectModal';
import ProjectWorkspaceModal from './ProjectWorkspaceModal';
import TeamProgress from './TeamProgress';
import '../App.css';

const LeaderDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initial State from Login/Register
    const initialState = location.state || {
        teamName: 'Unknown',
        teamCode: 'XXXXXX',
        selectedProject: null,
        projectLocked: false
    };

    // Dashboard State
    const [teamName] = useState(initialState.teamName);
    const [teamCode] = useState(initialState.teamCode);
    const [selectedProject, setSelectedProject] = useState(initialState.selectedProject);
    const [projectLocked, setProjectLocked] = useState(initialState.projectLocked);

    // Data State
    const [projectDetails, setProjectDetails] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [members, setMembers] = useState([]);
    const [requests, setRequests] = useState([]);

    // Modals Control
    const [showManageTeamModal, setShowManageTeamModal] = useState(false);
    const [showSelectModal, setShowSelectModal] = useState(false);
    const [showWorkspace, setShowWorkspace] = useState(false);
    const [workspaceTab, setWorkspaceTab] = useState('details');
    const [showReports, setShowReports] = useState(false);
    const [showSettings, setShowSettings] = useState(false);

    // Fetch Status & Data
    useEffect(() => {
        if (!teamCode) return;

        // Fetch Project Status
        axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/projects/team/${teamCode}`)
            .then(res => {
                if (res.data.success && res.data.project) {
                    setProjectDetails(res.data.project);
                    setProjectLocked(true);
                    setSelectedProject(res.data.project.projectName);
                } else {
                    setProjectLocked(false);
                    setSelectedProject(null);
                }
            })
            .catch(err => console.error("Error fetching project:", err));

        // Fetch Tasks
        axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/tasks/team/${teamCode}`)
            .then(res => res.data.success && setTasks(res.data.tasks || []))
            .catch(console.error);

        // Fetch Members
        axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/teams/${teamCode}`)
            .then(res => res.data.success && setMembers(res.data.team.members || []))
            .catch(console.error);

    }, [teamCode, showWorkspace]); // Refresh when workspace closes as well?

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
        }
    };

    const handleProjectLocked = (title) => {
        setProjectLocked(true);
        setSelectedProject(title);
        // Refresh project details immediately
        axios.get(`https://bored-lauraine-snehamatkar-8f7530b0.koyeb.app/projects/team/${teamCode}`)
            .then(r => r.data.success && setProjectDetails(r.data.project));
    };

    const openWorkspace = (tab) => {
        if (!projectLocked) {
            alert("Please generate and lock a project first!");
            setShowSelectModal(true);
            return;
        }
        setWorkspaceTab(tab);
        setShowWorkspace(true);
    };


    return (
        <div className="splash-container" style={{ justifyContent: 'flex-start', padding: '2rem', height: 'auto', minHeight: '100vh', overflowY: 'auto' }}>

            {/* 🔝 HEADER */}
            <DashboardHeader
                teamName={teamName}
                teamCode={teamCode}
                memberCount={members.length}
                projectTitle={selectedProject}
                onOpenSettings={() => setShowSettings(true)}
            />

            {/* 🎛️ MAIN GRID LAYOUT */}
            {/* 🎛️ MAIN GRID LAYOUT */}
            <div className="dashboard-grid" style={{
                maxWidth: '1200px',
                margin: '0 auto' // Center the grid
            }}>

                {/* 1. Manage Team */}
                <div className="glass-card" onClick={() => setShowManageTeamModal(true)} style={{ cursor: 'pointer', borderLeft: '5px solid #ff6b6b' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>👥 Manage Team</h3>
                        <span style={{ fontSize: '1.5rem' }}>⚙️</span>
                    </div>
                    <p style={{ color: '#666' }}>{requests.length > 0 ? `${requests.length} Pending Requests` : 'Manage members & roles'}</p>
                </div>

                {/* 2. Generate Project */}
                <div className="glass-card" onClick={() => !projectLocked && setShowSelectModal(true)} style={{ cursor: projectLocked ? 'default' : 'pointer', borderLeft: '5px solid #2196f3', opacity: projectLocked ? 0.7 : 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>🎲 Project Idea</h3>
                        <span style={{ fontSize: '1.5rem' }}>🚀</span>
                    </div>
                    <p style={{ color: '#666' }}>{projectLocked ? 'Project Locked' : 'Generate & Select AI Project'}</p>
                </div>

                {/* 3. Project Workspace */}
                <div className="glass-card" onClick={() => openWorkspace('details')} style={{ cursor: 'pointer', borderLeft: '5px solid #4caf50' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>📂 Workspace</h3>
                        <span style={{ fontSize: '1.5rem' }}>🏢</span>
                    </div>
                    <p style={{ color: '#666' }}>View Details, Uploads & Links</p>
                </div>


                {/* 5. Team Progress */}
                <div className="glass-card" style={{ gridColumn: 'span 2', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>📈 Team Progress</h3>
                    <TeamProgress tasks={tasks} />
                </div>

                {/* 7. Reports */}
                <div className="glass-card" onClick={() => setShowReports(true)} style={{ cursor: 'pointer', borderLeft: '5px solid #00bcd4' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <h3 style={{ margin: 0 }}>📊 Reports</h3>
                        <span style={{ fontSize: '1.5rem' }}>📑</span>
                    </div>
                    <p style={{ color: '#666' }}>Performance & Contribution</p>
                </div>

            </div>

            {/* --- MODALS --- */}
            <ManageTeamModal
                show={showManageTeamModal}
                onClose={() => setShowManageTeamModal(false)}
                teamName={teamName}
                teamCode={teamCode}
                members={members}
                requests={requests}
                fetchMembersAndRequests={fetchMembersAndRequests}
            />

            <GenerateProjectModal
                show={showSelectModal}
                onClose={() => setShowSelectModal(false)}
                teamName={teamName}
                teamCode={teamCode}
                onProjectLocked={handleProjectLocked}
            />

            <ProjectWorkspaceModal
                show={showWorkspace}
                onClose={() => setShowWorkspace(false)}
                initialTab={workspaceTab}
                teamCode={teamCode}
                projectDetails={projectDetails}
                members={members}
            />

            {showReports && <ReportsView tasks={tasks} members={members} onClose={() => setShowReports(false)} />}

            {showSettings && <SettingsView teamCode={teamCode} teamName={teamName} onClose={() => setShowSettings(false)} />}

        </div>
    );
};

export default LeaderDashboard;

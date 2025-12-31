import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, Map, Terminal,
    Presentation, FileText, GraduationCap,
    Settings, Users, Share2, Rocket, ArrowLeft
} from 'lucide-react';
import { motion } from 'framer-motion';
import RoadmapTracker from './RoadmapTracker';
import PromptDesign from './PromptDesign';
import Documentation from './Documentation';
import PPTGeneration from './PPTGeneration';
import VivaIntelligence from './VivaIntelligence';
import './WorkspaceDashboard.css';

export default function WorkspaceDashboard({ workspace, onUpdate }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('roadmap');

    const tabs = [
        { id: 'roadmap', label: 'Build Roadmap', icon: Map },
        { id: 'prompts', label: 'Development Prompts', icon: Terminal },
        { id: 'docs', label: 'Documentation', icon: FileText },
        { id: 'ppt', label: 'Presentation Slides', icon: Presentation },
        { id: 'viva', label: 'Viva Preparation', icon: GraduationCap },
        { id: 'settings', label: 'Project Settings', icon: Settings },
    ];

    return (
        <div className="workspace-home">
            <aside className="ws-sidebar">
                <div className="ws-sidebar-header">
                    <div className="ws-logo">
                        <Rocket size={24} />
                        <span>ProjectMentor AI</span>
                    </div>
                </div>

                <nav className="ws-nav">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`ws-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <tab.icon size={20} />
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="ws-sidebar-footer">
                    <button className="invite-btn">
                        <Users size={18} />
                        <span>Team Members</span>
                    </button>
                    <button className="share-btn">
                        <Share2 size={18} />
                        <span>Share Project</span>
                    </button>
                </div>
            </aside>

            <main className="ws-main-content">
                <header className="ws-content-header">
                    <div className="header-left">
                        <button className="ws-back-btn" onClick={() => navigate('/dashboard')} title="Back to Dashboard">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="header-labels">
                            <span className="ws-breadcrumb">Workspace / {tabs.find(t => t.id === activeTab)?.label}</span>
                            <h2 className="ws-project-title">{workspace.projectTitle || workspace.teamName}</h2>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="project-status-pill">
                            <span className="dot"></span>
                            {workspace.status || 'Active Development'}
                        </div>
                    </div>
                </header>

                <div className="ws-scroll-area">
                    {activeTab === 'roadmap' && (
                        <RoadmapTracker
                            workspace={workspace}
                            onUpdate={onUpdate}
                        />
                    )}

                    {activeTab === 'prompts' && (
                        <PromptDesign
                            workspace={workspace}
                            onPromptsLocked={onUpdate}
                        />
                    )}

                    {activeTab === 'docs' && (
                        <Documentation
                            workspace={workspace}
                            onDocsLocked={onUpdate}
                        />
                    )}

                    {activeTab === 'ppt' && (
                        <PPTGeneration
                            workspace={workspace}
                            onSlidesLocked={onUpdate}
                        />
                    )}

                    {activeTab === 'viva' && (
                        <VivaIntelligence
                            workspace={workspace}
                            onVivaLocked={onUpdate}
                        />
                    )}

                    {activeTab === 'settings' && (
                        <div className="settings-placeholder glass-container">
                            <h3>Project DNA & Configuration</h3>
                            <p>Here you can update your tech stack, problem statement, or team name.</p>
                            <div className="dna-summary">
                                <div className="dna-item">
                                    <strong>Stack:</strong> {workspace.projectDNA?.techStack?.join(', ')}
                                </div>
                                <div className="dna-item">
                                    <strong>Complexity:</strong> {workspace.projectDNA?.complexity}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

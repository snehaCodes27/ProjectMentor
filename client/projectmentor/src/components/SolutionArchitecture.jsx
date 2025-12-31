import { useState, useEffect } from 'react';
import {
    Layers, Cpu, Server, Workflow, CheckCircle2, Lock,
    ArrowRight, Box, BrainCircuit, Activity, FileText, ChevronDown, ChevronUp, BookOpen, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './SolutionArchitecture.css';
import { API_URL } from '../config';

export default function SolutionArchitecture({ workspace, onSolutionLocked }) {
    const [loading, setLoading] = useState(true);
    const [solution, setSolution] = useState(null);
    const [expandedPapers, setExpandedPapers] = useState([]);
    const [forceRegenerate, setForceRegenerate] = useState(false);
    const [isLocked, setIsLocked] = useState(false);

    useEffect(() => {
        // Skip cached solution if forceRegenerate is true, or if no research papers in existing solution
        const hasResearchPapers = workspace.projectSolution?.researchPapers && workspace.projectSolution.researchPapers.length > 0;

        if (workspace.projectSolution && workspace.projectSolution.overview && !forceRegenerate && hasResearchPapers) {
            setSolution(workspace.projectSolution);
            setLoading(false);
            return;
        }

        const generateSolution = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_URL}/api/ai/generate-solution`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        dna: workspace.projectDNA,
                        topic: workspace.selectedTopic.title,
                        domain: workspace.selectedTopic.domain,
                        projectTitle: workspace.projectTitle
                    })
                });
                const data = await response.json();
                if (data.success) {
                    setSolution(data.solution);
                    setLoading(false);
                    setForceRegenerate(false);
                }
            } catch (error) {
                console.error('Error generating solution:', error);
                setLoading(false);
            }
        };

        generateSolution();
    }, [workspace, forceRegenerate]);

    const handleLock = async () => {
        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/select-solution`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ solution: solution })
            });
            const data = await response.json();
            if (data.success) {
                setIsLocked(true); // Hide regenerate button immediately
                onSolutionLocked(data.workspace);
            }
        } catch (error) {
            console.error('Error locking solution:', error);
        }
    };

    const downloadPapers = () => {
        if (!solution.researchPapers || solution.researchPapers.length === 0) return;

        // Create formatted content
        let content = `RESEARCH PAPER RECOMMENDATIONS\n`;
        content += `Project: ${workspace.projectTitle}\n`;
        content += `Domain: ${workspace.selectedTopic.domain}\n`;
        content += `Generated: ${new Date().toLocaleDateString()}\n`;
        content += `${'='.repeat(80)}\n\n`;

        solution.researchPapers.forEach((paper, idx) => {
            content += `${idx + 1}. ${paper.title}\n`;
            content += `${'-'.repeat(80)}\n`;
            content += `Authors: ${paper.authors.join(', ')}\n`;
            content += `Year: ${paper.year}\n\n`;
            content += `Relevance to Your Project:\n${paper.relevance}\n\n`;
            content += `Key Takeaway:\n${paper.keyTakeaway}\n\n`;
            content += `${'='.repeat(80)}\n\n`;
        });

        content += `\nTotal Papers: ${solution.researchPapers.length}\n`;
        content += `\nNote: These papers are AI-recommended based on your project's domain, problem statement, and tech stack.\n`;
        content += `Use these references to strengthen your literature review and project foundation.\n`;

        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Research_Papers_${workspace.projectTitle.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="solution-loader-container">
                <div className="architecture-spinner">
                    <Layers size={60} className="floating-layers" />
                </div>
                <h2 className="loading-txt">Designing Solution Architecture...</h2>
                <p className="loading-subtxt">Structuring modules, user flow, and AI logic.</p>
            </div>
        );
    }

    return (
        <div className="solution-container">
            <div className="step-header">
                <div>
                    <span className="step-badge">Phase 4</span>
                    <h2 className="step-main-title">Solution Architecture Blueprint</h2>
                    <p className="step-subtitle">A professional breakdown of how your project works.</p>
                </div>
                {solution && (!solution.researchPapers || solution.researchPapers.length === 0) && workspace.currentStep === 3 && !isLocked && (
                    <button
                        className="btn-regenerate-solution"
                        onClick={() => setForceRegenerate(true)}
                        disabled={loading}
                    >
                        <BookOpen size={16} />
                        {loading ? 'Regenerating...' : 'Get Research Papers'}
                    </button>
                )}
            </div>

            <div className="solution-layout">
                {/* Left Panel: Project DNA Context */}
                <div className="dna-context-panel">
                    <h3>Project DNA Context</h3>
                    <div className="dna-summary-card glass-panel">
                        <div className="dna-item">
                            <label>Core Problem</label>
                            <p>{workspace.projectDNA.problem}</p>
                        </div>
                        <div className="dna-item">
                            <label>Innovation</label>
                            <p>{workspace.projectDNA.innovation}</p>
                        </div>
                        <div className="dna-item">
                            <label>Tech Stack</label>
                            <div className="mini-tags">
                                {workspace.projectDNA.techStack.slice(0, 4).map(t => <span key={t}>{t}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Solution Content */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="solution-content-panel"
                >
                    {/* 1. Overview */}
                    <div className="sol-section overview-section glass-panel">
                        <div className="sol-header"><Activity size={20} /> System Overview</div>
                        <p>{solution.overview}</p>
                    </div>

                    {/* 2. Modules */}
                    <div className="sol-section modules-section glass-panel">
                        <div className="sol-header"><Box size={20} /> Main Modules</div>
                        <div className="modules-grid">
                            {solution.modules.map((mod, i) => (
                                <div key={i} className="module-card">
                                    <h4>{mod.name}</h4>
                                    <p>{mod.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. User Flow */}
                    <div className="sol-section flow-section glass-panel">
                        <div className="sol-header"><Workflow size={20} /> User Flow Journey</div>
                        <div className="flow-steps">
                            {solution.userFlow.map((step, i) => (
                                <div key={i} className="flow-step-item">
                                    <span className="step-num">{i + 1}</span>
                                    {step}
                                    {i < solution.userFlow.length - 1 && <ArrowRight size={14} className="flow-arrow" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bottom-row-grid">
                        {/* 4. AI Role */}
                        <div className="sol-section ai-section glass-panel">
                            <div className="sol-header"><BrainCircuit size={20} /> AI Role</div>
                            <p>{solution.aiRole}</p>
                        </div>

                        {/* 5. Data Flow */}
                        <div className="sol-section data-section glass-panel">
                            <div className="sol-header"><Server size={20} /> Data Flow</div>
                            <p>{solution.dataFlow}</p>
                        </div>
                    </div>

                    {/* 6. Why it Works */}
                    <div className="sol-section why-section glass-panel">
                        <div className="sol-header"><CheckCircle2 size={20} /> Why This Solution Works</div>
                        <ul>
                            {solution.whyItWorks.map((point, i) => (
                                <li key={i}><CheckCircle2 size={14} className="bullet-icon" /> {point}</li>
                            ))}
                        </ul>
                    </div>

                    {/* 7. Research Papers Finder */}
                    {solution.researchPapers && solution.researchPapers.length > 0 && (
                        <div className="sol-section papers-section glass-panel">
                            <div className="papers-section-header">
                                <div className="sol-header">
                                    <BookOpen size={20} /> Research Paper Recommendations
                                </div>
                                <button
                                    className="btn-download-papers"
                                    onClick={downloadPapers}
                                    title="Download all papers as text file"
                                >
                                    <Download size={16} />
                                    Download All
                                </button>
                            </div>
                            <p className="papers-intro">
                                AI-curated research papers to strengthen your project foundation and literature review.
                            </p>
                            <div className="papers-grid">
                                {solution.researchPapers.map((paper, idx) => {
                                    const isExpanded = expandedPapers.includes(idx);
                                    return (
                                        <div key={idx} className="paper-card">
                                            <div
                                                className="paper-header"
                                                onClick={() => setExpandedPapers(prev =>
                                                    prev.includes(idx)
                                                        ? prev.filter(i => i !== idx)
                                                        : [...prev, idx]
                                                )}
                                            >
                                                <div className="paper-title-area">
                                                    <FileText size={16} className="paper-icon" />
                                                    <h4>{paper.title}</h4>
                                                </div>
                                                <div className="paper-meta-inline">
                                                    <span className="year-badge">{paper.year}</span>
                                                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="paper-details"
                                                    >
                                                        <div className="paper-authors">
                                                            <strong>Authors:</strong> {paper.authors.join(', ')}
                                                        </div>
                                                        <div className="paper-relevance">
                                                            <strong>Relevance:</strong> {paper.relevance}
                                                        </div>
                                                        <div className="paper-takeaway">
                                                            <strong>Key Takeaway:</strong> {paper.keyTakeaway}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="solution-actions">
                        <button className="btn-approve-sol" onClick={handleLock}>
                            <Lock size={16} /> Approve & Continue
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}

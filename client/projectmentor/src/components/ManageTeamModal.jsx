import { useState } from 'react';
import { X, UserMinus, Crown, ShieldAlert, CheckCircle2, User } from 'lucide-react';
import { API_URL } from '../config';
import './ManageTeamModal.css';

export default function ManageTeamModal({ workspace, currentUserEmail, onClose, onUpdate }) {
    const [loading, setLoading] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null); // { type: 'remove' | 'promote', email: string }
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const isLeader = workspace.createdBy?.email === currentUserEmail;

    // Filter out current user from list if they are viewing it (optional, but good for UX)
    // Actually, we want to see everyone except maybe ourselves in the 'remove' list?
    // Leader sees all members. Members see... well members can't manage team usually.
    // Assuming only Leader can open this modal functionality-wise, strictly speaking.
    // But if a member opens it, they should just see the list (View Only).

    const handleRemoveMember = async () => {
        if (!confirmAction) return;
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/members/${confirmAction.email}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (data.success) {
                setSuccessMsg('Member removed successfully');
                setConfirmAction(null);
                onUpdate(data.workspace); // Update parent state
            } else {
                setErrorMsg(data.message || 'Failed to remove member');
            }
        } catch (err) {
            setErrorMsg('Connection error');
        } finally {
            setLoading(false);
        }
    };

    const handleMakeLeader = async () => {
        if (!confirmAction) return;
        setLoading(true);
        setErrorMsg('');

        try {
            const response = await fetch(`${API_URL}/api/workspaces/${workspace._id}/leader`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newLeaderEmail: confirmAction.email })
            });
            const data = await response.json();

            if (data.success) {
                setSuccessMsg('Leadership transferred successfully');
                setConfirmAction(null);
                onUpdate(data.workspace);
            } else {
                setConfirmAction(null); // Close dialog to show error
                if (response.status === 404 && data.message.includes('profile')) {
                    setErrorMsg("This member hasn't created an account yet. They must sign up before becoming a leader.");
                } else {
                    setErrorMsg(data.message || 'Failed to transfer leadership');
                }
            }
        } catch (err) {
            setConfirmAction(null);
            setErrorMsg('Connection error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content manage-team-card glass-container" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-text">
                        <h2 className="modal-title">Manage Team</h2>
                        <p className="modal-subtitle">{workspace.teamName} ({workspace.members.length + 1} members)</p>
                    </div>
                    <button className="close-modal-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {successMsg && (
                    <div className="status-msg success">
                        <CheckCircle2 size={16} /> {successMsg}
                    </div>
                )}
                {errorMsg && (
                    <div className="status-msg error">
                        <ShieldAlert size={16} /> {errorMsg}
                    </div>
                )}

                <div className="members-list-container">
                    {/* Leader Section */}
                    <div className="member-row leader-row">
                        <div className="member-avatar">
                            <Crown size={20} className="crown-icon" />
                        </div>
                        <div className="member-info">
                            <span className="member-email">{workspace.createdBy?.email}</span>
                            <span className="member-role">Team Leader</span>
                        </div>
                    </div>

                    {/* Members List */}
                    {workspace.members.map((member, idx) => (
                        <div key={idx} className="member-row">
                            <div className="member-avatar">
                                <User size={20} />
                            </div>
                            <div className="member-info">
                                <span className="member-email">{member.email}</span>
                                <span className="member-status">{member.status}</span>
                            </div>

                            {isLeader && (
                                <div className="member-actions">
                                    <button
                                        className="action-btn promote-btn"
                                        title="Make Team Leader"
                                        onClick={() => setConfirmAction({ type: 'promote', email: member.email })}
                                    >
                                        <Crown size={18} />
                                    </button>
                                    <button
                                        className="action-btn remove-btn"
                                        title="Remove Member"
                                        onClick={() => setConfirmAction({ type: 'remove', email: member.email })}
                                    >
                                        <UserMinus size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    {workspace.members.length === 0 && (
                        <div className="no-members-msg">No other members yet.</div>
                    )}
                </div>

                {/* Confirmation Dialog Overlay */}
                {confirmAction && (
                    <div className="confirm-overlay">
                        <div className="confirm-box">
                            <h3>
                                {confirmAction.type === 'remove' ? 'Remove Member?' : 'Transfer Leadership?'}
                            </h3>
                            <p>
                                {confirmAction.type === 'remove'
                                    ? `Are you sure you want to remove ${confirmAction.email}? They will be notified via email.`
                                    : `Make ${confirmAction.email} the new Team Leader? You will lose admin rights.`
                                }
                            </p>
                            <div className="confirm-actions">
                                <button className="btn-secondary small" onClick={() => setConfirmAction(null)}>Cancel</button>
                                <button
                                    className={`btn-primary small ${confirmAction.type === 'remove' ? 'btn-danger' : ''}`}
                                    onClick={confirmAction.type === 'remove' ? handleRemoveMember : handleMakeLeader}
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Confirm'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

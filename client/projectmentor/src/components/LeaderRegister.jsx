import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import '../App.css';

const LeaderRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Update display name
            await updateProfile(user, { displayName: name });

            // Navigate to Team Creation
            navigate('/leader/create-team');
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
    };

    return (
        <div className="splash-container">
            <div className="glass-card" style={{ maxWidth: '400px', width: '90%' }}>
                <button
                    onClick={() => navigate('/role-selection')}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        color: 'var(--text-dark)',
                        fontWeight: 'bold',
                        padding: 0
                    }}
                >
                    ← Back
                </button>
                <h2 className="splash-title" style={{ fontSize: '2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                    👑 Create Account
                </h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    Start your leadership journey 🚀
                </p>
                {error && <p style={{ color: '#ff6b6b', marginBottom: '1rem', textAlign: 'center' }}>❌ {error}</p>}

                <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>👤</span>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{ paddingLeft: '45px', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>📧</span>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ paddingLeft: '45px', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '15px', top: '12px', fontSize: '1.2rem' }}>🔒</span>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ paddingLeft: '45px', width: '100%', boxSizing: 'border-box' }}
                        />
                    </div>

                    <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                        ✨ Register as Leader
                    </button>

                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                        Already have an account? <span style={{ color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => navigate('/leader/login')}>Login</span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LeaderRegister;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Loader, Chrome } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import './WelcomePage.css';
import { API_URL } from '../config';

export default function WelcomePage() {
    const [showProfileForm, setShowProfileForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');
        if (userProfile) {
            navigate('/dashboard');
        }
    }, [navigate]);

    if (showProfileForm) {
        return <ProfileForm navigate={navigate} />;
    }

    return (
        <div className="welcome-page">
            <div className="welcome-content">
                <div className="welcome-icon">
                    <Sparkles size={80} strokeWidth={2} />
                </div>
                <h1 className="welcome-title">
                    Welcome to <span className="text-gradient">Project Mentor</span>
                </h1>
                <p className="welcome-message">
                    Your AI-powered companion for creating amazing projects. Let's build something incredible together!
                </p>
                <button className="btn btn-primary get-started-btn" onClick={() => setShowProfileForm(true)}>
                    Get Started
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );
}

function ProfileForm({ navigate }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        year: '',
        branch: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Create/update user profile in backend with Google ID
            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name || user.displayName,
                    email: user.email,
                    branch: formData.branch || 'Not specified',
                    year: formData.year || 'Not specified',
                    googleId: user.uid,
                    profilePic: user.photoURL || ''
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update localStorage with complete profile
                localStorage.setItem('userProfile', JSON.stringify({
                    ...formData,
                    email: user.email,
                    googleId: user.uid,
                    profilePic: user.photoURL,
                    isEmailVerified: true
                }));
                localStorage.setItem('isAuthenticated', 'true');

                // Navigate to dashboard
                navigate('/dashboard');
            } else {
                setError(data.message || 'Failed to save profile');
            }
        } catch (error) {
            console.error('Google auth error:', error);
            setError(error.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="welcome-page">
            <div className="profile-form-container glass-container">
                <h2 className="form-title">Complete Your Profile</h2>
                <p className="form-subtitle">Then continue with Google to finish</p>

                {error && (
                    <div className="auth-error" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', textAlign: 'center' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-input"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Academic Year</label>
                            <select
                                name="year"
                                className="form-select"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your year</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Branch</label>
                            <select
                                name="branch"
                                className="form-select"
                                value={formData.branch}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select your branch</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Civil">Civil</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn" disabled={loading}>
                        {loading ? (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                <Loader size={20} className="spinning" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <span>Continue</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

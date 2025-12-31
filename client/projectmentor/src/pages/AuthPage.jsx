// Firebase Auth Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Chrome, Loader } from 'lucide-react';
import './AuthPage.css';
import { API_URL } from '../config';

export default function AuthPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleAuth = async () => {
        setLoading(true);
        setError('');

        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Get user profile from localStorage
            const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

            // Create/update user profile in backend with Google ID
            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userProfile.name || user.displayName,
                    email: user.email,
                    branch: userProfile.branch || 'Not specified',
                    year: userProfile.year || 'Not specified',
                    googleId: user.uid,
                    profilePic: user.photoURL || ''
                })
            });

            const data = await response.json();

            if (data.success) {
                // Update localStorage with complete profile
                localStorage.setItem('userProfile', JSON.stringify({
                    ...userProfile,
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
        <div className="auth-page">
            <div className="auth-container glass-container">
                <div className="auth-header">
                    <h2 className="auth-title">Almost There!</h2>
                    <p className="auth-subtitle">Sign in with Google to continue</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <button
                    className="google-auth-btn"
                    onClick={handleGoogleAuth}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader size={24} className="spinning" />
                            <span>Signing in...</span>
                        </>
                    ) : (
                        <>
                            <Chrome size={24} />
                            <span>Continue with Google</span>
                        </>
                    )}
                </button>

                <p className="auth-note">
                    We'll use this to personalize your experience and keep your projects secure.
                    Your email will be automatically verified with Google Sign-In.
                </p>
            </div>
        </div>
    );
}

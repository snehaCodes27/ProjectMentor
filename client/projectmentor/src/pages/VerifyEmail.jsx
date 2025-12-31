import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import './VerifyEmail.css';
import { API_URL } from '../config';

export default function VerifyEmail() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Invalid verification link');
            return;
        }

        verifyEmail(token);
    }, [token]);

    const verifyEmail = async (token) => {
        try {
            const response = await fetch(`${API_URL}/api/verify-email/${token}`);
            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage(data.message);

                // Redirect to dashboard after 3 seconds
                setTimeout(() => {
                    navigate('/dashboard');
                }, 3000);
            } else {
                setStatus('error');
                setMessage(data.message);
            }
        } catch (error) {
            setStatus('error');
            setMessage('Failed to verify email. Please try again.');
        }
    };

    return (
        <div className="verify-email-page">
            <div className="verify-container glass-container">
                {status === 'verifying' && (
                    <>
                        <div className="verify-icon verifying">
                            <Loader size={64} className="spinning" />
                        </div>
                        <h2 className="verify-title">Verifying Your Email...</h2>
                        <p className="verify-message">Please wait while we verify your account</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="verify-icon success">
                            <CheckCircle size={64} />
                        </div>
                        <h2 className="verify-title">Email Verified! ✅</h2>
                        <p className="verify-message">{message}</p>
                        <p className="verify-redirect">Redirecting to dashboard...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="verify-icon error">
                            <XCircle size={64} />
                        </div>
                        <h2 className="verify-title">Verification Failed</h2>
                        <p className="verify-message">{message}</p>
                        <button className="btn btn-primary" onClick={() => navigate('/welcome')}>
                            Go to Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import './SplashScreen.css';

export default function SplashScreen() {
    const navigate = useNavigate();

    useEffect(() => {
        const userProfile = localStorage.getItem('userProfile');

        const timer = setTimeout(() => {
            if (userProfile) {
                navigate('/dashboard');
            } else {
                navigate('/features');
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-screen">
            <div className="splash-content">
                <div className="splash-icon">
                    <Sparkles size={80} strokeWidth={2} />
                </div>
                <h1 className="splash-title">
                    Project <span className="text-gradient">Mentor</span>
                </h1>
                <p className="splash-subtitle">AI-Powered Project Management</p>
                <div className="splash-loader">
                    <div className="loader-bar"></div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css'; // Ensure styles are imported

const SplashScreen = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/role-selection');
        }, 3000); // Auto redirect after 3 seconds

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="splash-container">
            <div className="logo-container">
                <img src={logo} alt="ProjectMento Logo" className="splash-logo" />
            </div>
            <h1 className="splash-title">
                PROJECTMENTO
            </h1>
            <p className="splash-subtitle">
                Welcome to the future of details
            </p>
        </div>
    );
};

export default SplashScreen;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import FeaturePage from './pages/FeaturePage';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProjectJourney from './pages/ProjectJourney';
import VerifyEmail from './pages/VerifyEmail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/features" element={<FeaturePage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workspace/:workspaceId" element={<ProjectJourney />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;

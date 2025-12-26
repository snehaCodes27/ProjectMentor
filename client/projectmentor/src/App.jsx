import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import RoleSelection from './components/RoleSelection';
import LeaderRegister from './components/LeaderRegister';
import TeamCreation from './components/TeamCreation';
import LeaderDashboard from './components/LeaderDashboard';
import LeaderLogin from './components/LeaderLogin';
import ProjectSelection from './components/ProjectSelection';
import MemberJoin from './components/MemberJoin';
import ManageTeam from './components/ManageTeam';
import MemberDashboard from './components/MemberDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/leader/register" element={<LeaderRegister />} />
        <Route path="/leader/login" element={<LeaderLogin />} />
        <Route path="/leader/create-team" element={<TeamCreation />} />
        <Route path="/leader/dashboard" element={<LeaderDashboard />} />
        <Route path="/leader/select-project" element={<ProjectSelection />} />
        <Route path="/leader/manage-team" element={<ManageTeam />} />
        <Route path="/member/join" element={<MemberJoin />} />
        <Route path="/member/dashboard" element={<MemberDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

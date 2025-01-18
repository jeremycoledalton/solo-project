import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//React Components
import NavBar from './components/NavBar.jsx';
import LandingPage from './components/LandingPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import Dashboard from './components/Dashboard.jsx';

import ThoughtFeed from './components/ThoughtFeed.jsx';
import ThoughtForm from './components/ThoughtForm.jsx';


const ProtectedRoute = ({ user, children }) => {
    return user ? children : <Navigate to="/" />
;}


const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
      };

      const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            credentials: 'include',
        }).then ((response) => {
            if (response.ok) {
                setUser(null);
                console.log('User logged out');
            } else {
                console.log('failed to log out')
            }
        }).catch((err) => {
            console.log ('Error during logout:', err);
        })
      };

    return (
        <Router>
                <NavBar user={user} onLogout={handleLogout} />
            <div id="authDiv">
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
                    <Route path="/auth/:type" element={<AuthPage onAuthSuccess={handleLogin} />} />
                    {/*Protected Route*/}
                    <Route path="/dashboard" element={
                                                <ProtectedRoute user={user}> 
                                                    <Dashboard user={user} />
                                                </ProtectedRoute>
                                            }
                    />
                </Routes>
            </div>
        </Router>
    );
}


export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext.jsx';

//React Components
import NavBar from './components/NavBar.jsx';
import LandingPage from './components/LandingPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import Dashboard from './components/Dashboard.jsx';



const ProtectedRoute = ({ user, children }) => {
    return user ? children : <Navigate to="/" />
;}


const App = () => {
    return (
        <AppProvider>
                <Router>
                        <NavBar />
                    <div id="authDiv">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/auth/:type" element={<AuthPage />} />
                            {/*Protected Route*/}
                            <Route path="/dashboard" element={
                                                        <ProtectedRoute > 
                                                            <Dashboard />
                                                        </ProtectedRoute>
                                                    }
                            />
                        </Routes>
                    </div>
                </Router>
        </AppProvider>
    );
};


export default App;
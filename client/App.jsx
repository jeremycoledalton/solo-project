import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './components/Dashboard.jsx';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    handleLogin = (userData) => {
        this.setState({user: userData});
    }

    render() {
        const { user } = this.state;

        const ProtectedRoute = ({ user, children }) => {
            return user? children : <Navigate to="/auth/login" />;
        }

        

        return (
            <Router>
                    <NavBar user={user} />
                 <div id="authDiv">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth/:type" element={<AuthPage onAuthSuccess={this.handleLogin} />} />
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
}

export default App;
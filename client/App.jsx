import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.jsx';
import AuthPage from './components/AuthPage.jsx';
import NavBar from './components/NavBar.jsx';
import Dashboard from './components/Dasboard.jsx';


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

        

        return (
            <Router>
                    <NavBar user={user} />
                 <div id="authDiv">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/auth/:type" element={<AuthPage onAuthSuccess={this.handleAuthSuccess}/>} /> 
                        <Route path="/dashboard" element={<Dashboard user={user} />} />
                    </Routes>
                </div>
        </Router>
        );
    }
}

export default App;
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/landingPage.jsx';
import AuthPage from './components/authPage.jsx';
import Navigation from './components/navBar.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                username: '',
                password: ''
            }
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [name]: value
            }
        }));
        console.log (this.state)
    };

    render() {
        const { formData } = this.state;

        

        return (
            <Router>
                    <Navigation />
                 <div id="authDiv">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/:type" element={<AuthPage />} /> {/* Dynamically handles /login and /signup */}
                    </Routes>
                </div>
        </Router>
        );
    }
}

export default App;
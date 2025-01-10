import React, { Component } from 'react';

import './stylesheets/style.css';

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
            <div>
                <form id="signUpForm" className="login-form" action="/signup" method="POST">
                    <h2>Sign Up</h2>

                    <label htmlFor="username">Username:</label>
                    <input id="username" name="username" value={formData.username} onChange={this.handleChange} required/>

                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" value={formData.password} onChange={this.handleChange} required />
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default App;
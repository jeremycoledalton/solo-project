import React, { Component } from 'react';

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
    };

    render() {
        const { formData } = this.state;

        return (
            <div>
                <form className="login-form" action="/login" method="POST">
                    <h2>Login</h2>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={this.handleChange}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={this.handleChange}
                        required
                    />
                </form>
            </div>
        );
    }
}

export default App;
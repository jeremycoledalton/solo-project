import React from 'react';
import { useParams } from 'react-router-dom';

const authPage = () => {
  const { type } = useParams(); 

  const renderForm = () => {
    switch (type) {
      case 'login':
        return (
          <form id="loginForm" className="auth-form" action="/login" method="POST">
            <h2>Login</h2>
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button type="submit">Submit</button>
          </form>
        );

      case 'signup':
        return (
          <form id="signUpForm" className="auth-form" action="/signup" method="POST">
            <h2>Sign Up</h2>
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button type="submit">Submit</button>
          </form>
        );

      default:
        return <p>Something is wrong here...</p>;
    }
  };

  return <div>{renderForm()}</div>;
};

export default authPage;

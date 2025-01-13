import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

//modular authForm for insite the outer page div. This does not auto export, you must explicitly import it on other components.

const AuthForm = ({ title, onSubmit }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>{title}</h2>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Submit</button>
    </form>
  );
};

const AuthPage = ({ onAuthSuccess }) => {
  const { type } = useParams();
  const navigate = useNavigate();

  const isLogin = (type === 'login'); //yes or no?

  // if the test on line 7 is true we will run the following as 'Login' otherwise we are looking for the 'Sign Up'
  const formTitle = isLogin ? 'Login' : 'Sign Up';
  const formAction = isLogin ? '/login' : '/signup';


  const handleAuth = async (formData) => {
    try {
      const response = await fetch(`http://localhost:3000${formAction}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onAuthSuccess(data); // Pass user data to the parent component (App)
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        console.error('Authentication failed.');
      }
    } catch (err) {
      console.error('Error during authentication:', err);
    }
  };





  return (
    <div>
      <AuthForm title={formTitle} onSubmit={handleAuth} />
    </div>
  );
};



export default AuthPage; 
export { AuthForm };

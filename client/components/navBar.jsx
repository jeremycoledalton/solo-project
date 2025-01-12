import React from 'react';
import { Link } from 'react-router-dom';

const navBar = () => (
  <nav>
    <Link to="/">Home</Link> || <Link to="/auth/login">Login</Link> || <Link to="/auth/signup">Sign Up</Link>
  </nav>
);

export default navBar;

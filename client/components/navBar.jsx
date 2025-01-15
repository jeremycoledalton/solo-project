import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({user, onLogout}) => (
  <nav>
    {user ? ( <>
                <p>{user.username}, you're like... really pretty!</p>
                <Link to="/">Home</Link> 
                <Link to="/dashboard">Dashboard</Link>
                <button onClick={onLogout}>Log Out</button>
              </>
        ) : ( <>
                <p>Are you new here?</p>
                <Link to="/">Home</Link> 
                <Link to="/auth/login">Log In</Link> 
                <Link to="/auth/signup">Sign Up</Link> 
            </>
            )}
  </nav>
);

export default NavBar;

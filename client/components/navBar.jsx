import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../AppContext.jsx';

const NavBar = () => {
  const { user, handleLogout } = useContext(AppContext);


  return(
    <nav>
      {user ? ( <>
                  <h2>{user.username}, you're like... really pretty!</h2>
                  <Link to="/">Home</Link> 
                  <Link to="/dashboard">Dashboard</Link>
                  <button onClick={handleLogout}>Log Out</button>
                </>
          ) : ( <>
                  <h2>Are you new here?</h2>
                  <Link to="/">Home</Link> 
                  <Link to="/auth/login">Log In</Link> 
                  <Link to="/auth/signup">Sign Up</Link> 
              </>
              )}
    </nav>
  );
}



export default NavBar;

import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [thoughts, setThoughts] = useState([]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
        console.log('User logged out');
      } else {
        console.error('Failed to log out');
      }
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const fetchThoughts = async () => {
    try {
      const response = await fetch('/allThoughts');
      const data = await response.json();
      setThoughts(data);
    } catch (err) {
      console.error('Error fetching thoughts:', err);
    }
  };

  const addThought = async (newThought) => {
    try {
      const response = await fetch('/createThought', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThought),
      });

      if (response.ok) {
        const createdThought = await response.json();
        setThoughts((prev) => [createdThought, ...prev]);
      } else {
        console.error('Failed to create thought');
      }
    } catch (err) {
      console.error('Error creating thought:', err);
    }
  };

  

  useEffect(() => {
    fetchThoughts();
  }, []);



  return (
    <AppContext.Provider value={{ user, handleLogin, handleLogout, thoughts, addThought, fetchThoughts }}>
      {children}
    </AppContext.Provider>
  );
}
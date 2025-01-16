import React, { useState } from 'react';

import ThoughtFeed from './ThoughtFeed.jsx';
import ThoughtForm from './ThoughtForm.jsx';

const Dashboard = ({ user }) => {
  const [thoughts, setThoughts] = useState([]);

  if (!user) return <p>Log in to see Dashboad</p>;

  return (
    <div>
      <h1>So you agree, {user.username}? </h1>
      <ThoughtFeed />
      <ThoughtForm />
      <p>Your role: {user.admin ? 'Admin' : 'User'}</p>
    </div>
  );
};

export default Dashboard;
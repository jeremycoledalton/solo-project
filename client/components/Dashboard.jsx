import React from 'react';

const Dashboard = ({ user }) => {

  if (!user) return <p>Log in to see Dashboad</p>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Your role: {user.admin ? 'Admin' : 'User'}</p>
    </div>
  );
};

export default Dashboard;
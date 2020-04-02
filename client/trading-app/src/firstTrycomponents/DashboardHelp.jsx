import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';

function DashboardHelp(props) {
  const handleLoginSuccess = data => {
    console.log('ran login success inside DashboardHelp', data);
    props.handleLogin(data);
    props.history.push('/dashboard');
  };
  return (
    <div>
      <Dashboard
        handleLoginSuccess={handleLoginSuccess}
        username={props.username}
        money={props.money}
        loggedIn = {props.loggedInStatus}
      />
    </div>
  );
}

export default DashboardHelp;

import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';
import useGetUserStocks from '../hooks/getUserStocks';
import Stocks from './Stocks';

function Dashboard(props) {

  
  const [userStock] = useGetUserStocks('http://localhost:5000/api/stocks/', props.username, []);
  const [user] = useHttpGet('http://localhost:5000/api/user/loggedin', []);
  
  
  

  return(
    <div >
      <Navbar/>
      <h1>Dashboard</h1>
      <h1>Logged In Status: {props.loggedIn}</h1>
      <h1>User: {props.username}</h1>
      <h1>Money: {props.money}</h1>
      <div>

      <Stocks userStock = {userStock}/>
      
      </div>
    </div>

  );
}

export default Dashboard;
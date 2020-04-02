import React, { useState, useEffect } from 'react';
import "../styles/stocksStyle.css";
import UserStock from './UserStock';

function UserStocks(props) {



  return (
    <div className='container'>
      {props.userStock.map(stock => (
        <div className='stockContainer' key={stock.name}>
            <UserStock userStock = {stock} handleClick = {props.handleClick}/>
          
        </div>
      ))}
    </div>
  );
}

export default UserStocks;
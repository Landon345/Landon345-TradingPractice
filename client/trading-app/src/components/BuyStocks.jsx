import React, { useState, useEffect } from 'react';
import "../styles/stocksStyle.css";
import BuyStock from './BuyStock';

function BuyStocks(props) {

 

  return (
    <div className='container'>
      {props.buyStocks.map(stock => (
        
        <div className='stockContainer' key={stock.name}>
          
            <BuyStock buyStock = {stock} handleClick = {props.handleClick}/>
          
        </div>
      ))}
    </div>
  );
}

export default BuyStocks;
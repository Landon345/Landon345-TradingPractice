import React, { useState, useEffect } from 'react';
import "../styles/stocksStyle.css";
import BuyStock from './BuyStock';
import UserStock from './UserStock';

function BuyStocks(props) {

 

  return (
    <div className='container'>
      <div className="row">

      <div className="col-9">

      {props.buyStocks.map(stock => (
        
        <div className='stockContainer' key={stock.name}>
          
            <BuyStock buyStock = {stock} handleClick = {props.handleClick}/>
          
        </div>
      ))}
      </div>
      <div className="col-3">

        
        <div className='card text-white bg-info mb-1' style={{ maxWidth: '60rem' }}>
        <div className='card-header'>My Stocks</div>
        <div className='card-body'>
        
        <p className='card-text'>

      {props.stocksOwned.map(ownedStock => (
        
        
        
        <p>{ownedStock.name}, {ownedStock.amount}</p>
        
        
        
        ))}
        </p>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
}

export default BuyStocks;
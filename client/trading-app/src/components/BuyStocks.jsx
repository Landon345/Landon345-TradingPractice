import React, { useState, useEffect } from 'react';
import "../styles/stocksStyle.css";
import BuyStock from './BuyStock';
import UserStock from './UserStock';
import { useMediaQuery } from 'react-responsive';

function BuyStocks(props) {

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)'
  })
  

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

        {isDesktopOrLaptop &&
        //Use isDesktopOrLaptop so that it is reponsive to mobile. Get's rid of this section if on mobile.
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
        }
      </div>
      </div>
    );


 }

export default BuyStocks;
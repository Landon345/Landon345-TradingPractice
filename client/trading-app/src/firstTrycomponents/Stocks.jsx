import React, { useState, useEffect } from 'react';
import "../styles/stocksStyle.css";
import Stock from './Stock';

function Stocks(props) {



  return (
    <div className='stocksContainer'>
      {props.userStock.map(stock => (
        <div className='stockContainer' key={stock.name}>
            {console.log(stock)}
            <Stock userStock = {stock}/>
          
        </div>
      ))}
    </div>
  );
}

export default Stocks;

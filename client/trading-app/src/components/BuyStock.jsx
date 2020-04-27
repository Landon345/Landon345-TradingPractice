import React, { useEffect, useState } from 'react';

function BuyStock(props) {
  const [amountToBuy, setAmountToBuy] = useState(0);
  const { name, price } = props.buyStock;
  const [costToBuy, setCostToBuy] = useState(0.00);

  const handleChange = event => {
    if ([event.target.name] == 'amountToBuy') {
      setAmountToBuy(event.target.value);
      const cost = event.target.value * parseFloat(price.replace(/[^0-9.]/g, ""));
      setCostToBuy(cost.toFixed(2));
    } 
  };

  return (
    <div className='card text-white mb-1' style={{ maxWidth: '60rem', backgroundColor: "green"}}>
      <div className='card-header' style={{backgroundColor: "forestGreen"}}>{name}</div>
      <div className='card-body'>
        <h5 className='card-title'>price: {price}</h5>
        <p className='card-text'></p>

        <div class='input-group mb-3 col-8'>
          <input
            type='number'
            min='0'
            className='form-control'
            onChange={handleChange}
            value={amountToBuy}
            name='amountToBuy'
            placeholder='Amount to buy'
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button
              className='btn btn-primary'
              onClick={() => props.handleClick(name, amountToBuy, price)}
            >
              Buy
            </button>
            <button
              className='btn btn-warning'
              onClick={() => props.handleClick(name, 10, price)}
            >
              Buy 10
            </button>
            <button
              className='btn btn-danger'
              onClick={() => props.handleClick(name, 50, price)}
            >
              Buy 50
            </button>
            
            
          </div>
        </div>
          <p className='card-text'>Cost: ${costToBuy}</p>
      </div>
      
    </div>
  );
}

export default BuyStock;

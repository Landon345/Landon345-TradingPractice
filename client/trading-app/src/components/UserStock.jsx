import React, {useState, useEffect} from 'react';

function UserStock(props){
    const [amountToSell, setAmountToSell] = useState(0);
    const {name, price_bought_at, price_now, amount} = props.userStock;

    const calculatePercentageGain = () => {
        console.log(price_now.toString().slice(1));
        let boughtAt = parseFloat(price_bought_at.replace(/[^0-9.]/g, ""));
        let nowAt = parseFloat(price_now.replace(/[^0-9.]/g, ""));
        let difference = nowAt - boughtAt;
        let percentage = "%" + (difference/boughtAt * 100).toFixed(2);
        return percentage;

    }
    const handleChange = event => {
        if ([event.target.name] == 'amountToSell') {
          setAmountToSell(event.target.value);
        } 
      };
    return(
        

        <div className="card text-white mb-1" style={{maxWidth: "60rem", backgroundColor:"green"}}>
            <div className="card-header" style={{backgroundColor: "forestGreen"}}>{name}</div>
            <div className="card-body">
            <h5 className="card-title">price bought at: {price_bought_at}, price now: {price_now}</h5>
            <p className="card-text">Amount: {amount}, Loss/Gain:  {calculatePercentageGain()}</p>
            </div>
            <div class='input-group mb-3 col-3'>
          <input
            type='number'
            min='0'
            max={amount}
            className='form-control'
            onChange={handleChange}
            value={amountToSell}
            name='amountToSell'
            placeholder='Amount to Sell'
            aria-describedby='basic-addon2'
          />
          <div className='input-group-append'>
            <button
              className='btn btn-primary'
              onClick={() => props.handleClick(name, amountToSell, amount, price_now)}
            >
              Sell
            </button>
            <button className="btn btn-warning" onClick={() => props.handleClick(name, amount, amount, price_now)}>
              Sell All
            </button>
            </div>
        </div>
        </div>
    );
}

export default UserStock;
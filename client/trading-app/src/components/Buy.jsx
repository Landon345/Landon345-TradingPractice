import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';
import BuyStocks from './BuyStocks';

function Buy(props) {
  // const [stocks] = useHttpGet(
  //   `http://localhost:5000/api/stocks`,
  //   [],
  //   'getting stocks'
  //   );
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const [query, setQuery] = useState('');
  const [stocks] = useHttpGet(
    `http://localhost:5000/api/stocks/${query}`,
    [query, seconds],
    'getting stocks'
  );
  
  

  const handleChange = event => {
    setQuery(event.target.value);
  };
  const [user] = useHttpGet(
    `http://localhost:5000/api/users/${sessionStorage.getItem('username')}`,
    [],
    'getting user ' + sessionStorage.getItem('username')
  );
  const [stocksOwned] = useHttpGet(
    `http://localhost:5000/api/own/${sessionStorage.getItem('username')}`,
    [],
    'getting stocks Owned for ' + sessionStorage.getItem('username')
  );

  /**
   * handle the logout sequence when a user clicks on logout on the Navbar.
   * first remove the user from the session, then move handleLogout() up to app.js, then redirect to the home page.
   */
  const handleLogout = () => {
    sessionStorage.removeItem('username');
    props.handleLogout();
    props.history.push('/');
  };

  /**
   *
   * @param {the name of the stock} name 'aapl'
   * @param {the amount wanting to buy} amountToBuy 10
   * @param {the current price of the stock} price_now 172.32
   *
   * If the stock that is being bought is already in the users portfolio, just do an update on the postition,
   * If the stock is not in the users portfolio, create a new stock in the users dashboard.
   */
  const handleBuy = async (name, amountToBuy, price_now) => {
    const dollars = amountToBuy * parseFloat(price_now.replace(/[^0-9.]/g, ""));
    const dollarsOnHand = parseFloat(user.dollars.replace(/[^0-9.]/g, ""));
    if (amountToBuy < 0) {
      alert("You can't buy a negative amount of stocks, silly.");
      return 'End';
    }
    
    console.log(dollars, dollarsOnHand);
    if(dollars > dollarsOnHand){
      alert("You don't have enough money for that, silly.");
      return 'End';
    }
    //Make new Stock if not owned already
    const stocknamesOwned = [];
    stocksOwned.forEach(stock => {
      stocknamesOwned.push(stock.name);
    });
    if (!stocknamesOwned.includes(name)) {
      

      await createNewStockInPortfolio(name, amountToBuy, price_now, dollars);
      
      //quit excution of the function after this point.
      return 'hello';
    }

    //update stock if owned already
    let own = {};
      stocksOwned.forEach((stock) => {
        if(stock.name == name){
          own = stock;
        }
      })
    await updateStockInPortfolio(name, amountToBuy, price_now, own, dollars);

    
  };

  const createNewStockInPortfolio = async (name, amountToBuy, price_now, dollars) => {
    console.log('ran handle buy');
    console.log(amountToBuy);
    //make a new owned in order to create data on a new stock with price_bought_at and price_now included.
    const NewOwned = {
      username: sessionStorage.getItem('username'),
      name: name,
      price_bought_at: price_now,
      price_now: price_now,
      amount: amountToBuy
    };

    const myResponse = await fetch(`http://localhost:5000/api/owns`, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: { 'content-type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(NewOwned)
    });

    const jsonData = await myResponse.json();
    console.log(jsonData);
    if (jsonData.success) {
      alert(
        'you successfully purchased ' + amountToBuy + ' stock(s) of ' + name
      );
    }
    updateMoney(dollars);
  };

  const updateStockInPortfolio = async (name, amountToBuy, price_now, own, dollars) => {
    //update stock if owned already
    const price_bought_at = parseFloat(own.price_bought_at.replace(/[^0-9.]/g, ""));
    const newPrice_now = parseFloat(price_now.replace(/[^0-9.]/g, ""));
 
    const newPrice = ((price_bought_at * own.amount) + (newPrice_now * amountToBuy)) / (parseInt(own.amount) + parseInt(amountToBuy));
    console.log(newPrice);
    const updateThis = {
      username: sessionStorage.getItem('username'),
      name: name,
      price_bought_at: newPrice,
      amount: amountToBuy
    };

    const myResponse = await fetch(`http://localhost:5000/api/owns`, {
      method: 'Put',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'omit', // include, *same-origin, omit
      headers: { 'content-type': 'application/json' },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(updateThis)
    });
    const jsonData = await myResponse.json();
    console.log(jsonData);
    if (jsonData.success) {
      alert(
        'you successfully purchased ' + amountToBuy + ' stock(s) of ' + name
      );
    }
    updateMoney(dollars);
  };

  const updateMoney = async (dollars) => {
    //update the amount of money in the users account
    
    const updateThisToo = {
      username: sessionStorage.getItem('username'),
      password: '',
      dollars: -dollars,
      premium_user: false
    };
    
    
    const myResponse2 = await fetch(
        `http://localhost:5000/api/users/${sessionStorage.getItem('username')}`, {
            method: 'Put',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {"content-type":"application/json"},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(updateThisToo)
        });
        const jsonData2 = await myResponse2.json();
        console.log(jsonData2);
        window.location.reload();
  }

  if (!props.username) {
    return <div></div>;
  } else {
    return (
      <div>
        <Navbar user={props.username} handleLogout={handleLogout} />

        <div className='container '>
          <h3>Hello {user.username}</h3>
          <h3>Money: {user.dollars}</h3>
          <input
            type='text'
            className='form-control'
            name='search'
            placeholder='Search'
            onChange={handleChange}
          />
        
        
        
          <BuyStocks buyStocks={stocks} handleClick={handleBuy} />
        </div>
      </div>
    );
  }
}

export default Buy;

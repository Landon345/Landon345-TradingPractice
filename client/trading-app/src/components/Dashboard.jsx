import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';
import UserStocks from './UserStocks';

function Dashboard(props) {

  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  
  const [stocks] = useHttpGet(`http://localhost:5000/api/userStocks/${props.username}`, [seconds], "Got user's stocks");
  const [user] = useHttpGet(
    `http://localhost:5000/api/users/${sessionStorage.getItem('username')}`,
    [],
    'getting user ' + sessionStorage.getItem('username')
  )
 
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    props.handleLogout();
    props.history.push('/');
  }

  const handleSell = async (name, amountToSell, amount, price_now) => {
    console.log("ran handle Sell");
    console.log(amountToSell);
    if(amount < amountToSell){
      alert("you can't sell more than you own, silly.");
      //don't allow the amount sold to be higher than the amount of stock owned.
      return "hello";
    }
    const updateThis = {
      username: sessionStorage.getItem('username'),
      name: name,
      amount: -amountToSell
    };
    
    
    const myResponse = await fetch(
        `http://localhost:5000/api/owns`, {
            method: 'Put',
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {"content-type":"application/json"},
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(updateThis)
        });
        const jsonData = await myResponse.json();
        console.log(jsonData);

//Update the amount of money that is in the account. 
      const dollars = amountToSell * parseFloat(price_now.replace(/[^0-9.]/g, ""));
      const updateThisToo = {
        username: sessionStorage.getItem('username'),
        dollars: dollars,
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

  return(
    <div>
      <Navbar user = {props.username} handleLogout = {handleLogout}/>
      
      <div className="container">
        <h3>Money: {user.dollars}</h3>
        <UserStocks userStock = {stocks} handleClick = {handleSell}/>
      </div>
    </div>

  );
}

export default Dashboard;
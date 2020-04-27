import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';

function Home(props) {

  const [query, setQuery] = useState('');
  const [stocks] = useHttpGet(`http://localhost:5000/api/stocks/${query}`, [query], 'getting stocks');
  
  
  const handleChange = (event) => {
    setQuery(event.target.value);
  }

  return(
    <div >
      <Navbar/>
      
      <div className="container">
      <p>Home</p>
      <p>Register to play our stock market game</p>
        <p>Check out our stocks</p>
        <input
            type='text'
            className='form-control'
            name='search'
            placeholder="Search"
            onChange={handleChange}
          />
        {stocks.map(stock => (
          <div className="card text-white mb-1" style={{maxWidth: "60rem", backgroundColor: "green"}}>
            <div className="card-header" style={{backgroundColor: "forestGreen"}}>{stock.name}</div>
            <div className="card-body">
            <h5 className="card-title">price now: {stock.price}</h5>
            <p className="card-text"> </p>
            </div>
            <div class='input-group mb-3 col-3'>
        
         
          </div>
     
          </div>
        ))}
      </div>

    </div>

    

  );
}

export default Home;
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
          <p key = {stock.name}>{stock.name}</p>
        ))}
      </div>

    </div>

  );
}

export default Home;
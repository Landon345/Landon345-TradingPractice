import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';


function Login(props){
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  const handleChange = (event) => {
    if([event.target.name] == 'username'){
        setUserName(event.target.value);
    }else if([event.target.name] == 'password'){
        setPassword(event.target.value);
    }else{
        console.log(event.target.name);
    }
    
  };
  const Submit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5000/api/users/${username}/${password}`, {
          method: 'GET',
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'include', // include, *same-origin, omit
          headers: {"content-type":"application/json"},
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
      });
      const data = await response.json();
      console.log(data);
      if(data.length == 1){
        sessionStorage.removeItem("username");
        sessionStorage.setItem("username", username);
        props.handleSuccess(data);
        props.history.push('/dashboard');
      }else{
        alert("username or password incorrect");
      }
  


    
    // parses JSON response into native JavaScript objects
  };

return (
    <div >
      <Navbar />
      <div >

      <h1>Login to trading practice</h1>
      <form onSubmit={Submit}>
        <div className='form-group'>
          <label >User Name</label>
          <input
            type='text'
            className='form-control'
            value={username}
            name='username'
            placeholder="User name"
            onChange={handleChange}
            required
            />
          <small id='emailHelp' className='form-text text-muted'>
            Please enter a username
          </small>
        </div>
        <div className='form-group'>
          <label >Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            name='password'
            placeholder='password'
            onChange={handleChange}
            required
            />
        </div>
        <button className='btn btn-primary' type="submit">
        Login
      </button>
      </form>
      
      </div>
    </div>
  );
}

export default Login;
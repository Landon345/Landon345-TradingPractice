import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';

function Register(props) {
  //define the states
  //const [users, setUsers] = useState([]);
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);
  const [passwordConfirmation, setPasswordConfirmation] = useState([]);

  const [users] = useHttpGet('http://localhost:5000/api/users', [], 'inside register');
  console.log(users);
  
  const handleChange = (event) => {
    if([event.target.name] == 'username'){
        setUserName(event.target.value);
    }else if([event.target.name] == 'password'){
        setPassword(event.target.value);
    }else if([event.target.name] == 'passwordConfirmation'){
        setPasswordConfirmation(event.target.value);
    }else{
        console.log(event.target.name);
    }
    
  };
  const Submit = async (event) => {
    
    event.preventDefault();
    if(password != passwordConfirmation){
        return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username) {
        return;
      }
      console.log(users[i].username);
    }
    const newUser = {
      username: username,
      password: password,
      dollars: 10000,
      premium_user: false,
      loggedin: false
    };
        const response = await fetch(
            'http://localhost:5000/api/users', {
                method: 'POST',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {"content-type":"application/json"},
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            
    if(data.success){
        console.log(data.body);
        props.handleSuccess(data.body);
    }
    // parses JSON response into native JavaScript objects
  };
  

  //Make a register form
  return (
    <div>
      <Navbar />
      <h1>Register for Trading Practice</h1>
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
        <div className='form-group'>
          <label >Password Confirmation</label>
          <input
            type='password'
            className='form-control'
            value={passwordConfirmation}
            name='passwordConfirmation'
            placeholder='password confirmation'
            onChange={handleChange}
            required
          />
        </div>

        <button className='btn btn-primary' type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

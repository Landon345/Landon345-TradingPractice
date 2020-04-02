import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router-dom';
import Navbar from './Navbar';
import useHttpGet from '../hooks/httpGet';

function Login(props) {

  
  //define the states
  //const [users, setUsers] = useState([]);
  const [username, setUserName] = useState([]);
  const [password, setPassword] = useState([]);

  const [users] = useHttpGet('http://localhost:5000/api/users', []);
  const [user] = useHttpGet('http://localhost:5000/api/user/loggedin', []);
  console.log(user);
  if(user.length == 1){
    console.log("inside if statement", user);
    props.handleLoginSuccess(user);
  }
  const handleChange = (event) => {
    if([event.target.name] == 'username'){
        setUserName(event.target.value);
        console.log(user);
    }else if([event.target.name] == 'password'){
        setPassword(event.target.value);
    }else{
        console.log(event.target.name);
    }
    
  };
  

  
  const Submit = async (e) => {
    e.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (users[i].username == username && users[i].password == password) {
        const myUser = {
          username: username,
          password: users[i].password,
          dollars: users[i].dollars,
          premium_user: users[i].premium_user,
          loggedin: true
        }
        const response = await fetch(
            `http://localhost:5000/api/users/${username}`, {
                method: 'Put',
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'include', // include, *same-origin, omit
                headers: {"content-type":"application/json"},
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(myUser)
            });
            const data = await response.json();
            console.log("Response data: ", data);
        props.handleLoginSuccess([data.body]);
        
      }
      console.log(users[i].username);
    }
    
        
  };
  
  // const Validate = () => {
  //   for (let i = 0; i < users.length; i++) {
  //     if (
  //       users[i].username === username &&
  //       users[i].password === password
  //     ) {
  //       console.log("username and password correct");
  //       props.login(username, password);
       
  //     }
  //   }
  // }

  return (
    <div>
      <Navbar />
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
  );
}

export default Login;

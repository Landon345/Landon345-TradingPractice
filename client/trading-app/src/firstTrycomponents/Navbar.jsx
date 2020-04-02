import React from 'react';
import useHttpGet from '../hooks/httpGet';

function Navbar(){
  const [user] = useHttpGet('http://localhost:5000/api/user/loggedin', [], "inside navbar");
  console.log("Inside Navbar", user);

  const logout = async () => {
    
    console.log("ran logout", user);
    const myUser = {
      username: user[0].username,
      password: user[0].password,
      dollars: user[0].dollars,
      premium_user: user[0].premium_user,
      loggedin: false
    }
    
    const response = await fetch(
        `http://localhost:5000/api/users/${user[0].username}`, {
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
        console.log(data);
        window.location.reload();
  }

  if(user.length == 1){
    console.log("inside if statement", user);
    return(
      <nav className="navbar navbar-dark bg-dark mb-3">
        
        <li><a href="/dashboard" className="navbar-brand">Dashboard</a></li>
        <li><button onClick={logout} className="btn btn-primary">Logout</button></li>
        
      </nav>
    );
  }else{
    return(
      <nav className="navbar navbar-dark bg-dark mb-3">
        
        <li><a href="/dashboard" className="navbar-brand">Dashboard</a></li>
        <li><a href="/login" className="navbar-brand">Login</a></li>
        <li><a href="/" className="navbar-brand">Register</a></li>
        
      </nav>
    );
  }
  


    
}

export default Navbar;
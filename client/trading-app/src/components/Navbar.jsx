import React from 'react';
import useHttpGet from '../hooks/httpGet';

function Navbar(props){
  





  if(props.user){
    return(
     

     
      <nav className="navbar navbar-dark mb-3" style={{backgroundColor: "black"}}>
        
        <a href="/dashboard" className="navbar-brand">Dashboard</a>
        <a href="/buy" className="navbar-brand">Buy</a>
        <button onClick={props.handleLogout} className="btn btn-primary">Logout</button>
        
      </nav>
      
    );
  }else{
    return(
      

      <nav className="navbar navbar-dark mb-3" style={{backgroundColor: "black"}}>
        

        <a href="/" className="navbar-brand">Home</a>
        <a href="/login" className="navbar-brand">Login</a>
        <a href="/register" className="navbar-brand">Register</a>
        
        
        
      </nav>
     
    );
  }
    return(
      <nav className="navbar navbar-dark bg-dark mb-3">
        

        <a href="/" className="navbar-brand">Home</a>
        <a href="/dashboard" className="navbar-brand">Dashboard</a>
        <a href="/login" className="navbar-brand">Login</a>
        <a href="/register" className="navbar-brand">Register</a>
        
        
        
      </nav>
    );
 
  


    
}

export default Navbar;
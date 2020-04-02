import React, { useEffect, useState} from 'react';
import Login from './Login';

function LoginHelp(props){


    const handleLoginSuccess = (data) => {
        
        console.log("ran login success in Login Help", data);
        props.handleLogin(data);
        props.history.push('/dashboard');
        
    }
    return (
        <div>
            <Login handleLoginSuccess = {handleLoginSuccess}/>
        </div>
    );
}

export default LoginHelp;
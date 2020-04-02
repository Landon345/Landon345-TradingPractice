import React, { useEffect, useState} from 'react';
import Register from './Register';

function RegisterHelp(props){


    const handleSuccess = (data) => {
        props.handleLogin(data);
        console.log("ran handle success", data);
        props.history.push('/dashboard');
    }
    return (
        <div>
            <Register handleSuccess = {handleSuccess}/>
        </div>
    );
}

export default RegisterHelp;
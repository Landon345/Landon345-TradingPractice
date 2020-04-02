import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './components/Register';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import useHttpGet from './hooks/httpGet';
import Buy from './components/Buy';
//use react-router-dom to change urls
function App() {

  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  // const [user] = useHttpGet(
  //   `http://localhost:5000/api/users/${sessionStorage.getItem('username')}`,
  //   [],
  //   'getting user ' + sessionStorage.getItem('username')
  // )

  const handleSuccess = (data) => {
    setUsername(sessionStorage.getItem("username"));

  }
  const handleLogout = () => {
    setUsername(sessionStorage.getItem("username"));
  }

    return (
    <div>
      
    <Router>
      <div>
        <Switch>
        <Route path="/" exact render = {props=>(
            <Home {...props} />
          )}/>
          <Route path="/dashboard" exact render = {props => (
            <Dashboard {...props} username = {username} handleLogout = {handleLogout}/>
          )}/>
          <Route path="/login" exact render = {props=>(
            <Login {...props} handleSuccess = {handleSuccess}/>
          )}/>
          <Route path="/register" exact render = {props=>(
            <Register {...props} handleSuccess = {handleSuccess}/>
          )}/>
          <Route path="/buy" exact render = {props=>(
            <Buy {...props} username = {username} handleLogout = {handleLogout} />
          )}/>

        </Switch>
      </div>
    </Router>
    </div>
    
  );
  
 
    
}

export default App;

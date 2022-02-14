import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import handleLogout from './Dashboard'
import { getToken, removeUserSession, setUserSession } from './Utils/Common';

function App() {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    const config = {
      headers: { 'Access-Control-Allow-Origin': '*' }
    };

    axios.get(`http://localhost:4000/verifyToken?token=${token}`, config).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }



  if (getToken() == null) {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>
              <NavLink activeClassName="active" to="/login">Login</NavLink><small></small>

            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                <PublicRoute path="/login" component={Login} />

              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <div className="header">
              <NavLink exact activeClassName="active" to="/">Home</NavLink>

              <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small></small>

              {/* <NavLink activeClassName="active" to="/logout">Logout</NavLink><small></small> */}

         
             
            </div>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home} />
                
                {/* <Route exact path="/logout" component={handleLogout} /> */}

                <PrivateRoute path="/dashboard" component={Dashboard} />


              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    );

  }
}

export default App;

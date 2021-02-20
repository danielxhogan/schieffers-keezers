import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// ROUTES
import Nav from './components/nav/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Customize from './components/customize/Customize';
import Cart from './components/cart/Cart';
import Checkout from './components/Checkout';
import AccountDetails from './components/AccountDetails';
import DeleteAccount from './components/DeleteAccount';
import Admin from './components/Admin';

const BASE_URL = 'http://localhost:3001';

// APP
// *****************************************************************************************
const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const setAuth = boolean => {
    setAuthenticated(boolean);
  };

  const setAdmin = boolean => {
    setIsAdmin(boolean);
  }

  const adminCheck = async () => {

    // this function checks to see if the the user currently logged in
    // has administrative priveleges. If they do, isAdmin is set to true

    try {
      const response = await fetch(BASE_URL + '/admin/check', {
                                    method: 'GET',
                                    headers: {'token': localStorage.token}
      });
      if (!response.ok) {
        if (response.status === 403) {
          setIsAdmin(false);
        } else if (response.status === 500) {
          setIsAdmin(false);
        }
      } else {
        const parseRes = await response.json();
        setIsAdmin(parseRes);
      } 
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    adminCheck();
  },[]);

  const checkAuthentication = async () => {

    // this function checks to see if the the user is authenticated. The /auth/verify
    // route checks to see if the use has a token, if it's valid, and if it is,
    // returns true and authenticated is set to true, otherwise it returns
    // status 403 not authorized.

    try {
      const response = await fetch(BASE_URL + '/auth/verify', {
                                   method: 'GET',
                                   headers: {token: localStorage.token}
      });
      if (!response.ok) {
        if (response.status === 403) {
          setAuthenticated(false);
        } else if (response.status === 500) {
          setAuthenticated(false);
        }
      } else {
        const parseRes = await response.json();
        setAuthenticated(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  useEffect(() => {
    checkAuthentication();
  })

  return <>
    <Router>
      <Nav authenticated={authenticated}
          setAuth={setAuth}
          isAdmin={isAdmin}
          setAdmin={setAdmin}
      />
      <div className='body'>
        <Switch>

          <Route exact path='/'
                 render={props => <Home {...props} />}
          />

          <Route exact path='/login'
                 render={props => !authenticated ?
                                  <Login {...props} setAuth={setAuth} /> :
                                  <Redirect to='/' /> }
          />

          <Route exact path='/register' 
                 render={props => !authenticated ?
                                  <Register {...props} setAuth={setAuth} /> :
                                  <Redirect to='/' /> }
          />

          <Route exact path='/customize'
                 render={props => <Customize {...props} />}
          />

          <Route exact path='/cart'
                 render={props => authenticated ?
                                  <Cart {...props} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/checkout'
                 render={props => authenticated ?
                                  <Checkout {...props} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/account-details'
                 render={props => authenticated ?
                                  <AccountDetails {...props} /> :
                                  <redirect to='/' />}
          />

          <Route exact path='/delete-account'
                 render={props => authenticated ?
                                  <DeleteAccount {...props} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/admin'
                 render={props => isAdmin ?
                                  <Admin {...props} /> :
                                  <Redirect to='/' /> }
          />
        </Switch>
      </div>
    </Router>
  </>
}

export default App;
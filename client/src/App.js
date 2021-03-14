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
import Checkout from './components/checkout/Checkout';
import AccountDetails from './components/account-details/AccountDetails';
import DeleteAccount from './components/DeleteAccount';
import Admin from './components/Admin';

// APP
// *****************************************************************************************
const App = () => {

  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [BASE_URL, _] = useState('http://localhost:3002')

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
          BASE_URL={BASE_URL}
      />
      <div className='body'>
        <Switch>

          <Route exact path='/'
                 render={props => <Home {...props} BASE_URL={BASE_URL} />}
          />

          <Route exact path='/login'
                 render={props => !authenticated ?
                                  <Login {...props} setAuth={setAuth} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' /> }
          />

          <Route exact path='/register' 
                 render={props => !authenticated ?
                                  <Register {...props} setAuth={setAuth} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' /> }
          />

          <Route exact path='/customize'
                 render={props => <Customize {...props} BASE_URL={BASE_URL} />}
          />

          <Route exact path='/cart'
                 render={props => authenticated ?
                                  <Cart {...props} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/checkout'
                 render={props => authenticated ?
                                  <Checkout {...props} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/account-details'
                 render={props => authenticated ?
                                  <AccountDetails {...props} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/delete-account'
                 render={props => authenticated ?
                                  <DeleteAccount {...props} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' />}
          />

          <Route exact path='/admin'
                 render={props => isAdmin ?
                                  <Admin {...props} BASE_URL={BASE_URL} /> :
                                  <Redirect to='/' /> }
          />
        </Switch>
      </div>
    </Router>
  </>
}

export default App;
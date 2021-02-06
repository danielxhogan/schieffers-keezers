import React, { useState, useEffect } from 'react';
// import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// ROUTES
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Customize from './components/Customize';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AccountDetails from './components/AccountDetails';
import DeleteAccount from './components/DeleteAccount';
import Admin from './components/Admin';

// CONSTANTS
const BASE_URL = 'http://localhost:3001';



// APP
// *****************************************************************************************
const App = () => {

  const [authenticated, setAuthenticated] = useState(false);




  return <>
    <Nav />

    <Router>
      <div className='container'>
        <Switch>

          <Route exact path='/'
                 render={props => <Home {...props} />}
          />
          <Route exact path='/login'
                 render={props => <Login {...props} />}
          />
          <Route exact path='/register'
                 render={props => <Register {...props} />}
          />
          <Route exact path='/customize'
                 render={props => <Customize {...props} />}
          />
          <Route exact path='/cart'
                 render={props => <Cart {...props} />}
          />
          <Route exact path='/checkout'
                 render={props => <Checkout {...props} />}
          />
          <Route exact path='/account-details'
                 render={props => <AccountDetails {...props} />}
          />
          <Route exact path='/delete-account'
                 render={props => <DeleteAccount {...props} />}
          />
          <Route exact path='/admin'
                 render={props => <Admin {...props} />}
          />





        </Switch>
      </div>
    </Router>



  </>
}

export default App;
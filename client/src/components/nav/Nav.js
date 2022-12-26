import React from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import UserDropdown from './nav-components/UserDropdown';
import LoginRegister from './nav-components/LoginRegister';

const Nav = (props) => {

  // The Nav component gets isAdmin and setIsAdmin from App.
  // If the user has administrative priveliges, they will have access
  // to the admin page.
  
  console.log(`isAdmin: ${props.isAdmin}`);

  return <>
    <header className='main-header justify-content-around'>

      <nav className='d-flex'>
        <h3>SK</h3>

        <ul>
          <li><Link to='/'><h3>Home</h3></Link></li>
          <li><Link to='/customize'><h3>Customize</h3></Link></li>
          {props.isAdmin && <li><Link to='/admin'><h3>Admin</h3></Link></li>}
        </ul>
      </nav>

      {/* When not authenticated this will display buttons to login or register
          When authenticated this will display the users name as a button with a
          drop down menu with cart, account details, and logout buttons */}

      {props.authenticated ?
        <UserDropdown setAuth={props.setAuth}
                      setAdmin={props.setAdmin}
                      BASE_URL={props.BASE_URL}

        /> :
        <LoginRegister />}

    </header>
    <hr />
  </>
}

export default Nav;
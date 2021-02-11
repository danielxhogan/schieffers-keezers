import React from 'react';
import '../../App.css';
import UserDropdown from './nav-components/UserDropdown';
import LoginRegister from './nav-components/LoginRegister';

const Nav = (props) => {

  // The Nav component gets isAdmin and setIsAdmin from App.
  // If the user has administrative priveliges, they will have access
  // to the admin page.

  console.log(props.isAdmin);

  return <>
    <header className='main-header'>

      <nav className='d-flex'>
        <h3>SK</h3>

        <ul>
          <li></li>
          <li><a href='/'><h3>Home</h3></a></li>
          <li><a href='/customize'><h3>Customize</h3></a></li>
          {props.isAdmin && <li><a href='/admin'><h3>Admin</h3></a></li>}
        </ul>
      </nav>

      {/* When not authenticated this will display buttons to login or register
          When authenticated this will display the users name as a button with a
          drop down menu with cart, account details, and logout buttons */}

      {props.authenticated ?
        <UserDropdown setAuth={props.setAuth}
                      setIsAdmin={props.setIsAdmin}/>
        :
        <LoginRegister />}

    </header>
    <hr />
  </>
}

export default Nav;
import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {Link} from 'react-router-dom';

const UserDropdown = (props) => {

  // The UserDropdown component gets setIsAdmin and setAuth from Nav
  // If the user clicks the logout button, both of these values are set to false.

  const [user_name, set_user_name] = useState('');

  const getName = async () => {
    const response = await fetch('http://localhost:3001/user/name', {
                                  method: 'GET',
                                  headers: {'token': localStorage.token}
                                  });
                              
    const parseRes = await response.json();
    set_user_name(parseRes);
  }
  getName();

  const onClick = () => {
    localStorage.setItem('token', '');
    props.setAuth(false);
    props.setAdmin(false);
  }

  return <>
    <nav>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {user_name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to='/cart'>Cart</Link></Dropdown.Item>
          <Dropdown.Item><Link to='/account-details'>Account Details</Link></Dropdown.Item>
          <Dropdown.Item onClick={onClick}><Link to='/'>Logout</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  </>
}

export default UserDropdown;
import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

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
          <Dropdown.Item href="/cart">Cart</Dropdown.Item>
          <Dropdown.Item href="/account-details">Account Details</Dropdown.Item>
          <Dropdown.Item href="/" onClick={onClick}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  </>
}

export default UserDropdown;
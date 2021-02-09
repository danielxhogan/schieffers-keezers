import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const UserDropdown = () => {
  return <>
    <nav>
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      user_name
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item href="/cart">Cart</Dropdown.Item>
      <Dropdown.Item href="/account-details">Account Details</Dropdown.Item>
      <Dropdown.Item href="/">Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
</nav>
  </>
}

export default UserDropdown;
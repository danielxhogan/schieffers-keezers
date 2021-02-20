import React from 'react';
import {Link} from 'react-router-dom';


const LoginRegister = (props) => {
  return <>
      <nav>
        <ul className='d-flex'>
          <li><Link to='/login'><h3>Login</h3></Link></li>
          <li><Link to='/register'><h3>Register</h3></Link></li>
        </ul>
      </nav>
  </>
}

export default LoginRegister;
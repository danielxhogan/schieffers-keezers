import React from 'react';


const LoginRegister = (props) => {
  return <>
      <nav>
        <ul className='d-flex'>
          <li><a href='/login'><h3>Login</h3></a></li>
          <li><a href='/register'><h3>Register</h3></a></li>
        </ul>
      </nav>
  </>
}

export default LoginRegister;
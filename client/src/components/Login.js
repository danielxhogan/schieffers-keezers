import React, { useState } from 'react';
import '../App.css';

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const {email, password} = inputs;

  const [badRequest, setBadRequest] = useState(false);
  const [notAuthorized, setNotAuthorized] = useState(false);

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    
    // when the login form is submitted, a post request is sent to the server
    // with the email and password. If the form is missing data or the email is
    // not the correct pattern the response will have a status 400. If the data doesn't 
    // match any database records, the response will hava status 401. If the request
    // doesn't have any errors, it will return a jwt token which is stored in local storage

    e.preventDefault();
    try {
      const body = {email, password};

      const response = await fetch('http://localhost:3001/auth/login', {
                                   method: 'POST',
                                   headers: {'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
      })

      if (!response.ok) {
        if (response.status === 400) {
          setBadRequest(true);
          setNotAuthorized(false);
        } else if (response.status === 401) {
          setNotAuthorized(true);
          setBadRequest(false);
        }
      } else {
        const parseRes = await response.json();
        localStorage.setItem('token', parseRes);
        setAuth();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return <>
  <div className='login-register'>
    <h1 className='text-center my-3'>Login</h1>
    {badRequest && <p className='invalid'>Fill out all fields and enter a valid email.</p>}
    {notAuthorized && <p className='invalid'>The email or password you entered was not correct.</p>}

    <form onSubmit={onSubmit}>
      <input type='email' name='email' value={email} onChange={onChange} placeholder='email' className='form-control my-3' />
      <input type='password' name='password' value={password} onChange={onChange} placeholder='password' className='form-control my-3' />
      <button className="btn btn-success btn-block">Submit</button>
    </form>
  </div>
  </>
}

export default Login;
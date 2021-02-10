import React, { useState } from 'react';

const Register = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const {email, password, first_name, last_name} = inputs;

  const [badRequest, setBadRequest] = useState(false);
  const [userExist, setUserExists] = useState(false);

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async (e) => {

    // when the register form is submitted, a post request is sent to the server
    // with the email, password, first name, and last name submitted. If the form is 
    // missing data or the email is not the correct pattern the response will have a status 400.
    // If the database already has a record using the email that was entered, the response
    // will have a status 401. If the request doesn't have any errors, a new record will be
    // created in the users table and a jwt token will be sent in the response and stored
    // in local storage

    e.preventDefault();
    try {
      const body = {email, password, first_name, last_name};

      const response = await fetch('http://localhost:3001/auth/register', {
                                   method:'POST',
                                   headers:{'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
      });

      if (!response.ok) {
        if (response.status === 400) {
          setBadRequest(true);
          setUserExists(false);
        } else if (response.status === 401) {
          setUserExists(true);
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
  <h1 className='text-center my-5'>Register</h1>
  {badRequest && <p class='invalid'>Fill out all fields and enter a valid email.</p>}
  {userExist && <p class='invalid'>The email you entered is already in use</p>}

  <form onSubmit={onSubmit}>
    <input type='email' name='email' placeholder='email' value={email} onChange={onChange} className='form-control my-3' />
    <input type='password' name='password' placeholder='password' value={password} onChange={onChange} className='form-control my-3' />
    <input type='text' name='first_name' placeholder='first name' value={first_name} onChange={onChange} className='form-control my-3' />
    <input type='text' name='last_name' placeholder='last name' value={last_name} onChange={onChange} className='form-control my-3' />
    <button className='btn btn-success btn-block'>Submit</button>
  </form>
  </>
}

export default Register;
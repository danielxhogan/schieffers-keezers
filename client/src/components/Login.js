import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const {email, password} = inputs;

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password};

      const response = await fetch('http://localhost:3001/auth/login', {
                                   method: 'POST',
                                   headers: {'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
      })

      const parseRes = await response.json();
      localStorage.setItem('token', parseRes);
      setAuth();

    } catch (err) {
      console.log(err.message);
    }
  };

  return <>
  <h1 className='text-center my-3'>Login</h1>

  <form onSubmit={onSubmit}>
    <input type='email' name='email' value={email} onChange={onChange} placeholder='email' className='form-control my-3' />
    <input type='password' name='password' value={password} onChange={onChange} placeholder='password' className='form-control my-3' />
    <button className="btn btn-success btn-block">Submit</button>
  </form>
  </>
}

export default Login;
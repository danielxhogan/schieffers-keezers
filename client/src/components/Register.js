import React, { useState } from 'react';

const Register = ({ setAuth }) => {

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });

  const {email, password, first_name, last_name} = inputs;

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = {email, password, first_name, last_name};

      const response = await fetch('http://localhost:3001/auth/register', {
                                   method:'POST',
                                   headers:{'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
                                  });

    const parseRes = await response.json();
    localStorage.setItem('token', parseRes);
    setAuth();
      
    } catch (err) {
      console.log(err.message);
    }
  };

  return <>
  <h1 className='text-center my-5'>Register</h1>
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
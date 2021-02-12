import React, { useState } from 'react';

const Admin = () => {

  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });
  const {name, description, price, category} = inputs;

  const [badRequest, setBadRequest] = useState(false);
  const [productExists, setProductExists] = useState(false);
  const [invalidCategory, setInvalidCategory] = useState(false);

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async (e) => {
    
    // When the product form is submitted, a post request is sent to the server
    // with the name, description, price, and category of the product

    // when the register form is submitted, a post request is sent to the server
    // with the email, password, first name, and last name submitted. If the form is 
    // missing data or the email is not the correct pattern the response will have a status 400.
    // If the database already has a record using the email that was entered, the response
    // will have a status 401. If the request doesn't have any errors, a new record will be
    // created in the users table and a jwt token will be sent in the response and stored
    // in local storage

    e.preventDefault();
    try {
      const body = {name, description, price, category};

      const response = await fetch('http://localhost:3001/product/add', {
                                   method:'POST',
                                   headers:{'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
      });

      if (!response.ok) {
        if (response.status === 400) {
          setBadRequest(true);
          setProductExists(false);
          setInvalidCategory(false);
        } else if (response.status === 401) {
          setProductExists(true);
          setBadRequest(false);
          setInvalidCategory(false);
        } else if (response.status === 404) {
          setInvalidCategory(true);
          setProductExists(false);
          setBadRequest(false);
        }
      } else {
        const parseRes = await response.json();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return <>
  <h1 className='text-center my-5'>Add a Product</h1>
  {badRequest && <p className='invalid'>Fill out all fields.</p>}
  {productExists && <p className='invalid'>The email you entered is already in use</p>}
  {invalidCategory && <p className='invalid'>The category you entered is invalid</p>}

  <form onSubmit={onSubmit}>
    <input type='text' name='name' placeholder='name' value={name} onChange={onChange} className='form-control my-3' />
    <input type='text' name='description' placeholder='description' value={description} onChange={onChange} className='form-control my-3' />
    <input type='text' name='price' placeholder='price' value={price} onChange={onChange} className='form-control my-3' />
    <input type='text' name='category' placeholder='category' value={category} onChange={onChange} className='form-control my-3' />
    <button className='btn btn-success btn-block'>Submit</button>
  </form>
  </>
}

export default Admin;
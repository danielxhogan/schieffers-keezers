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
  const [validEntry, setValidEntry] = useState(false);

  const onChange = e => {
    setInputs({...inputs, [e.target.name]: e.target.value})
  };

  const onSubmit = async (e) => {

    // When the product form is submitted, a post request is sent to the server
    // with the name, description, price, and category of the product. If there is
    // missing fields, an existing product by the same name, the price has an invalid format,
    // or the category isn't a valid category, the request will have an error status in the 
    // response. Otherwise, the new product will be added to the products tabel in the db.

    e.preventDefault();
    try {
      const body = {name, description, price, category};

      const response = await fetch('http://localhost:3002/product/add', {
                                   method:'POST',
                                   headers:{'Content-type': 'application/json'},
                                   body: JSON.stringify(body)
      });

      if (!response.ok) {
        if (response.status === 400) {
          setBadRequest(true);
          setProductExists(false);
          setInvalidCategory(false);
          setValidEntry(false);
        } else if (response.status === 401) {
          setProductExists(true);
          setBadRequest(false);
          setInvalidCategory(false);
          setValidEntry(false);
        } else if (response.status === 404) {
          setInvalidCategory(true);
          setProductExists(false);
          setBadRequest(false);
          setValidEntry(false);
        }
      } else {
        setValidEntry(true);
        setInvalidCategory(false);
        setProductExists(false);
        setBadRequest(false);
        setInputs({name: '', description: '', price: '', category: ''})
        const parseRes = await response.json();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return <>
  <h1 className='text-center my-5'>Add a Product</h1>
  {badRequest && <p className='invalid'>Fill out all fields. Make sure to enter a valid price.</p>}
  {productExists && <p className='invalid'>The name you entered is already in use</p>}
  {invalidCategory && <p className='invalid'>The category you entered is invalid</p>}
  {validEntry && <p>The product has been submitted</p>}

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
import React, {useState, useEffect} from 'react';
import Address from '../Address/Address';
import AddressForm from '../Address/AddressForm';
import ProductCard from './checkout-components/ProductCard'


const Checkout = (props) => {

  const [invalidRequest, setInvalidRequest] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0.0);
  const [hasAddress, setHasAddress] = useState(false);
  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState({
    'street': '',
    'city': '',
    'state': '',
    'zip': ''
  });

  const getAddress = async () => {
    const response = await fetch(props.BASE_URL + '/user/address', {
                                 method: 'GET',
                                 headers: {'token': localStorage.token}
    })
    if (!response.ok) {
      if (response.status === 404) {
        setEditing(true);
      }
    } else {
      const parseRes = await response.json();
      setEditing(false);
      setHasAddress(true);
      setAddress(parseRes);
    }
  }
  useEffect(() => { getAddress(); },[]);

  const getCartitems = async () => {

    // This function makes a request to the server for the cart
    // items of the user currently logged in. The request passes
    // the users jwt token which contains the users user_id which is
    // used to query the database for the users cart items.

    const response = await fetch(props.BASE_URL + '/user/getUserCart', {
                                 method: 'GET',
                                 headers: {token: localStorage.token}
    })
    const parseRes = await response.json();

    let total = 0.0
    for (let i=0.0; i<parseRes.length; i++) {
      total += parseFloat(parseRes[i].price);
    }
    
    setCartTotal(total);
    setCartItems(parseRes);
  }
  useEffect(() => { getCartitems(); },[]);

  const onClick = async (e) => {
    e.preventDefault();

    if (!hasAddress) {
      setInvalidRequest(true);
    } else {
      const response = await fetch(props.BASE_URL + '/checkout/checkout', {
                                   method: 'GET',
                                   headers: {token: localStorage.token}
      });

      if (!response.ok) {
        if (response.status == 401) {
          setInvalidRequest(true);
        }
      } else {
        console.log('suh');
        setInvalidRequest(false);
      }
    }

    
  }



  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return <>
    <div class='d-flex justify-content-between'>
      <h1>Checkout</h1>
      <h2>Total: {formatter.format(cartTotal)}</h2>
    </div>
    
    <div id='checkout-body'>

    {editing ?
      <AddressForm setEditing={setEditing} setAddress={setAddress} address={address} hasAddress={hasAddress} BASE_URL={props.BASE_URL}/>
      :
      <Address setEditing={setEditing} address={address} BASE_URL={props.BASE_URL}/>}
    </div>

    

    <div className='d-flex flex-wrap'>
      {cartItems.map(item => { return <ProductCard {...item} BASE_URL={props.BASE_URL} />})}
    </div>

    <div class='d-flex justify-content-right'>
      <button onClick={onClick}><h1>Checkout</h1></button>
      {invalidRequest && <p className='invalid'>you must have an address on file and choose atleast a freezer and a tap kit to checkout</p>}
    </div>
    
  </>
}

export default Checkout;
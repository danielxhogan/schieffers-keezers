import React, {useState, useEffect} from 'react';
import Address from '../Address/Address';
import AddressForm from '../Address/AddressForm';
import ProductCard from '../customize/customize-components/ProductCard'


const Checkout = (props) => {

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
      <button ><h1>Checkout</h1></button>
    </div>
    
  </>
}

export default Checkout;
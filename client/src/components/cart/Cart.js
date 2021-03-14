import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import CartItem from './cart-components/CartItem';

const Cart = (props) => {

  const [cartItems, setCartItems] = useState([]);
  const [user_name, set_user_name] = useState('');
  const [cartTotal, setCartTotal] = useState(0.0);

  const getName = async () => {
    const response = await fetch(props.BASE_URL + '/user/name', {
                                  method: 'GET',
                                  headers: {'token': localStorage.token}
                                  });
                              
    const parseRes = await response.json();
    set_user_name(parseRes);
  }
  getName();

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
    <div class='cart-title'>
      <div class='d-flex justify-content-between'>
       <h1>{user_name}'s Cart</h1>
       <h2>Total: {formatter.format(cartTotal)}</h2>
       <Link to='/checkout'>Checkout</Link>
      </div>
      
    </div>
    <div class='cart-display'>
      {cartItems.map(cartItem => {return <CartItem { ...cartItem}
                                                   BASE_URL={props.BASE_URL}
                                                   cartTotal={cartTotal}
                                                   setCartTotal={setCartTotal} />
                                                   })}
    </div>
  </>
}

export default Cart;
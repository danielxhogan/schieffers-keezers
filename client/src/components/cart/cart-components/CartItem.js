import React, {useState} from 'react';

const BASE_URL = 'http://localhost:3001';

const CartItem = (props) => {

  const [deleted, setDeleted] = useState(false);

  const deleteItem = async (req, res) => {
    const body = {cart_item_id: props.cart_item_id}

    const response = await fetch(BASE_URL + '/user/deleteCartItem', {
                                 method: 'delete',
                                 headers: {token: localStorage.token,
                                          'Content-type': 'application/json'},
                                 body: JSON.stringify(body)
    })
    if (!response.ok) {
      if (response.status === 403) {
        alert('You must be logged in');
      } else if (response.status === 500) {
        alert('There was a problem adding product to cart');
      }
    } else {
      setDeleted(true);
    }
  }

  return <>
    <div class={`cart-item ${deleted ? 'deleted' : ''}`}>
      <div class='d-flex justify-content-between'>
        <div>
          <h2>{props.name}</h2>
          <p>{props.description}</p>
          <p>${props.price}</p>
        </div>
        <img src={`images/${props.image}`} class='cart-image' />
        <button onClick={deleteItem} class='delete-button'>delete</button>
      </div>
    </div>
  </>
}

export default CartItem;
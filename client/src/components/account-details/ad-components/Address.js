import React from 'react';

const Address = (props) => {

  const onClick = () => {
    props.setEditing(true);
  }

  return <>
  <h2>Address</h2>
    <p>{props.address.street}</p>
    <p>{props.address.city}, {props.address.state} {props.address.zip}</p>
    <button onClick={onClick}>Edit</button>
  </>
}

export default Address;
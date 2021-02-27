import React from 'react';

const Address = (props) => {
  return <>
    <p>Address</p>
    <p>{props.address.street}</p>
    <p>{props.address.city}, {props.address.state} {props.address.zip}</p>
  </>
}

export default Address;
import React, {useState, useEffect} from 'react';
import Address from './checkout-components/Address';
import AddressForm from './checkout-components/AddressForm';


const Checkout = (props) => {

  const [address, setAddress] = useState({});
  const [hasAddress, setHasAddress] = useState(false);

  const getAddress = async () => {
    const response = await fetch(props.BASE_URL + '/user/address', {
                                 method: 'GET',
                                 headers: {'token': localStorage.token}
    })
    if (!response.ok) {
      if (response.status === 404) {
        setHasAddress(false);
      }
    } else {
      const parseRes = await response.json();
      setHasAddress(true);
      setAddress(parseRes);
    }

  }
  useEffect(() => { getAddress(); },[]);





  return <>
    <h1>Checkout</h1>
    <div id='checkout-body'>
    <h2>Address</h2>

    {hasAddress ?
      <Address address={address}/>
      :
      <AddressForm />}




    </div>
    
  </>
}

export default Checkout;
import React, {useState, useEffect} from 'react';
import Address from '../Address/Address';
import AddressForm from '../Address/AddressForm';


const AccountDetails = (props) => {

  const [editing, setEditing] = useState(false);
  const [address, setAddress] = useState({
    'street': '',
    'city': '',
    'state': '',
    'zip': ''
  });

  const getAddress = async () => {
    const response = await fetch('/user/address', {
                                 method: 'GET',
                                 headers: {'token': localStorage.token}
    })
    if (!response.ok) {
      if (response.status === 404) {
        setEditing(true);
      }
    } else {
      const parseRes = await response.json();
      setAddress(parseRes);
    }
  }
  useEffect(() => { getAddress(); },[]);

  return <>
    <h1>Account Details</h1>
    <div id='ad-body'>

      {editing ?
      <AddressForm setEditing={setEditing} setAddress={setAddress} address={address} BASE_URL={props.BASE_URL}/>
      :
      <Address setEditing={setEditing} address={address} BASE_URL={props.BASE_URL}/>}

    </div>
  </>
}

export default AccountDetails;
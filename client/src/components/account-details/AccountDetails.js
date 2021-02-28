import React, {useState, useEffect} from 'react';
import Address from './ad-components/Address';
import AddressForm from './ad-components/AddressForm';


const AccountDetails = (props) => {

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
      <Address address={address} setEditing={setEditing} BASE_URL={props.BASE_URL}/>}

    </div>
  </>
}

export default AccountDetails;
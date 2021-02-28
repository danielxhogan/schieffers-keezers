import React, {useState} from 'react';

const AddressForm = (props) => {

  const [badRequest, setBadRequest] = useState(false);

  const [inputs, setInputs] = useState({
    'street': props.address.street,
    'city': props.address.city,
    'state': props.address.state,
    'zip': props.address.zip
  });
  const {street, city, state, zip} = inputs;

  const onChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {street, city, state, zip};

      const response = await fetch(props.BASE_URL + '/user/update-address', {
                                   method: 'POST',
                                   headers: {'Content-Type': 'application/json',
                                             'token': localStorage.token},
                                  body: JSON.stringify(body)                       
      });
      if (!response.ok) {
        if (response.status === 400) {
          setBadRequest(true);
        } else if (response.status === 403) {
          window.location.reload();
        }
      } else {
        const parseRes = await response.json();
        props.setAddress(parseRes);
        props.setEditing(false);
      }
    } catch (err) {
      console.log(err.message)
    };
  };

  const onClick = (e) => {
    e.preventDefault();
    props.setEditing(false);
  }

  return <>
  <h2>Update Address</h2>
    {badRequest && <p className='invalid'>Fill out all fields.</p>}
    <form onSubmit={onSubmit}>
      <div className='pb-4'>
        <p>Street</p>
        <input type='text' name='street' value={street} onChange={onChange}></input>
        <p className='pt-4'>City</p>
        <input type='text' name='city' value={city} onChange={onChange}></input>
        <p className='pt-4'>State</p>
        <input type='text' name='state' value={state} onChange={onChange}></input>
        <p className='pt-4'>Zip</p>
        <input type='text' name='zip' value={zip} onChange={onChange}></input>
      </div>
      <div>
        <button type='submit' id='submit-address'>Submit</button>
        <button onClick={onClick}>Cancel</button>
      </div>
    </form>
  </>
}

export default AddressForm;
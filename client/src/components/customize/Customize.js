import React, {useState, useEffect} from 'react';
import '../../App.css';
import ProductCard from './customize-components/ProductCard';

const Customize = (props) => {

  // DYNAMICALLY SEPERATING ALL PRODUCTS BY CATEGORY
  // ****************************************************************************
  // const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);

  // const getTypes = async () => {
  //   const response = await fetch(props.BASE_URL + '/product/types');
  //   const parseRes = await response.json();
  //   const array = []

  //   for (let i=0; i<parseRes.length; i++) {
  //     array.push(parseRes[i].name);
  //   }
  //   setCategories(array);
  // }
  // useEffect(() => { getTypes(); },[]);

  // const getAll = async () => {
  // const response = await fetch(props.BASE_URL + '/product/all')
  // const parseRes = await response.json();
  // setProducts(parseRes);
  // }
  // useEffect(() => { getAll(); },[]);

  // const itemsByType = {}

  // for (let i=0; i<categories.length; i++) {
  //   itemsByType[categories[i]] = [];
  // }

  // for (let i=0; i<products.length; i++) {
  //   itemsByType[products[i].category].push(products[i]);
  // }
  // console.log('itemsByType: ', itemsByType);

  // NOT DYNAMICALLY SEPERATING ALL PRODUCTS BY CATEGORY
  // ****************************************************************************
  // state variables used for holding data on each product, seperated by category

  const [freezers, setFreezers] = useState([]);
  const [tapkits, setTapKits] = useState([]);
  const [dripPans, setDripPans] = useState([]);
  const [thermostats, setThermostats] = useState([]);
  const [c02Tanks, setC02Tanks] = useState([]);

  // functions for querying the db for data on products of each category

  const getFreezers = async () => {
    const response = await fetch(props.BASE_URL + '/product/freezer');
    const parseRes = await response.json();
    setFreezers(parseRes);
  }
  useEffect(() => { getFreezers(); },[]);

  const getDripPans = async () => {
    const response = await fetch(props.BASE_URL + '/product/drippan');
    const parseRes = await response.json();
    setDripPans(parseRes);
  }
  useEffect(() => { getDripPans(); },[]);

  const getThermostats = async () => {
    const response = await fetch(props.BASE_URL + '/product/thermostat');
    const parseRes = await response.json();
    setThermostats(parseRes);
  }
  useEffect(() => { getThermostats(); },[]);

  const getTapKits = async () => {
    const response = await fetch(props.BASE_URL + '/product/tapkit');
    const parseRes = await response.json();
    setTapKits(parseRes);
  }
  useEffect(() => { getTapKits(); },[]);

  const getC02Tanks = async () => {
    const response = await fetch(props.BASE_URL + '/product/c02tank');
    const parseRes = await response.json();
    setC02Tanks(parseRes);
  }
  useEffect(() => { getC02Tanks(); },[]);

  // onSubmit functions for adding products of each category to cart

  const submitFreezer = async (e) => {
    e.preventDefault();
    const product_id = e.target.freezer.value;
    if (product_id === '') {
      alert('You have to choose a freezer.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(props.BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
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
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const submitTapkit = async (e) => {
    e.preventDefault();
    const product_id = e.target.tapkit.value;
    if (product_id === '') {
      alert('You have to choose a tap kit.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(props.BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
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
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const submitDripPan = async (e) => {
    e.preventDefault();
    const product_id = e.target.drippan.value;
    if (product_id === '') {
      alert('You have to choose a drip pan.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(props.BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
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
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }

  const submitThermostat = async (e) => {
    e.preventDefault();
    const product_id = e.target.thermostat.value;
    if (product_id === '') {
      alert('You have to choose a thermostat.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(props.BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
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
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }
  
  const submitC02Tank = async (e) => {
    e.preventDefault();
    const product_id = e.target['c02tank'].value;
    console.log(product_id);
    if (product_id === '') {
      alert('You have to choose a c02 tank.');
    } 
    else {
      try {
        const body = {product_id: product_id, qty: 1}
        
        const response = await fetch(props.BASE_URL + '/user/addCartItem', {
                                     method: 'POST',
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
          alert('Product was successfully added to cart');
        } 
      } catch (err) {
        console.log(err.message);
      }
    }
  }





  // const onSubmit = async (e, category) => {
  //   e.preventDefault();
  //   const product_id = e.target[category].value;
  //   console.log(product_id);
  //   // if (product_id === '') {
  //   //   alert('You have to choose a c02 tank.');
  //   // } 
  //   // else {
  //   //   try {
  //   //     const body = {product_id: product_id, qty: 1}
        
  //   //     const response = await fetch(props.BASE_URL + '/user/addCartItem', {
  //   //                                  method: 'POST',
  //   //                                  headers: {token: localStorage.token,
  //   //                                            'Content-type': 'application/json'},
  //   //                                  body: JSON.stringify(body)
  //   //     })
  //   //     if (!response.ok) {
  //   //       if (response.status === 403) {
  //   //         alert('You must be logged in');
  //   //       } else if (response.status === 500) {
  //   //         alert('There was a problem adding product to cart');
  //   //       }
  //   //     } else {
  //   //       alert('Product was successfully added to cart');
  //   //     } 
  //   //   } catch (err) {
  //   //     console.log(err.message);
  //   //   }
  //   // }
  // }







  // const createForm = (category) => {
  //   console.log('creating form');

  //   return <>
  //     <form onSubmit={category => { return onSubmit(category) }} className='p-5'>
  //       <h2>Choose your {category}</h2>
  //       <div classname='d-flex flex-wrap'>
  //         {itemsByType[category].map(item => {return <ProductCard {...item} BASE_URL={props.BASE_URL} />})}
  //       </div>
  //       <buttom type='submit' className='cart-button'>Add To Cart</buttom>
  //     </form>
  //   </>
  // }



  return <>
    <h1>Customize Your Keezer</h1>


    {/* {categories.map(category => { return createForm(category) })}
    {console.log(categories)} */}



    <form onSubmit={submitFreezer} className='p-5'>
      <h2>Choose Your Freezer</h2>
      <div className='d-flex flex-wrap'>
        {freezers.map(freezer => {return <ProductCard {...freezer} BASE_URL={props.BASE_URL} />})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitTapkit} className='p-5'>
      <h2>Choose Your Tap Kit</h2>
      <div className='d-flex flex-wrap'>
        {tapkits.map(tapkit => {return <ProductCard {...tapkit} BASE_URL={props.BASE_URL}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitDripPan} className='p-5'>
      <h2>Choose Your Drip Pan</h2>
      <div className='d-flex flex-wrap'>
        {dripPans.map(dripPan => {return <ProductCard {...dripPan} BASE_URL={props.BASE_URL}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitThermostat} className='p-5'>
      <h2>Choose Your Thermostat</h2>
      <div className='d-flex flex-wrap'>
        {thermostats.map(thermostat => {return <ProductCard {...thermostat} BASE_URL={props.BASE_URL}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>

    <form onSubmit={submitC02Tank} className='p-5'>
      <h2>Choose Your C02 Tank</h2>
      <div className='d-flex flex-wrap'>
        {c02Tanks.map(c02Tank => {return <ProductCard {...c02Tank} BASE_URL={props.BASE_URL}/>})}
      </div>
      <button type='submit' className='cart-button'>Add To Cart</button>
    </form>
  </>
}

export default Customize;
import React, {useState, useEffect} from 'react';
import '../../App.css';
import ProductCard from './customize-components/ProductCard';

const Customize = (props) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getTypes = async () => {
    const response = await fetch('/product/types');
    const parseRes = await response.json();
    const array = []

    for (let i=0; i<parseRes.length; i++) {
      array.push(parseRes[i].name);
    }
    setCategories(array);
  }
  useEffect(() => { getTypes(); },[]);

  const getAll = async () => {
  const response = await fetch('/product/all')
  const parseRes = await response.json();
  setProducts(parseRes);
  }
  useEffect(() => { getAll(); },[]);

  const itemsByType = {}

  for (let i=0; i<categories.length; i++) {
    itemsByType[categories[i]] = [];
  }

  for (let i=0; i<products.length; i++) {
    itemsByType[products[i].type].push(products[i]);
  }


  const createForm = (category) => {
    const onSubmit = async (e) => {
      e.preventDefault();
      const product_id = e.target[category].value;
      if (product_id === '') {
        alert(`You have to choose a ${category}.`);
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

    return (
      <form onSubmit={ onSubmit } className='p-5'>
        <h2>Choose your {category}</h2>
        <div className='d-flex flex-wrap'>
          {itemsByType[category].map(item => <ProductCard {...item} BASE_URL={props.BASE_URL} />)}
        </div>
        <button type='submit' className='cart-button'>Add To Cart</button>
      </form>
    )
  }


  return <>
    <h1>Customize Your Keezer</h1>
    {categories.map(category => createForm(category))}
  </>
}

export default Customize;
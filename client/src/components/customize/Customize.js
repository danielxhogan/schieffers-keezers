import React, {useState, useEffect} from 'react';
import '../../App.css';
import ProductCard from './customize-components/ProductCard';

const BASE_URL = 'http://localhost:3001';

const Customize = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {

    // This function makes a request to the server for product information
    // on all products which will be used to render ProductCard components
    // for each product.

    const response = await fetch(BASE_URL + '/product/all');
    const products = await response.json();
    console.log(products);
    setProducts(products);
  }
  useEffect(() => {
    getProducts();
  },[]);

  const makeProductCard = (product) => {
    return <>
      <ProductCard {...product} />
    </>
  }



  return <>
    <h1 className='border'>Customize Your Keezer</h1>

    <div className='d-flex flex-wrap'>
      {products.map(product => makeProductCard(product))}
    </div>
    








  </>
}

export default Customize;
import React, { useState, useEffect } from 'react';
import './style.css';

function BrandList() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clickedBrands, setClickedBrands] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://gist.githubusercontent.com/sandeepdillerao/edb372a95d6cf1a2a49b79577d023281/raw/75bf5e59e47748fad0d01ca63c81dd3791c2615c/product.json'
      );
      const data = await response.json();
      setProducts(data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const brandSet = new Set(products.map((product) => product.brand));
    const brandArray = Array.from(brandSet).map((brand) => ({
      brand: brand,
      count: products.filter((product) => product.brand === brand).length,
    }));
    setBrands(brandArray);
  }, [products]);

  const devices = products.filter((item) => item.brand == clickedBrands);

  const onRemove = (product) => {};
  const onAdd = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      console.log(cart)
      
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div class="container">
      <div>
        <h1>Brands</h1>
        <ul>
          {brands.map((brand) => (
            <>
              <li key={brand.brand}>
                <span
                  class="brands"
                  onClick={() => setClickedBrands(brand.brand)}
                >
                  {' '}
                  {brand.brand}{' '}
                </span>
                <br />
                <span>Product Count: ({brand.count})</span>
              </li>
              <hr />
            </>
          ))}
        </ul>
      </div>
      <div>
        <h1>Products of {clickedBrands} </h1>
        <ul>
          {devices.map((product) => (
            <>
              <li>{product.name}</li>
              <br />

              <span className="price">Price : ({product.price})</span>
              <button className="button" onClick={() => onRemove(product)}>
                -
              </button>
              <span> 1 </span>
              <button className="button" onClick={() => onAdd(product)}>
                +
              </button>

              <hr />
            </>
          ))}
        </ul>
      </div>

      <div>
        <h1>Cart</h1>
        <ul>
            {cart.map((product)=>(
              <>
              <li>{product.name}</li>
              
              <span>Qty: ({product.quantity})  Total:()</span>
              
              <hr/>


              </>
            ))}
            </ul>
      </div>
    </div>
  );
}

export default BrandList;

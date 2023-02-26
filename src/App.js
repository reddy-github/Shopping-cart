import React, { useState, useEffect } from 'react';
import './style.css';

function BrandList() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [clickedBrands, setClickedBrands] = useState();
  const [cart, setCart] = useState([]);
  //const [isCartNotEmpty, setIsCartNotEmpty] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

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

  const onRemove = (product) => {
    const updatesCart = [...cart];
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== 1) {
      if (updatesCart[index].quantity > 1) {
        updatesCart[index].quantity -= 1;
        setCart(updatesCart);
      } else {
        updatesCart.splice(index, 1);
        setCart(updatesCart);
        //if (updatesCart.length === 0) {
       //   setIsCartNotEmpty(false);
       // }
      }
    }
  };
  const onAdd = (product) => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
      console.log(cart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    //setIsCartNotEmpty(true);
  };

  const onCheckOut=(e)=>{
      e.preventDefault();
          if ((name !=='') && (name.length<50) && (/^[A-Za-z]+$/.test(name)) ){
            
              setNameError('');
            }else{
              setNameError('Please enter Valid name');
            }


           if(email!=='' && (/\S+@\S+\.\S+/).test(email)){
              setEmailError('');
                }
           else {
               setEmailError('Please enter Valid email');
               } 



            if(mobile !=='' && (/^[6-9]\d{9}$/).test(mobile) && mobile.length==10){
              setMobileError('')
            }
            else{
              setMobileError('Please enter Valid number');
            }

            if (nameError=='' && emailError=='' && mobileError=='') {

                console.log('Order Summary')
                console.log(name)
                console.log(email)
                console.log(mobile);
                const  review=cart.filter((item)=>(
                  <li key={item.id}> Brand: {item.brand}  Name: {item.name}</li>
                 ))
                 console.log(review);
               
                 console.log(numberOfItems);
                 console.log( grandTotal);
                
                


            };

            
  }


  const numberOfItems=cart.reduce((total,item)=>total+item.quantity,0);
  const grandTotal=cart.reduce((total,item)=>total+item.price*item.quantity,0);

  return (
    <div class="container">
      <div className="sub-container brands-container">
        <h3>Brands</h3>
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
      <div className="sub-container products-container">
        <h3>Products of {clickedBrands} </h3>
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

      <div className="sub-container ">
        <div className="cart">
          <h3>Cart</h3>
          <ul>
            {cart.map((product) => (
              <>
                <li>{product.name}</li>

                <span>Qty: ({product.quantity}) </span>

                <span>Total: ({product.quantity * product.price}) </span>

                <hr />
              </>
            ))}
          </ul>
        </div>
        <div className="checkout-contianer">
          <h3>Total N.o of Items: ({numberOfItems})</h3>
          <h3>Grand Total: ({grandTotal})</h3>
          <form className="form" >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              
            />
            
            {nameError && <span>{nameError}</span>}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            
            {emailError && <span>{emailError}</span>}

            <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Mobile"

            />
             {mobileError && <span>{mobileError}</span>}

            <button onClick={onCheckOut} className="button-checkout">Checkout</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BrandList;

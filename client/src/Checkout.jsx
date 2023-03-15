import { Block, LocalHospital } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useNavigate } from 'react-router-dom';
import Cart_item from './Cart_item';
import './Checkout.css';
import { useStateValue } from './StateProvider';

function Checkout() {
  const [state,dispatch]=useStateValue();
  const navigate=useNavigate();
  function countValue()
  {
    let price=0;
    state.basket.forEach(item=>
      {
        price=price+item.price;
      });
      return price;
  }

  function remove_item(idx,title1,index1)
  {
    dispatch( 
      {
        type:"REMOVE_FROM_CART",
        id:idx,
        pay:1,
        title:title1,
        index:index1
      }
    );
  }
  return (
    <div className='checkout'>
      <div className='left_part'>
        <h1 className='heading' >Shopping Cart</h1>
        {state.basket.map((item,index) =>
        {
          return <Cart_item 
          img={item.img}
          title={item.title}
          rating={item.rating}
          price={item.price}
          remove_item={remove_item}
          index={index}
          id={item._id}
          />
        })}
        
      </div>
      <div className='right_part'>
        <p> Subtotal ({state.basket.length} items) : 
        <CurrencyFormat value={countValue()}  displayType={'text'} thousandSeparator={true} prefix={'₹'} />
        </p>
        <input className='gift_class' type='checkbox'/>
        <p className='gift_class'>This oder contains a gift</p>
        <button className='buy_btn' onClick={()=> navigate('/payments')}>Proceed to Buy</button>
      </div>
    
    </div>
  )
}

export default Checkout

{/* <Cart_item
          img='https://m.media-amazon.com/images/I/81QqVNKWtML._SX679_.jpg'
          title='Realme narzo 50i (Mint Green, 2GB RAM+32GB Storage) Octa Core Processor | 6.5" inch Large Display | Made in China | 2 yr gaurantee'   
          rating={5}
          price={12200}
        /> */}


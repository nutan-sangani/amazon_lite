import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState,useEffect } from 'react';
import Cart_item from './Cart_item';
import './Payments.css';
import { useStateValue } from './StateProvider';
import { CardElement} from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

function Payments() {
    const [state,dispatch]=useStateValue();
    const [disable,setDisable]=useState(false);
    const [processing,setProcessing]=useState(false);
    const [clientSecret,setSC]=useState('');
    const [error,setError]=useState('');
    const stripe=useStripe();
    const elements=useElements();

    useEffect(() => {
      window.fetch('/payment-intent',{
        method:'POST'
      ,body:JSON.stringify({items:["data"]})})
      .then(res=>{return res.json()})
      .then(data=>{
        setSC(data.clientSecret);
        alert(data.clientSecret);
      });
    }, []);
  
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

const handleSubmit= async (e)=>
{
  e.preventDefault();
  const payload = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: elements.getElement(CardElement)
    }
  });
  if(payload.error) console.log(payload.error);
  else alert("payment failed");
}

  return (
    <div className='payment_container' >
    <div className='link_to_checkout'>
      <h1 > CheckOut (
        <Link to='/checkout' >
         {state.basket.length?state.basket.length:0} items
         </Link>)</h1>
    </div>
        <div className='address1'>
            <div className='left_part1'>
                <h2>Delivery Address</h2> 
            </div>
            <div className='right_part1'>
                <span>A/102 parmatma nagar building, 
                waliv gaon, Vasai(east), 
                Maharashtra, 
                India</span>
            </div>
            
        </div>

        <div className='product_info'>
            <div className='left_part1'>
                <h2>Cart Items</h2> 
            </div>
            <div className='right_part1'>
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
        </div>

        <div className='payment_info'>
            <div className='left_part1'>
                <h2>Payment's Information</h2>
            </div>
            <div className='right_part1'>
                <form className='payment_form' onSubmit={handleSubmit}>
                <CardElement style='width:80%'
                />
                <h4> Order Total : 
                <CurrencyFormat value={countValue()}  
                displayType={'text'} 
                thousandSeparator={true} 
                prefix={'₹'} /></h4>
                <button className='button'
                disabled={disable||processing||error?true:false}
                ><h2>Buy now</h2></button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Payments;
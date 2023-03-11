import React from 'react';
import product_img from './product.jpg';
import './Product.css';
import { useStateValue } from './StateProvider';
function Product(props) {
  const [state,dispatch]=useStateValue();
  //this is used to access the data in the data layer.

  function addToBasket()
  { //dispatch is used to push data about state to the data layer.
    dispatch({
      type:"ADD_TO_CART",
      item:{
        img:props.img,
        title:props.title,
        price:props.price,
        rating:props.rating
      },
      pay:state.user
    });
    //console.log(state);
  }
  return (
    <div className='product'>
        
        <img className='pro_img'
        src={props.img} alt='product image'/>
        <strong className='pro_title'>{props.title}</strong>
        <strong className='ratings'>
        {Array(props.rating).fill().map((val,index)=>{
        return <p className='ratings'>⭐</p>})}
        </strong>
        <span ><p className='limited_time' >Limited time deal</p></span>
        <strong className='price'><small>₹</small> {props.price}</strong>
        <button 
        className='pro_btn' onClick={addToBasket}><p className='add'>Add to Cart</p></button>
    </div>
  )
}

export default Product;

//destructuring the state to basket is not working, when we try to do it, 
//the website goes blank.
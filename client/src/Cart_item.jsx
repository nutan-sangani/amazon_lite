import React from 'react'
import './Cart_item.css'

function Cart_item(props) {
  return (
    <div className='cart_item'>
     <div>
        <img className='cart_img' src={props.img} alt='product image'/>
     </div>
     <div>
        <h1 className='cart_title'>{props.title}</h1>
        <strong className='ratings'>
        {Array(props.rating).fill().map((val,index)=>{
        return <p className='cart_rating'>⭐</p>})}
        </strong>
        <strong className='cart_price'><small>₹</small> {props.price}</strong>
        <button className='cart_btn' onClick={()=>{
        props.remove_item(props.id,props.title,props.index); //id ke badle index
        return;
        }
        }>Remove from Cart</button>
     </div>
    </div>
  )
}

export default Cart_item
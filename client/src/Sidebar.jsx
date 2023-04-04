import React from 'react'
import {color, motion} from 'framer-motion';
import './Sidebar.css';
import { FaBars,FaBinoculars } from "react-icons/fa";
import { useStateValue } from './StateProvider';
import {SiAddthis} from 'react-icons/si';
import {BsFillHouseAddFill} from 'react-icons/bs';
import {AiFillShopping} from 'react-icons/ai';
import {MdShoppingCartCheckout} from 'react-icons/md';
import {RiSecurePaymentFill} from 'react-icons/ri';
import {Link, NavLink} from 'react-router-dom';
function Sidebar({children}) {
  const [state,dispatch]=useStateValue();
  const items=[
    {
      name:'Checkout',
      link:'/checkout',
      icon:<MdShoppingCartCheckout/>,
    },
    {
      name:'Complete Order',
      link:'/payments',
      icon:<RiSecurePaymentFill/>
    },
    {
      name:'Admin Dashboard',
      link:'/admin_dashboard',
      icon:<FaBinoculars/>,
    },
    {
      name:'Add Product',
      link:'/add_product',
      icon:<SiAddthis/>,
    },
    {
      name:'Address Details',
      link:'/address_details',
      icon:<BsFillHouseAddFill/>,
    },
    {
      name:'My Orders',
      link:'/my_orders',
      icon:<AiFillShopping/>,
    }
  ];
  const toggle=state.sidebar;
  return (
    <div className='sidebar'>
    <motion.div 
    animate={{width:state.sidebar?'220px':'0px',backgroundColor:'#131A22'
    ,height:'100%',paddingTop:'67px',}} className='motion_div'>
    
    <section className='routes'>
    {items.map((item)=>{
      return <div>
      <Link className='item_link' to={item.link} key={item.name}>
        <div className='item_icon'>{item.icon}</div>
        <div className='item_name'>{item.name}</div>
      </Link>
      </div>
    })}
    </section>

    </motion.div>
        <main>
            {children}
        </main>
    </div>
  )
}

export default Sidebar
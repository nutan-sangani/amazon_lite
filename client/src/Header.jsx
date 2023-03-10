import React, { useEffect } from 'react'
import img from './amazon.png';
import './Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import {
    Link
  } from "react-router-dom";
import { useStateValue } from './StateProvider';
import axios from 'axios';

function Header() {
    const signin="Hello, sign in";
    const account="Account & Lists";
    const signout="Sign out"
    const[state,dispatch]=useStateValue();
    function logout()
    {
        axios.get('/logout')
        .then(
            dispatch({
                type:'REMOVE_USER'
            })
        )
    }
    useEffect(()=>
    {
        fetch('/isAuthenticated')
        .then(res=>res.json())
        .then((json)=> {
            dispatch(
                {
                  type:'ADD_USER',
                  pay:json.data
                });
        })
    },[]);
  return (
    <div className='header'>
        <div className='logo'>
        <Link to='/'>
        <img src={img} className='picture' alt='amazon logo'/>
        </Link>
        </div>
        <div className='address'>
            <span className='lineOne'>Deliver to</span>
            <span className='lineTwo'>India</span>
        </div>
        <div className='search_box'>
            <input name='search_space'
            className='search' type='text'></input>
            <SearchIcon fontSize="large" className='search_logo'/>
        </div>
        <Link to='/login'>
        <div className='optionOne' onClick={()=> { logout()}}>
            <span className='lineOne'>{state.user?state.user:signin}</span>
            <span className='lineTwo'>{state.user?signout:account}</span>
        </div>
        </Link>
        <div className="optionTwo">
            <span className='lineOne'>Returns</span>
            <span className='lineTwo'>& Orders</span>
        </div>
        <div className='optionThree'>
            <span className='lineOne'>
                <Link to='/checkout'>
                <ShoppingCartIcon color='white' fontsize='large'/>
                </Link>
            </span>
            <span className='count'>{state.basket.length}</span>
            {/* {state.basket?state.basket.length:0} */}
        </div>

    </div>
  )
}

export default Header

//the navbar is only sticking to the header part, since the home part is not coming under it.
//solved this by making its position fixed, it was happeningas it was only sticking to its parent.

//link from react-router-dom not working, used a instead.
//was not working, since in app.jsx, the header was outside the router tag, thus header was not able to use link
//which is a feature of router only

//using link instead of anchor tag, sice anchor tag me website reload hoti h, isme nhi hoti.
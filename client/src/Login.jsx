import React from 'react';
import { Link, Navigate, redirect } from 'react-router-dom';
import img from './amz2.png';
import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useStateValue } from './StateProvider';

function Login() {
  const [email,setEmail]=useState('');
  const [password1,setPass]=useState('');
  const navigate=useNavigate();
  const [state,dispatch]=useStateValue();

  function submit_handle(event)
  {
    event.preventDefault();
    axios.post('/login',{username:email,password:password1})
    .then(function(res)
    {
      dispatch(
      {
        type:'ADD_USER',
        pay:email
      });
      dispatch(
        {
          type:'GET_CART'
        }
      );
      navigate('/');
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function register(event)
  {
    event.preventDefault();
    axios.post('/register',{username:email,password:password1})
    .then(function(res)
    {
      dispatch(
        {
          type:'ADD_USER',
          pay:email
        });
        navigate('/');
    })
    .catch(function(err)
    {
      console.log(err);
    })

  }

  function email_set(e)
  {
    setEmail(e.target.value);
  }

  function pass_set(e)
  {
    setPass(e.target.value);
  }

  return (
    <div>\
        <Link to='/'>
            <img src={img} className='picture' alt='amazon logo'/>
        </Link>
        <div className='login_container'>
            <h1 className='sign_in'> Sign in </h1>
            <form onSubmit={submit_handle} className='form' method='/login' action='post'>
                <h4>Email</h4>
                <input type='email' name='username' value={email} onChange={email_set}></input>
                <h4>Password</h4>
                <input type='Password' name='password'  value={password1} onChange={pass_set}></input>
                <button className='signinbtn button' type='submit'><h4>Continue</h4></button>   
                <p>
                By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                </p>
            </form>
        </div>
        <div className='signup'>
        <h1 >New to Amazon? </h1>
        <form >
            <button type='submit' className='button1' onClick={register}>Create your Amazon Account</button>
        </form>
        </div>
    </div>
  )
}

export default Login

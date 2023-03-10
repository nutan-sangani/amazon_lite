import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header.jsx';
import Home from './Home.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Checkout from './Checkout.jsx';
import Login from './Login.jsx';
import Payments from './Payments.js';
import {loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';

const promise=loadStripe("pk_test_51MXUrNSCkti21Tecp0DVPRGM2yYRbJU49LxogZw0CMmRqrASPazitsGaMlNZY1DJdEAtqoM4gOubNprBK67hvt7e00zOCTnmhj");

function App() {
  return (
    <div>
    <Router>
     <Routes>
      <Route path='/checkout' element={
        <div>
          <Header/>
          <Checkout/>
        </div>
      }/>
      
      <Route path='/login' 
      element={<Login/>}
      />
      <Route path='/payments'
      element={
        <div>
        <Elements stripe={promise}> 
        <Header/>
        <Payments/>
        </Elements> 
        </div>
      } />

      <Route path='/' element={ 
      <div>
      <Header/>
      <Home />
      </div>
      }/>
     </Routes>
    </Router>
    </div>
  );
}
//see the latest version of react-router-dom
export default App;

 


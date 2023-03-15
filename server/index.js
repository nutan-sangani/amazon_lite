const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const { Schema } = require('mongoose');
const { model } = require('mongoose');
// const cors=require('cors');
const stripe=require('stripe')('sk_test_51MXUrNSCkti21TecqkCskLJUODGEVC8NOb7LhusQjLJp1vpCK9Mli7RQ7MdIwwDzYuQxGOZmXlvJ772xNVx2JAJF00GlIrYRIQ');


//Import the main Passport and Express-Session library
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose=require('passport-local-mongoose');

app.use(session({
  secret: "my website's secret",
  resave: false ,
  saveUninitialized: true ,
}));

// app.use(cors());

app.use(passport.initialize()) ;
// init passport on every route call.
app.use(passport.session());    
// allow passport to use "express-session".
var LocalStrategy = require('passport-local');
const e = require('express');



app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json());
  // This is the basic express session({..}) initialization.


mongoose.connect('mongodb://127.0.0.1:27017/amazon_login');

const log_schema=new mongoose.Schema({
    username:String, password:String
});

const basket_item=new mongoose.Schema({title:String,price:Number,img:String,rating:Number});
const Basket=new mongoose.model('Basket',basket_item);

log_schema.plugin(passportLocalMongoose);

const User= new mongoose.model('User',log_schema);

const user_basket_schema=new mongoose.Schema({email:String,item:[basket_item]});
const user_basket=new mongoose.model('User_basket',user_basket_schema);
//so now this user basket is a collection of users who have their baskets.


//passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));



app.post('/login', passport.authenticate('local'), function(req, res) {
  if(req.isAuthenticated())
  {
    res.send('hello');
  }
  else{ res.send('who are you boi!!!!')};
  
  // req.logout(function(err)
  // {
  //   if(err) console.log(err);
  // });
  // console.log(req.isAuthenticated());
 // res.json({msg:'hello new user!!!!!'});
  // res.send('success in logging in');
  
});

app.post('/add_to_basket',function(req,res){ //isme error tha ki add krte waqt hum _id nhi dete, jiske wajah se deletion nhi ho rha tha.
  //console.log(req.body.title);
  // const nitem=new Basket({name:req.body.title,ratings:req.body.rating,price:req.body.price,
  //   image:req.body.img});
    
  // nitem.save(err=>{if(err) console.log(err); else console.log('done');});
  // res.send('done')
  
  //now we will check if the user already has a basket, if yes toh push the new item, or else create new user_basket
  console.log(req.body.user);
  user_basket.findOne({email:req.body.user},async function(err,found_item)
  {
    if(found_item!=null)
    {
      await found_item.item.push({title:req.body.item.title,rating:req.body.item.rating,price:req.body.item.price,
        img:req.body.item.img});
      console.log(found_item);
      await found_item.save();
      // const id=found_item.item.filter(item1=>
      //   {
      //     return item1.title==req.body.item.title;
      //   });
      //   console.log(id[0].id);
      res.send(found_item.item); 
    }
    else if (!err){
        const nitem=new Basket({title:req.body.item.title,rating:req.body.item.rating,price:req.body.item.price,
          img:req.body.item.img});
        const bitem=new user_basket({email:req.body.user,item:nitem});
        bitem.save();
        console.log('not found');
        res.send('done');
    }
    else {
      console.log(err);
    }
  })
});

app.get('/get_cart',function(req,res)
{
  //console.log(req.user);
  user_basket.findOne({email:req.user.username},function(err,found_item)
  {
    if(found_item)
    {
     // console.log(found_item.item[0]);
     //  var new_arr=found_item.item.map(({img,price,rating,title,_id})=>{img,price,rating,title});
     var basket=[];
      found_item.item.forEach(it => 
      { var img=it.img;
        var title=it.title;
        var rating=it.rating;
        var price=it.price;
        var _id=it._id;
        const obj={img,title,rating,price,_id};
        basket.push(obj);
      });
      //console.log(basket);
      res.send(basket);
    //  console.log(new_arr);
    //  res.send(new_arr);
    }
    else res.send('empty');
  })
});

app.get('/isAuthenticated',function(req,res)
{
  if(req.isAuthenticated())
  {
    //console.log(req.user.username)
    res.send({data:req.user.username});
  }
  else 
  {
    res.send("nope is not authenticated");
  }
});

app.get('/logout',function(req,res)
{
  req.logOut(()=>{
    res.send('logged out');
  });
})

app.post('/delete_cart_item',function(req,res)
{
  console.log(req.body.idx);
  user_basket.findOne({email:req.body.user},function(err,found_item)
  {
  //  // console.log(found_item.item.length());
  //   found_item.item.splice(req.index,1);
  //  // console.log(found_item.item.length());
  //   found_item.save();
  found_item.item.map((item1,index)=>{
    if(item1._id==req.body.idx)
    {
      //console.log(index);
      console.log(index);
      found_item.item.splice(index,1);
      found_item.save();
    //  res.send(found_item.item); deleting seperately in the frontend, since waha pe we have basket ka index.
    }
})
  });
});

app.post('/register',function(req,res)
{
    // console.log(req.body.username);
    // console.log(req.body.pass);
    const pass=req.body.password;
    const user_name=req.body.username;

    User.register(new User({ username : user_name }), pass, function(err, User) {
      if (err) {
          console.log(err);
      }

      passport.authenticate('local')(req, res, function () {
        // res.redirect('/');
        // res.send('success in registering');
        res.json({msg:'hello new user!!!!!'});
      });
      // res.redirect('/checkout')
      
    });
    
});

app.post('/payment-intent',async function(req,res)
{
  const {items}=(req.body);
  console.log(items);
  const paymentIntent=await stripe.paymentIntents.create({
    amount:200,
    currency:'usd',
    description: 'Software development services',
    shipping: {
      name: 'Jenny Rosen',
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },}
  });
  res.send(
    {
      clientSecret:paymentIntent.client_secret
    });
})

app.listen(5000,function(err)
{
    if(err) console.log(err);
    else console.log('success in starting the server on port 5000')
});

//next goal will be to add a basket_item schema, which will store new item inserted in the basket, also make a 
//user_basket schema, which will contain users email id, as it is unique, and also it will contain an array of
//basket_item to store basket items there, during insertion, we will make a new basket_item and add it to the user_basket
//schema. thus we will need to make changes in the reducer function,or we can completely skip that data layer thing
//or make changes to the add_new_item,remove_item, etc reducer cases.

//we can use the object id's provided by mongoDB to give id to the each item, also we can store all the data on 
//mongoDB, and give it to the front end on request, also giving a unique id to each item, we can delete it 
//successfully, currently it is a bit erroneous.
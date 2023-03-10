const express=require('express');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.post('/login',function(req,res)
{
    console.log(req.body.username);
    console.log(req.body.pass);
    res.send('success');
})

app.listen(5000,function(err)
{
    if(err) console.log(err);
    else console.log('success in starting the server on port 5000')
})
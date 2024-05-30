const express = require('express')
const mongoose = require('mongoose')
const app =express()
const studentRoute = require('./routes/student')
const userRoute = require('./routes/user')


app.use(express.json())                              // front use json    le plus utilisé (middelweare for bodyparser)
app.use(express.urlencoded({extended:true}))         // front use forme de remplissage(name , price, ...)   (middelweare for bodyparser)
 
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type",
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
  });
app.use('/',studentRoute)
app.use('/',userRoute)

var url = 'mongodb://127.0.0.1:27017/university'
const connectToDatabase = async () => {
    try {
      const res = await mongoose.connect(url);
      console.log("Connected successfully to DB");
    } catch (err) {
      console.log("Error while connecting to MongoDB");
    }
  };
  
  connectToDatabase();
  


app.listen(3000,()=>{console.log('server run on port 3000')})
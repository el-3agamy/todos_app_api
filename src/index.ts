import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import  "dotenv/config" ;
import {rateLimit, RateLimitRequestHandler} from "express-rate-limit" ;
import tododRouter from "./routes/todo"
import userRouter from "./routes/user"

const app : Application = express() ;
const PORT : number = 3000 ;
// connect DB  :
 mongoose.connect('mongodb://127.0.0.1:27017/todos-app-ts').then((res)=>{
    console.log("Done");
 }).catch((err)=>{
    console.log(`${err}`);
 });
// cors middleware :
app.use(cors()) ; 
// rate limit middleware : ==> for security (to avoid DOS attacks) & performance .
const limiter : RateLimitRequestHandler = rateLimit({ //Checks the IP and request frequency, then may immediately block the request (429 Too Many Requests).
      windowMs : 1 * 60 * 1000 ,
      limit : 5 ,
      legacyHeaders : false ,
      ipv6Subnet : 56 ,
      standardHeaders : "draft-8" ,
      message : "Too many requests." ,
      statusCode : 429 
}) ;
app.use(limiter) ; //If you move express.json() before rateLimit, then Express will parse the body even for requests that are going to be rejected by the limiter — wasting CPU cycles unnecessarily.
// parsing middleware :
app.use(express.json()) //Parses the request body into req.body.
// routing middleware  : 
app.use("/todos" ,tododRouter ) ;
app.use("/user" , userRouter) ;
// not found middleware : ==>
app.use((req,res,next)=>{
   res.status(404).json({
      msg : `this ${req.originalUrl} not exsist!`
   })
})
//app listening on port : 
app.listen(PORT , ()=>{
    console.log(`server work on port : ${PORT}`); 
});

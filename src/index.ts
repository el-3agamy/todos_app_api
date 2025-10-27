import express, { Application } from "express";
import cors from "cors";
import mongoose from "mongoose";
import tododRouter from "./routes/todo"
import userRouter from "./routes/user"
import  "dotenv/config" ;
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
// parsing middleware :
app.use(express.json())
// routing middleware  : 
app.use("/todos" ,tododRouter ) ;
app.use("/user" , userRouter)
//app listening on port : 
app.listen(PORT , ()=>{
    console.log(`server work on port : ${PORT}`); 
});

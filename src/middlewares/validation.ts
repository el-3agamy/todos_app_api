import { NextFunction, Request, Response } from "express";
const validationMiddleware = (schema : any)=>{
    return (req : Request,res : Response ,next : NextFunction)=>{
        const {error , value} = schema.validate(req.body , {abortEarly : false});
      if(error){
      return  res.status(400).json({msg:error.message});
      }
    }
};

export default validationMiddleware ;
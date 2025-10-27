import { NextFunction, Request, Response } from "express";
const authorizationMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
try { 
  if(!req.user?.role){
   return res.status(401).json({msg : "u r not autontication"}) ;
  }
  if (req.user.role !== "admin") return res.status(401).json("u must be admin to get all todos.");

  next();
} catch (error) {
  res.status(401).json({msg : "u not auth ."})
}
};
export default authorizationMiddleWare;

// Mona way : ==> this is called Higher Order Middleware or Parametrized Middleware Function 
// advantages : ==> reusable + rescalable + clean 
/*
   const authorization = (...roles)=>{
    return (req,res,next)=>{
      if(!roles.includes(req.user?.role)){
        return res.status(403).json({msg : "unAuthorized ."}) ;
      } ;
       next();
    }
   }
*/


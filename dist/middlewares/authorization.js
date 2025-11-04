"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizationMiddleWare = async (req, res, next) => {
    try {
        if (!req.user?.role) {
            return res.status(401).json({ msg: "u r not autontication" });
        }
        if (req.user.role !== "admin")
            return res.status(401).json("u must be admin to get all todos.");
        next();
    }
    catch (error) {
        res.status(401).json({ msg: "u not auth ." });
    }
};
exports.default = authorizationMiddleWare;
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

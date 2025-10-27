import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticationMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {authorization} = req.headers;
    if (!authorization) return res.status(401).json({ msg: "there is no token; you unAthentication." });
    // const leanAuth = authorization.split(" ")[1] ;
    const leanAuth = authorization.startsWith("Bearer ")
  ? authorization.split(" ")[1]
  : authorization;
    const decoded = jwt.verify(leanAuth, process.env.SECRET_KEY!) as jwt.JwtPayload;
    
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    };
    
    next();
  } catch (err) {
    res.status(401).json({ msg: "invaild token ; login again" });
  }
};
// another way using jwt.verify as Asynch 
//  imort Util from "util" ;
// const decoded = Util.promisfy(jwt.verify)(authorization, process.env.SECRET_KEY!)

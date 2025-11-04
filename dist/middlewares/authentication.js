"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleWare = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticationMiddleWare = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization)
            return res.status(401).json({ msg: "there is no token; you unAthentication." });
        // const leanAuth = authorization.split(" ")[1] ;
        const leanAuth = authorization.startsWith("Bearer ")
            ? authorization.split(" ")[1]
            : authorization;
        const decoded = jsonwebtoken_1.default.verify(leanAuth, process.env.SECRET_KEY);
        req.user = {
            id: decoded.id,
            role: decoded.role,
            email: decoded.email,
        };
        next();
    }
    catch (err) {
        res.status(401).json({ msg: "invaild token ; login again" });
    }
};
exports.authenticationMiddleWare = authenticationMiddleWare;
// another way using jwt.verify as Asynch 
//  imort Util from "util" ;
// const decoded = Util.promisfy(jwt.verify)(authorization, process.env.SECRET_KEY!)

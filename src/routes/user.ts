import {  Router } from "express";
import { deletUserById, getAllUsers, getUserById, login, registerUser } from "../controllers/user";
import authorization from "../middlewares/authorization";
import validationMiddleware from "../middlewares/validation";
import rgisterSchema from "../validations/registerValidation";
import loginSchema from "../validations/loginValidation";
const  router =Router () ;
router.post('/register', validationMiddleware(rgisterSchema) , registerUser);
router.post('/login', validationMiddleware(loginSchema) , login);
router.get('/users', authorization,getAllUsers);
router.delete("/:id" , authorization ,deletUserById) ;
router.get("/:id" , authorization, getUserById) 
export default router ;
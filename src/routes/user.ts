import {  Router } from "express";
import { deletUserById, getAllUsers, getUserById, login, registerUser } from "../controllers/user";
import authorization from "../middlewares/authorization";
const  router =Router () ;
router.post('/register', registerUser);
router.post('/login', login);
router.get('/users', authorization,getAllUsers);
router.delete("/:id" , authorization ,deletUserById) ;
router.get("/:id" , authorization, getUserById) 
export default router ;
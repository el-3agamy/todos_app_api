import { Request, Response } from "express";
import userModel, { IUser } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rgisterSchema from "../validations/registerValidation";
import loginSchema from "../validations/loginValidation";
interface IResponseUser {
    data?: object,
    msg?: string
}
// register new user : ==>
const registerUser = async (req: Request<{}, {}, IUser>, res: Response) => {
    try {
      
        const body = req.body;
        if (!body) return;
        const {password} :{password : string} = body ;
        const hashedPassword = await bcrypt.hash(password , 10 );
        const newUser = await userModel.create({...body , password : hashedPassword});
        const response: IResponseUser = {
            msg: "user added successfly."
        }
        res.status(201).json(response)

    } catch (err : any) {
        console.log(err );
        
        if( err && typeof err === "object" && err.code === 11000 ) 
          return res.status(401).json({ msg: "oops! this email aleardy exisit." })

    }
};
// login : ==>
const login = async (req: Request, res: Response) => {
  try {
  
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Missing email or password" });

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
      return res.status(401).json({ msg: "Invalid Password" })};

    const token =  jwt.sign({email , id:user._id , firstName :user.firstName , role:user.role} , process.env.SECRET_KEY as string ,{expiresIn : "1h" ,algorithm :"HS256"} ) // This produces:  header.payload.signature ==> wher signature = HMAC_SHA256(base64(header) + '.' + base64(payload), secretKey) ==> meaning secretkey using to generate signture

    res.status(200).json({  token  , msg: "Login success" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// get all users ; ==> 

const getAllUsers = async (req: Request, res: Response) => {
    try {
        console.log(req);
        
        const allUsers = await userModel.find();
        if (!allUsers) return;
        res.status(200).json({ data: allUsers, msg: "success." })
    } catch (err) {
        console.log(err);
        
        res.status(401).json({ msg: "u unauthoraized." });
    }
};

// get user by id : ==> 

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id);
        
        if (!id) return res.status(404).json({msg :"noooooooooooooooooooo"});
        const user = await userModel.findById(id);
        if (!user) return res.status(404).json({msg : "is this user ever exisist ?!"});
        res.status(200).json({ data: user, msg: "success." })
    } catch (err) {
        res.status(401).send({ msg: "you unauthorized ." })///////////////////////
    }
}

//delete user :

const deletUserById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    console.log(id);
    
    if (!id) return res.status(404).json({msg : "not found this user , is he exisist"});
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) return;
    res.status(201).send({ msg: "user deleted successfly." })

}

export {registerUser , login , deletUserById , getAllUsers ,getUserById}
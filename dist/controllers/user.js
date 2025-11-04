"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deletUserById = exports.login = exports.registerUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// register new user : ==>
const registerUser = async (req, res) => {
    try {
        const body = req.body;
        if (!body)
            return;
        const { password } = body;
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await user_1.default.create({ ...body, password: hashedPassword });
        const response = {
            msg: "user added successfly."
        };
        res.status(201).json(response);
    }
    catch (err) {
        console.log(err);
        if (err && typeof err === "object" && err.code === 11000)
            return res.status(401).json({ msg: "oops! this email aleardy exisit." });
    }
};
exports.registerUser = registerUser;
// login : ==>
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ msg: "Missing email or password" });
        const user = await user_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ msg: "User not found" });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid Password" });
        }
        ;
        const token = jsonwebtoken_1.default.sign({ email, id: user._id, firstName: user.firstName, role: user.role }, process.env.SECRET_KEY, { expiresIn: "1h", algorithm: "HS256" }); // This produces:  header.payload.signature ==> wher signature = HMAC_SHA256(base64(header) + '.' + base64(payload), secretKey) ==> meaning secretkey using to generate signture
        res.status(200).json({ token, msg: "Login success" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error" });
    }
};
exports.login = login;
// get all users ; ==> 
const getAllUsers = async (req, res) => {
    try {
        console.log(req);
        const allUsers = await user_1.default.find();
        if (!allUsers)
            return;
        res.status(200).json({ data: allUsers, msg: "success." });
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ msg: "u unauthoraized." });
    }
};
exports.getAllUsers = getAllUsers;
// get user by id : ==> 
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        if (!id)
            return res.status(404).json({ msg: "noooooooooooooooooooo" });
        const user = await user_1.default.findById(id);
        if (!user)
            return res.status(404).json({ msg: "is this user ever exisist ?!" });
        res.status(200).json({ data: user, msg: "success." });
    }
    catch (err) {
        res.status(401).send({ msg: "you unauthorized ." }); ///////////////////////
    }
};
exports.getUserById = getUserById;
//delete user :
const deletUserById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if (!id)
        return res.status(404).json({ msg: "not found this user , is he exisist" });
    const deletedUser = await user_1.default.findByIdAndDelete(id);
    if (!deletedUser)
        return;
    res.status(201).send({ msg: "user deleted successfly." });
};
exports.deletUserById = deletUserById;

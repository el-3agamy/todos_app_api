import joi from "joi";
const loginSchema = joi.object({
    email: joi.string().email().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: joi.string().required(),
}) ;

export default loginSchema ;
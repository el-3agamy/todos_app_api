import joi from "joi" ;
const rgisterSchema = joi.object({
        firstName: joi.string().min(3).max(15).required() ,
        lastName : joi.string().required().max(15).min(3) ,
        email : joi.string().email().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) ,
        password : joi.string().required() ,
        phone : joi.number() ,
        age : joi.number().min(12).max(99) ,
        DOB : joi.date() ,
        role : joi.string().valid("user" , "admin").default("user") ,
})

export default rgisterSchema ;
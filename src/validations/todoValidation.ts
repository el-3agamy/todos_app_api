import  joi from 'joi';
const todoValidation = joi.object({
name : joi.string().required().min(3)
}) ;

export default todoValidation ;
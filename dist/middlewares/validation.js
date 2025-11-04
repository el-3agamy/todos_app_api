"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ msg: error.message });
        }
        next();
    };
};
exports.default = validationMiddleware;

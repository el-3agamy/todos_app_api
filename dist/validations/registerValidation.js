"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const rgisterSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(3).max(15).required(),
    lastName: joi_1.default.string().required().max(15).min(3),
    email: joi_1.default.string().email().required().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    password: joi_1.default.string().required(),
    phone: joi_1.default.number(),
    age: joi_1.default.number().min(12).max(99),
    DOB: joi_1.default.date(),
    role: joi_1.default.string().valid("user", "admin").default("user"),
});
exports.default = rgisterSchema;

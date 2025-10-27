"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todoSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 12,
        minlength: 3
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Done", "In progress"], // difference between enum vs array 
        default: "In progress"
    },
}, {
    timestamps: true
});

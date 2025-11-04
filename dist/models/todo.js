"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        // maxlength: 12,
        minlength: 3,
    },
    date: {
        type: Date,
        default: Date.now,
        // required : false
    },
    status: {
        type: String,
        enum: ["Done", "In progress"],
        default: "In progress",
        // required : false
    },
    userID: {
        type: mongoose_1.Types.ObjectId,
        ref: "UsersTs"
    }
}, { timestamps: true });
const todoModel = (0, mongoose_1.model)("TodosTS", todoSchema, "TodosTS");
exports.default = todoModel;

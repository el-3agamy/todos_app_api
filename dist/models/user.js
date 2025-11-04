"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (mail) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
            }
        },
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number, // chatgpt is told me that phone numbers should be string not number
        unique: true,
        // validate: {
        //     validator: (p: number) => {
        //         return /\d{3}-\d{3}-\d{4}/.test(p.toString()); // test() accept string only
        //     },
        //     message: (props: { value: string }) => `${props.value} is invalid number`
        // }
    },
    age: {
        type: Number,
        max: 99,
        min: 12,
        required: false,
    },
    DOB: {
        type: Date,
        required: false,
        validate: {
            validator: (date) => {
                const age = new Date().getFullYear() - date.getFullYear();
                return age >= 12 && age <= 99;
            },
            message: (props) => `${props.value.toString()} is not older than 12 or younger than 99`
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});
const userModel = (0, mongoose_1.model)("UsersTs", userSchema, "UsersTs");
exports.default = userModel;

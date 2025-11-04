"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const registerValidation_1 = __importDefault(require("../validations/registerValidation"));
const loginValidation_1 = __importDefault(require("../validations/loginValidation"));
const router = (0, express_1.Router)();
router.post('/register', (0, validation_1.default)(registerValidation_1.default), user_1.registerUser);
router.post('/login', (0, validation_1.default)(loginValidation_1.default), user_1.login);
router.get('/users', authorization_1.default, user_1.getAllUsers);
router.delete("/:id", authorization_1.default, user_1.deletUserById);
router.get("/:id", authorization_1.default, user_1.getUserById);
exports.default = router;

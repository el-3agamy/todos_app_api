"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_1 = require("../controllers/todo");
const authorization_1 = __importDefault(require("../middlewares/authorization"));
const authentication_1 = require("../middlewares/authentication");
const validation_1 = __importDefault(require("../middlewares/validation"));
const todoValidation_1 = __importDefault(require("../validations/todoValidation"));
const router = (0, express_1.Router)();
router.use(authentication_1.authenticationMiddleWare); // authentication middleware for all todos router (all endpoints) .
router.route('/todo').post((0, validation_1.default)(todoValidation_1.default), todo_1.addNewTodo).get(authorization_1.default, todo_1.getAllTodos).delete(authorization_1.default, todo_1.deleteAllTodos);
router.route('/:id').get(todo_1.getTodoById).delete(todo_1.deleteTodoById).patch(todo_1.updateTodo);
exports.default = router;

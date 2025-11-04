"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.getAllTodos = exports.getTodoById = exports.deleteTodoById = exports.deleteAllTodos = exports.addNewTodo = void 0;
const todo_1 = __importDefault(require("../models/todo"));
// add new todo : ==>
const addNewTodo = async (req, res, next) => {
    try {
        const todo = req.body;
        if (!todo.name)
            return res.status(400).json({ msg: "Todo name is required." });
        const newTodo = await todo_1.default.create({
            ...todo,
            userID: req.user?.id,
        });
        res.status(201).json({
            data: newTodo,
            msg: "Todo added successfully.",
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Something went wrong." });
    }
};
exports.addNewTodo = addNewTodo;
////////////////////////////////////////////////////////////////////
const getAllTodos = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ msg: "Unauthorized" });
        }
        const filter = req.user.role === "admin" ? {} : { userID: req.user.id };
        const todos = await todo_1.default.find(filter).populate("userID");
        res.status(200).json({
            data: todos,
            msg: req.user.role === "admin" ? "All todos fetched" : "Your todos fetched",
        });
    }
    catch (err) {
        res.status(500).json({ msg: "Something went wrong" });
    }
};
exports.getAllTodos = getAllTodos;
// get specific todo by id : ==>
const getTodoById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!req.user?.id) {
            return res.status(401).json({ msg: "u r user , login again." });
        }
        if (!id)
            return;
        const todoById = await todo_1.default.findById(id);
        if (!todoById)
            return;
        const response = {
            data: todoById,
            msg: "you get your todo."
        };
        res.status(200).json(response);
    }
    catch (err) {
        res.status(404).json({ msg: `sorry! we can't find todo ${id}` });
    }
};
exports.getTodoById = getTodoById;
// delete specific todo by id : ==> 
const deleteTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return;
        const deletedTodo = await todo_1.default.findByIdAndDelete(id);
        if (!deletedTodo)
            return;
        res.status(200).json({ msg: "todo is deleted ." });
    }
    catch (err) {
        res.status(401).json({ msg: "u can't delete this todo." });
    }
};
exports.deleteTodoById = deleteTodoById;
// delete all todos : ==>
const deleteAllTodos = async (req, res) => {
    const deletededAllTodos = await todo_1.default.deleteMany();
    if (!deletededAllTodos)
        return;
    res.status(200).json({ msg: "all todos are deleted." });
};
exports.deleteAllTodos = deleteAllTodos;
// update todo using patch :==>
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    try {
        if (!id || !body)
            return;
        const updatedTodo = await todo_1.default.findByIdAndUpdate(id, body, { new: true });
        if (!updatedTodo)
            return;
        res.status(201).json({ data: updatedTodo, msg: "updated successed." });
    }
    catch (err) {
        console.log(err);
        res.status(404).send({ msg: "oops! somthing going wrong." });
    }
};
exports.updateTodo = updateTodo;

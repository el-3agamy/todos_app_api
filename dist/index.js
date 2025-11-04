"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const express_rate_limit_1 = require("express-rate-limit");
const todo_1 = __importDefault(require("./routes/todo"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
const PORT = 3000;
// connect DB  :
mongoose_1.default.connect('mongodb://127.0.0.1:27017/todos-app-ts').then((res) => {
    console.log("Done");
}).catch((err) => {
    console.log(`${err}`);
});
// cors middleware :
app.use((0, cors_1.default)());
// rate limit middleware : ==> for security (to avoid DOS attacks) & performance .
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    legacyHeaders: false,
    ipv6Subnet: 56,
    standardHeaders: "draft-8",
    message: "Too many requests.",
    statusCode: 429
});
app.use(limiter); //If you move express.json() before rateLimit, then Express will parse the body even for requests that are going to be rejected by the limiter — wasting CPU cycles unnecessarily.
// parsing middleware :
app.use(express_1.default.json()); //Parses the request body into req.body.
// routing middleware  : 
app.use("/todos", todo_1.default);
app.use("/user", user_1.default);
// not found middleware : ==>
app.use((req, res, next) => {
    res.status(404).json({
        msg: `this ${req.originalUrl} not exsist!`
    });
});
//app listening on port : 
app.listen(PORT, () => {
    console.log(`server work on port : ${PORT}`);
});

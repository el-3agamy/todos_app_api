"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
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
app.use(express_1.default.json());
//app listening on port : 
app.listen(PORT, () => {
    console.log(`server work on port : ${PORT}`);
});

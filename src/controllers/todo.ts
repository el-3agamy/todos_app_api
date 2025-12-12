import { Request, Response, NextFunction } from "express";
import todoModel, { ITodo } from "../models/todo";
import userModel from "../models/user";
interface ICustomTodoResponse {
    data?: object;
    msg: string;
}

// add new todo : ==>
const addNewTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
   
    const todo = req.body;
    if (!todo.name)
      return res.status(400).json({ msg: "Todo name is required." });

    const newTodo = await todoModel.create({
      ...todo , 
      userID: req.user?.id ,
    });

    res.status(201).json({
      data: newTodo,
      msg: "Todo added successfully.",
    });
  } catch (err: unknown) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
};

////////////////////////////////////////////////////////////////////

const getAllTodos = async (req: Request, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    const filter = req.user.role === "admin" ? {} : { userID: req.user.id };
    const todos = await todoModel.find(filter).populate("userID");

    res.status(200).json({
      data: todos,
      msg: req.user.role === "admin" ? "All todos fetched" : "Your todos fetched",
    });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};


// get specific todo by id : ==>

const getTodoById = async (req: Request<{ id: string }, {}, ITodo>, res: Response) => {

    const { id }: { id: string } = req.params;
    try {
      const newUser = await userModel.find();
      return res.status(200).json({msg : "from test" , newUser}) ;
      // if(!req.user?.id){return res.status(401).json({msg : "u r not user , login again."})}
      //   if (!id) return;
      //   const todoById = await todoModel.findById(id);
      //   if (!todoById) return;
      //   const response: ICustomTodoResponse = {
      //       data: todoById,
      //       msg: "you get your todo."
      //   }
      //   res.status(200).json(response);
    } catch (err) {
        res.status(404).json({ msg: `sorry! we can't find todo ${id}` })
    }
}

// delete specific todo by id : ==> 

const deleteTodoById = async (req: Request<{ id: string }, {}, ITodo>, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return;
        const deletedTodo = await todoModel.findByIdAndDelete(id);
        if (!deletedTodo) return;
        res.status(200).json({ msg: "todo is deleted ." });
    } catch (err) {
        res.status(401).json({ msg: "u can't delete this todo." })
    }
};

// delete all todos : ==>

const deleteAllTodos = async (req: Request<{}, {}, ITodo>, res: Response) => {
    const deletededAllTodos = await todoModel.deleteMany();
    if (!deletededAllTodos) return;
    res.status(200).json({ msg: "all todos are deleted." })
};

// update todo using patch :==>
const updateTodo = async (req: Request<{ id: string }, {}, ITodo>, res: Response) => {
    const { id } = req.params;
    const body = req.body;

    try {
        if (!id || !body) return;
        const updatedTodo = await todoModel.findByIdAndUpdate(id, body, { new: true });
        if (!updatedTodo) return;
        res.status(201).json({ data: updatedTodo, msg: "updated successed." })
    } catch (err) {
        console.log(err);
        res.status(404).send({ msg: "oops! somthing going wrong." })

    }
}

export { addNewTodo, deleteAllTodos, deleteTodoById, getTodoById, getAllTodos, updateTodo  }
import {Router} from "express";
import {addtodo,readtodo,deleteTodo,updateTodo} from "../controllers/todo.controller.js";



const todoRouter = Router();

todoRouter.route("/add").post(addtodo)
todoRouter.route("/read").get(readtodo)
todoRouter.route("/delete/:id").delete(deleteTodo)
todoRouter.route("/update/:id").put(updateTodo)


export default todoRouter
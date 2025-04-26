import {Router} from "express";
import {addtodo,readtodo,deleteTodo,updateTodo,completeTodo} from "../controllers/todo.controllers.js";



const router = Router();

router.route("/add").post(addtodo)
router.route("/read").get(readtodo)
router.route("/delete/:id").delete(deleteTodo)
router.route("complete/:id").post(completeTodo)
router.route("/update/:id").put(updateTodo)


export default router
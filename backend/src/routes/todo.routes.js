import {Router} from "express";
import {addtodo,readtodo,deleteTodo,updateTodo} from "../controllers/todo.controllers.js";



const router = Router();

router.route("/add").post(addtodo)
router.route("/read").get(readtodo)
router.route("/delete/:id").delete(deleteTodo)
router.route("/update/:id").put(updateTodo)


export default router
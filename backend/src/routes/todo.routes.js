import {Router} from "express";
import {addtodo,getTodos,deleteTodo,updateTodo,completeTodo} from "../controllers/todo.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";



const router = Router();

//secured routes
router.use(verifyJWT)

router.route("/add").post(addtodo)
router.route("/get").get(getTodos)
router.route("complete/:id").post(completeTodo)
router.route("/delete/:id").delete(deleteTodo)
router.route("/update/:id").put(updateTodo)


export default router
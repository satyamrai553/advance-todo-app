import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { Todo } from '../models/todo.model.js';
import { User } from '../models/user.model.js'




const addtodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body

  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "Authentication failed!")
  }

  const todo = await Todo.create({
    title,
    description,
    owner: user
  })

  const createdTodo = await Todo.findById(todo._id)

  if (!createdTodo) {
    throw new ApiError(500, "Todo list add fail")
  }


  return res.status(200).json(
    new ApiResponse(200, createdTodo, "todo successfully added")
  )

})






const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.aggregate([
    {
      $match: {
        owner: mongoose.Types.ObjectId(req.user._id)
      }
    }
  ]);
  
  if(todos.length === 0){
    throw new ApiError(404, "No Todos Found");
  }
  
  res.status(200).json(
    new ApiResponse(200, todos, "Todos successfully fetched")
  );
});




const deleteTodo = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id)

    if(!user){
      throw new ApiError(403, "Authentication failed")
    }
    const { todoId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(todoId)) {
      throw new ApiError(400, "Invalid Todo ID");
    }

    const deleteTodo = await Todo.findByIdAndDelete(todoId);
    if (!deleteTodo) {
      throw new ApiError(500, "Todo delete failed");
    }

    res.status(200).json(
      new ApiResponse(200, deleteTodo, "Todo successfully deleted")
    )
});




const updateTodo = asyncHandler(async (req, res, next) => {
  
  const user = await User.findById(req.user._id)

  if(!user){
    throw new ApiError(403, "Authentication failed")
  }
  const { todoId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(todoId)) {
    throw new ApiError(400, "Invalid Todo ID");
  }

  const updateTodo = await Todo.findByIdAndUpdate(todoId, req.body)
    if (!updateTodo) {
      throw new ApiError(404, "Todo not found");
    }

    res.status(200).json(
      new ApiResponse(200, updateTodo, "Todo successfully updated")
    );
})





const completeTodo = asyncHandler(async (req, res) => {
  const {status} = req.body
  if(!status){
    throw new ApiError(401, "Todo status required")
  }
  const user = await Todo.findByIdAndUpdate(id)
  if (!user) {
    throw new ApiError(404, "No Todo found with this id")
  }
  const todoId = req.params;
  if(!mongoose.Types.ObjectId.isValid(todoId)){
    throw new ApiError(401, "Invalid Todo Id")
  }

  const completeTodo = await Todo.findByIdAndUpdate({
    completed: status,
  })
  if(!completeTodo){
    throw new ApiError(500, "Unable to complete the request")
  }
  res.status(200).json(
    new ApiResponse(200, completeTodo, "Todo completed successfully")
  )

})




export { addtodo, getTodos, deleteTodo, updateTodo, completeTodo }


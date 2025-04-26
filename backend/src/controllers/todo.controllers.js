import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {Todo} from '../models/todo.model.js';


const addtodo = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //validation- not empty
    //return response

    const {title,description} = req.body
    // console.log("email: ", email);
  
    if(
      [title,description].some((field)=> field?.trim() === "")
    ){
      throw new ApiError(400, "All fields are required")
    }
  
  
   const todo = await Todo.create({
      title,
      description
   })
  
   const createdTodo = await Todo.findById(todo._id)

 if(!createdTodo){
    throw new ApiError(500, "Todo list add fail")
 }


 return res.status(201).json(
    new ApiResponse(200, createdTodo, "todo successfully added")
 )
  
  })

const readtodo = asyncHandler(async(req,res)=>{
   //get details from database
   //return response
   try {
      const tododata = await Todo.find({});
      res.status(201).json(
        new ApiResponse(200, tododata, "todo successfully fetched")
     )
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }


 
})


const deleteTodo = asyncHandler(async (req, res, next) => {
  try {
      const { id } = req.params;
      const response = await Todo.findByIdAndDelete(id);
      if (!response) {
          throw new ApiError(404, "Todo not found");
      }
      res.status(200).json(
          new ApiResponse(200, response, "Todo successfully deleted")
      );
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
});



const updateTodo = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await Todo.findByIdAndUpdate(id, req.body)
    if (!response) {
      throw new ApiError(404, "Todo not found");
    }
    else{
      res.status(200).json(
        new ApiResponse(200, response, "Todo successfully updated")
      );
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }

})




  export {addtodo,readtodo,deleteTodo,updateTodo}


import express from 'express'

import cookieParser from "cookie-parser"

const app  = express();



app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))


//routes import 
import todoRouter from './src/routes/todo.routes.js'

//routes declaration
app.use("/api/v1/todo", todoRouter)


export default app;
import express from 'express'
import dotenv from 'dotenv'
import cors from "cors"


const app  = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

dotenv.config({
    path: './.env'
})

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))



//routes import 
import todoRouter from './src/routes/todo.routes.js'
import userRouter from './src/routes/user.routes.js'



//routes declaration
app.use("/api/v1/todo", todoRouter)
app.use("/api/v1/users", userRouter)




export default app;
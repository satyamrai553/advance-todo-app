import app from '../app.js';
import { dbConnect } from './db/index.js';



dbConnect()
.then(()=>{
    app.get('/',(req,res)=>{
        res.send("Welcome to my todo app backend");
    })
    app.listen(`${process.env.PORT || 3000}`,()=>{
        console.log(`App is listening at PORT ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("DB connection error: ",err)
})
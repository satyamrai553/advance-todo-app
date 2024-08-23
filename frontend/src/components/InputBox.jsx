import React from 'react'
import {X} from 'lucide-react'
import axios from "axios";

import { useState } from "react"

function InputBox({onClose}) {


    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");


    function refreshPage(){ 
      window.location.reload(); 
  }


    
const addtodoHandler = async ()=>{
    
    try {
      await axios.post('/api/v1/todo/add', {title, description});
      setTitle("")
      setDescription("")
      onClose();
      refreshPage();
      
    
    } catch (error) {
      console.error("Error occurred:", error);
    }
    
  };


  return (
    <div className='fixed inset-0 bg-yellow-300 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
        <div className='mt-10 flex flex-col gap-5'>
        <button onClick={onClose} className='place-self-end'><X size={30}/></button>
        
        <div className='bg-yellow-100 rounded-xl py-10 flex flex-col gap-5 items-center w-72'>
        <h1 className='text-xl font-sans font-black text-amber-700  '>Add Todo</h1>
        <input  className="border-lime-300 border-2 text-lg text-center" value={title} type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Enter Title" />
        <textarea className="w-52 text-lg h-20" value={description} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Enter Description" ></textarea>
       
        <button className='bg-blue-500 w-24 rounded-xl p-2 text-white font-sans font-medium' onClick={addtodoHandler}>Add</button>
        </div>
        </div>
        </div>
  )
}

export default InputBox
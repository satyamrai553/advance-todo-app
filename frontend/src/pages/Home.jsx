import React from 'react'
import Card from '../components/Card';
import { CirclePlus } from 'lucide-react';
import InputBox from "../components/InputBox";
import { useEffect, useState } from "react"

function Home() {
    const [showModal, setShowModal] = useState(false);
  
  
    return (
      <><div className="overflow: 'hidden', width: '100vw', h-screen ">
  
         <div className="flex justify-center relative">
          <h1 className="text-6xl font-bold font-mono text-[#CADCFC] text-center mt-6">Todo App</h1>
          <button onClick={() => setShowModal(true)} className="absolute top-12 right-52"><CirclePlus size={36} color="#ffffff" /></button>
        </div>
  
  
        <div className="mx-auto grid grid-cols-3 mt-10 justify-items-center">
          <Card />
        </div>
  
  
  
        {showModal && <InputBox onClose={() => setShowModal(false)} />}
  
      </div>
  
      </>
    )
  }
  
  export default Home
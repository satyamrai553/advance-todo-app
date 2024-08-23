import React, { useState, useEffect } from 'react';
import { Trash2, Pencil, X } from 'lucide-react';
import axios from 'axios';

function Card() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = () => {
    axios.get('/api/v1/todo/read')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/v1/todo/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodoHandler = async () => {
    if (currentTodo) {
      try {
        await axios.put(`/api/v1/todo/update/${currentTodo._id}`, {
          title,
          description,
        });
        setShowModal(false);
        setCurrentTodo(null);
        setTitle('');
        setDescription('');
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const openModal = (todo) => {
    setCurrentTodo(todo);
    setTitle(todo.title);
    setDescription(todo.description);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentTodo(null);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      {data.map((item) => (
        <div key={item._id} className='bg-blue-400 rounded-lg mx-5 my-5'>
          <div className='bg-yellow-300 w-72 h-auto rounded-lg border-4 p-4'>
            <div className='text-center font-sans font-medium text-lg text-gray-700'>{item.title}</div>
            <div className='bg-yellow-100 h-24 text-center font-sans text-md text-green-700 '>
              <p>{item.description}</p>
            </div>
          </div>
          <div className='grid grid-cols-3 justify-items-center my-2'>
            <button onClick={() => deleteHandler(item._id)}><Trash2 size={24} color='#ffffff' /></button>
            <button onClick={() => openModal(item)}><Pencil size={24} color='#d1580d' /></button>
            <input className="w-6 h-6" type="checkbox" />
          </div>
        </div>
      ))}

      {showModal && (
        <div className='fixed inset-0 bg-yellow-300 bg-opacity-30 backdrop-blur-sm flex justify-center items-center'>
          <div className='mt-10 flex flex-col gap-5'>
            <button onClick={closeModal} className='place-self-end'><X size={30} /></button>
            <div className='bg-yellow-100 rounded-xl py-10 flex flex-col gap-5 items-center w-72'>
              <h1 className='text-xl font-sans font-black text-amber-700'>Edit Todo</h1>
              <input
                className="border-lime-300 border-2 text-lg text-center"
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
              />
              <textarea
                className="w-52 text-lg h-20"
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
              ></textarea>
              <button className='bg-blue-500 w-24 rounded-xl p-2 text-white font-sans font-medium' onClick={updateTodoHandler}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function Nav() {
  return (
    <header>
      <div className='container mx-auto'>
        <div className='flex justify-between mx-20'>
          <div className='w-1/4'>
            <Link to='/'>
            <h1 className='text-4xl font-sans font-extrabold text-white p-4'>Todo</h1>
            </Link>
          </div>
          <div className='w-1/2 flex justify-center text-2xl items-center gap-20 font-bold font-sans'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-400`
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `${isActive ? 'text-blue-400':'text-white'} hover:text-blue-400`
              }
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `${isActive ? 'text-blue-400' : 'text-white'} hover:text-blue-400`
              }
            >
              Contact
            </NavLink>
          </div>
          <div className='w-1/4 flex justify-center items-center'>
            <Link to='/signin'>
            <button className='text-white bg-blue-600 rounded-xl p-2 text-lg font-medium w-[84px]'>
              Sign in
            </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;

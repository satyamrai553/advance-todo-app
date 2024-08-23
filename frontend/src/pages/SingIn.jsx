import React from 'react'
import {Link} from "react-router-dom"

function SingIn() {
  return (
    <>
    <div className=' overflow-hidden bg-[#111827] h-screen  flex items-center justify-center px-6 py-12'>
        <div>
            <div>
                <h1 className='font-black text-4xl text-white text-center'>
                    Todo
                </h1>
                <h2 className='text-white font-sans font-bold text-2xl text-center mt-10'>
                    Sign in to your account
                </h2>

            </div>
            <div className='mt-10'>
                <form action="">

                <div>
                    <label htmlFor="email" className='text-white font-serif'>Email address</label>
                    <div>
                        <input type="email" id="email" name="email" required className='px-3 py-[6px] w-[360px] h-[36px] bg-[#6b7280] bg-opacity-25 rounded-lg mt-2 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    </div>
                </div>


                <div>
                    <div className='flex mt-6 justify-between'>
                        <label htmlFor="password" className='text-white font-serif'>Password</label>
                        <div>
                            <Link to="/signup/reset" className='text-blue-600 hover:text-blue-500'>Forgot password?</Link>
                        </div>
                    </div>
                    <div >
                        <input type="password" id="password" name='password' required className='px-3 py-[6px] w-[360px] h-[36px] bg-[#6b7280] bg-opacity-25 rounded-lg mt-2 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    </div>
                </div>
                <div className='mt-6'>
                    <button type='submit' className='bg-blue-600 w-[360px] h-[36px] rounded-lg text-white hover:bg-blue-500'>Sign in</button>
                </div>
                </form>


                <div>
                    <p className='text-white mt-10 text-center'>Not a member? <a href="#" className='text-blue-600 hover:text-blue-500'>Start a 14 day free trial </a></p>
                </div>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default SingIn
import React from 'react'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <div className='bg-[#111827]'>
    <Nav/>
    <Outlet />
    </div>
    </>
  )
}

export default Layout
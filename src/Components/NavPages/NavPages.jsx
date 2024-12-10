import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavPages() {
  return (
    <>
      <div className='lg:flex justify-center items-center text-white gap-5 hidden'>
        <div className=''>
          <NavLink to="/" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='hover:text-[rgba(251,176,59,1)] duration-300'>الرئيسية</h3></NavLink>
        </div>
        <div>
          <NavLink to="/about" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='hover:text-[rgba(251,176,59,1)] duration-300'>عن الشركة</h3></NavLink>
        </div>
        <div>
          <NavLink to="/products" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='hover:text-[rgba(251,176,59,1)] duration-300'>كل المنتجات</h3></NavLink>
        </div>
        <div>
          <NavLink to="/blogs" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='hover:text-[rgba(251,176,59,1)] duration-300'>المدونة</h3></NavLink>
        </div>
        
      </div>
    </>
  )
}

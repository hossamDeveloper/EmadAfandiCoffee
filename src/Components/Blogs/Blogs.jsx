import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import blog1 from '../../assets/images/blog1.webp'
import blog2 from '../../assets/images/blog2.webp'
import blog3 from '../../assets/images/blog3.webp'
export default function Blogs() {
    const location = useLocation()
    useMemo(() => {
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }, [])
    return (
        <>
            <div className='bg-black text-white lg:py-16 md:py-12 sm:py-8 py-4 lg:my-5 md:my-4 sm:my-3 my-2'>
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">المدونة</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4 flex justify-center lg:gap-4 gap-0 lg:flex-nowrap flex-wrap'>
                <div className='lg:w-1/3  sm:w-1/2 w-full overflow-hidden'>
                    <img src={blog1} className='w-full h-[300px] object-cover hover:scale-105 duration-500 cursor-pointer' alt="blog1" />
                </div>
                <div className='lg:w-1/3  sm:w-1/2 w-full  overflow-hidden mt-3 sm:mt-0 sm:ps-3 lg:ps-0'>
                    <img src={blog2} className='w-full h-[300px] object-cover hover:scale-105 duration-500 cursor-pointer' alt="blog2" />
                </div>
                <div className='lg:w-1/3  sm:w-1/2 w-full overflow-hidden mt-3 lg:mt-0'>
                    <img src={blog3} className='w-full h-[300px] object-cover hover:scale-105 duration-500 cursor-pointer' alt="blog3" />
                </div>
            </div>
        </>
    )
}

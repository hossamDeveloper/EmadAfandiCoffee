import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer>
        <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10'>
          <div className='border-t-2 border-[rgba(251,176,59,1)] py-5 flex justify-center flex-wrap md:flex-nowrap md:justify-around'>
            <div className='w-full sm:w-1/2'>
              <h2 className='font-bold text-white mb-3'>الصفحات</h2>

              <div className=' flex justify-between items-center md:flex-col md:items-start'>
                <NavLink to={"/termsAndConditions"}>  <h2 className='text-gray-500 mb-2 '>الشروط والاحكام</h2>
                </NavLink>
                <NavLink to={"/privacyPolicy"}>
                  <h2 className='text-gray-500 mb-2 '>سياسة الخصوصية</h2>
                </NavLink>
                <NavLink to={"/exchangeAndReturnPolicy"}>
                  <h2 className='text-gray-500 mb-2 '>سياسة الاستبدال والاسترجاع</h2>
                </NavLink>
              </div>

            </div>
            <div className='w-full sm:w-1/2'>
              <h2 className='font-bold text-white mb-3'>روابط مهمة</h2>
              <div className=' flex justify-between items-center md:flex-col md:items-start'>
                <NavLink to={"/about"}>

                  <h2 className='text-gray-500 mb-2'>عن الشركة</h2>
                </NavLink>
                <NavLink to={"/products"}>

                  <h2 className='text-gray-500 mb-2'>كل المنجات</h2>
                </NavLink>
                <NavLink to={"/blogs"}>

                  <h2 className='text-gray-500 mb-2'>المدونة</h2>
                </NavLink>
              </div>
            </div>
            <div className='w-full sm:w-1/2'>
              <h2 className='font-bold text-white mb-3'>الاقسام</h2>
              <div className=' flex justify-between items-center md:flex-col md:items-start'>
                <NavLink to={"/products"}>
                  <h2 className='text-gray-500 mb-2'>قهوة تركية</h2>
                </NavLink>
                <NavLink to={"/products"}>

                  <h2 className='text-gray-500 mb-2'>قهوة فرنسية</h2>
                </NavLink>
                <NavLink to={"/products"}>

                  <h2 className='text-gray-500 mb-2'>كابتشينو</h2>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className='border-t-2 border-gray-600'>
          <h2 className='text-center text-gray-500 py-5'>All rights reserved © 2024 - <span className='text-[rgba(251,176,59,1)]'>عماد أفندى متقن تك</span>
          </h2>
        </div>
      </footer>

    </>
  )
}

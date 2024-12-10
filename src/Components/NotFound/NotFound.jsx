import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <>
      <div className='text-center lg:my-20 md:my-16 sm:my-12 my-8'>
        <h2 className='lg:text-9xl md:text-8xl sm:text-7xl text-6xl text-white'><i class="fa-solid fa-ban text-red-500 pe-3"></i>404</h2>
        <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg text-white my-3'>لا يوجد صفحة بهذا الاسم </h2>
        <p className='text-gray-500'>الرجاء التأكد من صحة الرابط الذي قمت بالدخول اليه وحاول مرة اخرى. 
          <br />
          يمكنك العودة الى الصفحة الرئيسية للاستمتاع بخدماتنا وسيتم تحديث الصفحة بشكل مستمر</p>
        <Link to={'/'}> <button className='bg-[rgba(251,176,59,0)] text-white px-3 py-1 my-3  rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '> العودة الى الصفحة الرئيسية</button> </Link>
      </div>
    </>
  )
}

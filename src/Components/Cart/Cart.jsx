import React, { useContext, useMemo } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'

export default function Cart() {
    const location = useLocation()
    const { userDetails } = useContext(AuthContext)
    const { carts, deleteFromCart } = useContext(CartContext)
    const cart = carts.find((cart) => cart.userId === userDetails.id)

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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">السلة</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            {cart?.list.length > 0 ?
                <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4 flex justify-between xl:flex-row flex-col text-white'>
                    <div className='xl:w-2/3 w-full shadow-[2px_2px_10px_0_rgba(251,176,59,1),-2px_-2px_10px_0_rgba(251,176,59,1)] p-5 rounded-lg me-4'>
                        <div className='overflow-x-auto' >
                        <table className='text-center w-[1000px] object-cover'>
                            <thead>
                                <tr>
                                    <th className=''>حذف</th>
                                    <th className='w-[20%]'>الصورة</th>
                                    <th className='w-[25%]'>الاسم</th>
                                    <th className='w-[15%]'>السعر</th>
                                    <th className='w-[25%]'>الكمية</th>
                                    <th className='w-[15%]'>المجموع</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cart?.list.length > 0 ? cart?.list.map((product) =>
                                    <tr className='border-b border-gray-400' key={product.id}>
                                        <td><i onClick={() => deleteFromCart(product, userDetails?.id)} className="fa-solid fa-xmark text-red-600 border border-red-600 rounded-lg  text-2xl w-8 h-8 flex justify-center items-center me-2 hover:bg-red-400 duration-300"></i></td>
                                        <td >
                                            <Link to={`/product-details/${product.id}`}>
                                                <img src={product.image} className='w-full' alt={product.itemName} />
                                            </Link>
                                        </td>
                                        <td className='text-[22px] '>{product.itemName}</td>
                                        <td className='text-[22px]'>{product.price}</td>
                                        <td >
                                            <h2 className='text-2xl'>{product.count}</h2>
                                        </td>
                                        <td className=' text-2xl font-bold'>{product.price * product.count}</td>
                                    </tr>
                                ) : <></>}

                            </tbody>
                        </table>
                        </div>
                    </div>
                    <div className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full xl:mt-0 mt-4 shadow-[2px_2px_10px_0_rgba(251,176,59,1),-2px_-2px_10px_0_rgba(251,176,59,1)] p-5 rounded-lg h-fit'>
                        <h2 className='text-2xl font-bold'>اجمالي قائمة المشتريات</h2>
                        <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                            <h2>المجموع</h2>
                            <h2>{cart?.list.reduce((total, product) => total + product.price * product.count, 0)} EGP</h2>
                        </div>
                        <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                            <h2>بعد الخصم 15%</h2>
                            <h2>{Math.floor(cart?.list.reduce((total, product) => total + product.price * product.count, 0) * 0.85)} EGP</h2>
                        </div>
                        <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                            <h2>مصاريف الشحن</h2>
                            <h2>40 EGP</h2>
                        </div>
                        <div className='flex justify-between my-3 py-2 '>
                            <h2>المجموع الكلي</h2>
                            <h2>{Math.floor(cart?.list.reduce((total, product) => total + product.price * product.count, 0) * 0.85) + 40} EGP</h2>
                        </div>
                        <Link to={'/checkout'}>
                            <button className='border border-[rgba(251,176,59,1)] rounded-lg w-full py-2 hover:bg-[rgba(251,176,59,1)] duration-300 '>اتمام عملية الدفع</button>
                        </Link>
                    </div>
                </div>

                : <div className='text-center'>
                    <i className='fa-solid fa-truck-ramp-box text-yellow-500 lg:text-9xl md:text-8xl sm:text-7xl text-6xl'></i>
                    <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg text-white my-3'>لا يوجد منتجات في السلة</h2>
                    <p className='text-gray-500'>لا يوجد لديك أي منتجات في السلة الخاصة بك حتى الآن.
                        <br />
                        ستجد الكثير من المنتجات المثيرة للاهتمام على صفحة "المتجر" الخاصة بنا.
                        العودة إلى المتجر</p>
                    <Link to={'/products'}> <button className='bg-[rgba(251,176,59,0)] text-white px-3 py-1 my-3  rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>العودة إلى المتجر</button> </Link>
                </div>}

        </>
    )
}

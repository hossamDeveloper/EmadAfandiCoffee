import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { WishListContext } from './../../Context/WishList';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

export default function WishPage() {

    const location = useLocation()
    const { wishList, handleWishList } = useContext(WishListContext)
    const { userDetails } = useContext(AuthContext)
    const { addToCart } = useContext(CartContext)
    const wish = wishList.find((wish) => wish.userId === userDetails?.id)






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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">قائمة الرغبات</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='flex flex-wrap justify-center px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
                {wish?.list.length > 0 ? wish?.list.map((product) =>
                    <div key={product.id} className="text-center  text-white px-2 mb-2 lg:w-1/4 md:w-1/3 w-1/2" >
                        <div className='relative overflow-hidden'>
                            <Link to={`/product-details/${product.id}`}>
                                <img src={product.image} className='rounded-lg  w-full h-full hover:scale-[1.05] duration-500' alt={product.itemName} />
                            </Link>
                            <i onClick={() => { handleWishList(product, userDetails?.id) }} className="fa-regular fa-heart text-red-500 cursor-pointer text-[18px] sm:text-[22px] md:text-[24px]  absolute top-2 left-2"></i>
                        </div>
                        <h4 className='my-2 line-clamp-1'>{product.itemName}</h4>
                        <h3 className='my-2 text-[18px] sm:text-[22px]'>{product.price} EGP</h3>
                        <button onClick={() => { addToCart(product, userDetails?.id) }} className='bg-[rgba(251,176,59,0)] text-[14px] sm:text-[18px] px-2 py-1 my-2 w-3/4 rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>اضف للسلة</button>
                    </div>

                ) : <div className='text-center'>
                    <i className='fa-regular fa-heart text-red-500 lg:text-9xl md:text-8xl sm:text-7xl text-6xl'></i>
                    <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg  text-white my-3'>لا يوجد منتجات في المفضلة</h2>
                    <p className='text-gray-500'>لا يوجد لديك أي منتجات في قائمة الرغبات الخاصة بك حتى الآن.
                        <br />
                        ستجد الكثير من المنتجات المثيرة للاهتمام على صفحة "المتجر" الخاصة بنا.
                        العودة إلى المتجر</p>
                    <Link to={'/products'}> <button className='bg-[rgba(251,176,59,0)] text-white px-3 py-1 my-3  rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>العودة إلى المتجر</button> </Link>
                </div>}
            </div>

        </>
    )
}

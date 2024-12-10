import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AllProducts } from '../../Context/AllProducts';
import { AuthContext } from '../../Context/AuthContext';
import { WishListContext } from '../../Context/WishList';
import { CartContext } from '../../Context/CartContext';

export default function Products() {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [productContainer, setProductContainer] = useState([]);

  const { products } = useContext(AllProducts)
  const { userDetails } = useContext(AuthContext)
  const { handleWishList } = useContext(WishListContext)
  const { addToCart } = useContext(CartContext)



  const location = useLocation()

  const getOption = (e) => {
    setSelectedSort(e.target.value)
    if (e.target.value === "الاعلى سعرا") {
      setProductContainer(productContainer.sort((a, b) => b.price - a.price))
    } else if (e.target.value === "الاقل سعرا") {
      setProductContainer(productContainer.sort((a, b) => a.price - b.price))
    }

  }
  function getProduct(category = "كل المنتجات") {
    setSelectedOption(category);

    if (category === "كل المنتجات") {
      setProductContainer(products)
    } else {
      setProductContainer(products.filter(product => product.category === category))
    }

  }

  useEffect(() => {
    getProduct()
    setProductContainer(products)
  }, [products])



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
        <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">المتجر</h2>
        <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
      </div>
      <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
        <div className='border-b-2 border-[rgba(251,176,59,1)] py-3 flex justify-between md:flex-row flex-col'>
          <div className='flex sm:gap-5 text-white sm:flex-nowrap flex-wrap w-full md:w-2/3'>
            <h2 className='font-bold w-full'>الاقسام:</h2>
            <h2 className='cursor-pointer w-1/3 sm:w-full' onClick={() => getProduct("كل المنتجات")}>كل المنتجات</h2>
            <h2 className='cursor-pointer w-1/3 sm:w-full' onClick={() => getProduct("كوفي ميكس")}>كوفي ميكس</h2>
            <h2 className='cursor-pointer w-1/3 sm:w-full' onClick={() => getProduct("كابتشينو")}>كابتشينو</h2>
            <h2 className='cursor-pointer w-1/3 sm:w-full' onClick={() => getProduct("قهوة فرنسية")}>قهوة فرنسية</h2>
            <h2 className='cursor-pointer w-1/3 sm:w-full' onClick={() => getProduct("قهوة تركية")}>قهوة تركية</h2>
          </div>
          <div className='mt-3 md:mt-0'>
            <select value={selectedSort} onChange={getOption} className='bg-transparent border-b-2 border-white text-white focus:border-[rgba(251,176,59,1)] focus:outline-none'>
              <option className='bg-[rgba(251,176,59,1)]' value={"كل المنتجات"} >كل المنتجات</option>
              <option className='bg-[rgba(251,176,59,1)]' value={"الاعلى سعرا"}>على حسب الاعلى سعرا</option>
              <option className='bg-[rgba(251,176,59,1)]' value={"الاقل سعرا"}>على حسب الاقل سعرا</option>
            </select>

          </div>
        </div>

        <div>
          <h2 className='text-center lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold mt-5 mb-7 text-[rgba(251,176,59,1)]'>{selectedOption}</h2>
          <div className='flex flex-wrap justify-center my-5'>
            {productContainer.map((product) =>

              <div key={product.id} className="text-center  text-white px-2 mb-2 lg:w-1/4 md:w-1/3 w-1/2" >
                <div className='relative overflow-hidden'>
                  <Link to={`/product-details/${product.id}`}>
                    <img src={product.image} className='rounded-lg  w-full h-full hover:scale-[1.05] duration-500' alt={product.name} />
                  </Link>
                  <i onClick={() => { handleWishList(product, userDetails.id) }} className="fa-regular fa-heart text-red-500 cursor-pointer text-[18px] sm:text-[22px] md:text-[24px] absolute top-2 left-2"></i>
                  <h3 className='text-yellow-600 text-[14px] sm:text-[18px] md:text-[22px] absolute top-2 right-2'>{product.ratings}</h3>
                </div>
                <h4 className='my-2 line-clamp-1'>{product.name}</h4>
                <h3 className='my-2 text-[18px] sm:text-[22px]'>{product.price} EGP</h3>
                <button onClick={() => { addToCart(product, userDetails?.id) }} className='bg-[rgba(251,176,59,0)] text-[14px] sm:text-[18px] px-2 py-1 my-2 w-3/4 rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>اضف للسلة</button>
              </div>

            )}
          </div>
        </div>
      </div>
    </>
  )
}

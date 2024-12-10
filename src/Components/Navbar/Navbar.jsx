import React, { useContext, useState } from 'react'
import logo from '../../assets/images/logo.png.webp'
import cartEmpty from '../../assets/images/emptycart.webp'
import anonymousUser from '../../assets/images/38.jpg'
import { Link, NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import { AllProducts } from '../../Context/AllProducts'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenٍSearch, setIsOpenSearch] = useState(false)
  const [productSearch, setProductSearch] = useState([])
  const { isLogin, setIsLogin, userDetails, setuserDetails } = useContext(AuthContext)
  const { carts, deleteFromCart } = useContext(CartContext)
  const { products } = useContext(AllProducts)
  const cart = carts && carts.find((cart) => cart.userId === userDetails?.id)


  function getSearch(e) {
    setIsOpenSearch(true)
    const word = e.target.value.length
    word > 0 ? setProductSearch(products.filter(product => product.name.includes(e.target.value))) : setProductSearch([])
  }




  return (
    <>
      <nav className='flex justify-between items-center lg:h-[18vh]  h-[16vh] px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10  relative' >
        <div className='lg:hidden block text-white'>
          <div className='flex items-center gap-2 cursor-pointer' onClick={() => setIsOpenMenu(true)}>
            <i className='fa fa-bars text-2xl  text-white'></i>
          </div>
          <div className={`${isOpenMenu ? "w-full" : "w-0"} fixed top-0 left-0 duration-50 h-[100vh] z-[60] bg-[rgba(0,0,0,0.5)]`}>

            <div className={`${isOpenMenu ? "w-[350px]" : "w-0"} fixed top-0 right-0 duration-300 h-[100vh] z-40 bg-[#161616] border-l border-[rgba(251,176,59,1)] py-3 overflow-hidden`}>

              <i onClick={() => setIsOpenMenu(false)} className='fa fa-times text-2xl text-white absolute top-5 left-5 cursor-pointer hover:text-red-500 duration-300'></i>
              <div className='flex items-center gap-2 px-5 border-b border-gray-300 mt-12'>
                <input onKeyUp={getSearch} type="text" placeholder='البحث عن منتجات' className=' bg-transparent  py-1 w-full focus:outline-none' />
                <i className='fa fa-search text-[rgba(251,176,59,1)]'></i>
              </div>

              <div>
                <div className='py-3 border-b border-gray-300 px-5 group'>
                  <NavLink to="/" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='group-hover:-translate-x-5 duration-300'>الرئيسية</h3></NavLink>
                </div>
                <div className='py-3 border-b border-gray-300 px-5 group'>
                  <NavLink to="/about" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='group-hover:-translate-x-5 duration-300'>عن الشركة</h3></NavLink>
                </div>
                <div className='py-3 border-b border-gray-300 px-5 group'>
                  <NavLink to="/products" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='group-hover:-translate-x-5 duration-300'>كل المنتجات</h3></NavLink>
                </div>
                <div className='py-3 border-b border-gray-300 px-5 group'>
                  <NavLink to="/blogs" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><h3 className='group-hover:-translate-x-5 duration-300'>المدونة</h3></NavLink>
                </div>
              </div>


              <div className={`h-[300px] overflow-y-scroll w-full my-4  bg-[#161616]  text-white ${productSearch.length > 0 && isOpenٍSearch ? "block" : "hidden"}`}>
                {productSearch.length > 0 ? productSearch.map((product) =>
                  <Link to={`/product-details/${product.id}`} key={product.id}>
                    <div onClick={() => setIsOpenSearch(false)} className='flex gap-3 px-3 py-2' >

                      <div className='w-1/4'>
                        <img src={product.image} className='w-full h-[100px] object-cover' alt={product.name} />
                      </div>
                      <div className='w-2/3'>
                        <h3>{product.name}</h3>
                        <h3 className='mt-3'>{product.price} EGP</h3>
                      </div>

                    </div>
                  </Link>

                ) : <div>

                  <h2>لا يوجد منتجات</h2>
                </div>}
              </div>
            </div>
          </div>
        </div>


        <div>
          <NavLink to="/"> <img src={logo} className='w-full lg:h-[16vh] md:h-[14vh] sm:h-[12vh] h-[11vh] object-cover' alt="logo" /></NavLink>
        </div>


        <div className='hidden relative lg:w-1/2 lg:block '>
          <input onKeyUp={getSearch} type="text" placeholder='البحث عن منتجات' className='border border-gray-300 rounded-lg px-5 py-1 w-full focus:outline-none ' />
          <div className={`h-[300px] overflow-y-scroll w-full absolute top-[100%]  bg-[#161616]  text-white ${productSearch.length > 0 && isOpenٍSearch ? "block" : "hidden"}`}>
            {productSearch.length > 0 ? productSearch.map((product) =>
              <Link to={`/product-details/${product.id}`} key={product.id}>
                <div onClick={() => setIsOpenSearch(false)} className='flex gap-3 px-3 py-2' >

                  <div className='w-1/4'>
                    <img src={product.image} className='w-full h-[100px] object-cover' alt={product.name} />
                  </div>
                  <div className='w-2/3'>
                    <h3>{product.name}</h3>
                    <h3 className='mt-3'>{product.price} EGP</h3>
                  </div>

                </div>
              </Link>

            ) : <div>

              <h2>لا يوجد منتجات</h2>
            </div>}
          </div>
        </div>



        <div className='flex gap-0 justify-end items-center  lg:gap-7 '>
          <NavLink to="/wishpage" className={'lg:block hidden'}> <i className="fa-regular fa-heart text-white cursor-pointer text-2xl"></i></NavLink>
          <div className='relative lg:block hidden'>
            <i onClick={() => setIsOpen(true)} className="fa-solid fa-cart-shopping text-white cursor-pointer text-2xl"></i>
            <div className={`${isOpen ? "w-full" : "w-0"} fixed top-0 left-0 duration-50 h-[100vh] z-[60] bg-[rgba(0,0,0,0.5)]`}>
              <div className={`${isOpen ? "w-[350px]" : "w-0"} fixed top-0 left-0  h-[100vh] bg-[#161616] z-50 duration-300 text-white flex flex-col `}>
                <div className='h-5/6'>
                  <div className='flex justify-between items-center px-3 border-b border-gray-400 py-4'>
                    <h2 className='font-bold '>سلة المشتريات</h2>
                    <h3 onClick={() => setIsOpen(false)} className='hover:text-[rgba(251,176,59,1)] duration-300 cursor-pointer flex gap-2 items-center'>اغلاق <i className='fa-solid fa-xmark'></i></h3>
                  </div>
                  <div className='px-3 overflow-y-scroll py-2 h-5/6'>
                    {cart?.list.length > 0 ? cart?.list.map((product) =>
                      <div className='flex justify-between py-1 border-b border-gray-400' key={product.id}>
                        <div className='w-2/6'>
                          <Link to={`/product-details/${product.id}`}>
                            <img src={product.image} alt={product.itemName} />
                          </Link>
                        </div>
                        <div className='w-3/6 flex flex-col justify-around  ms-1'>
                          <h3 className='line-clamp-1'>{product.itemName}</h3>
                          <h4>الكمية:{product.count}</h4>
                          <h3 className='mt-3'>{product.price * product.count} EGP</h3>
                        </div>
                        <div className='w-1/6 h-full flex justify-center items-center mt-10'>
                          <i onClick={() => deleteFromCart(product, userDetails.id)} className='fa-regular fa-trash-can cursor-pointer text-red-500'></i>
                        </div>
                      </div>
                    ) : <div className='flex flex-col justify-center items-center h-full'>
                      <img src={cartEmpty} alt="cartEmpty" />
                      <h3 className='text-center mt-10'>لا يوجد منتجات في سلة المشتريات</h3>
                    </div>
                    }
                  </div>
                </div>
                <div className='border-t border-gray-400 px-3 py-2 h-1/6'>
                  <div className='flex justify-between '>
                    <h2>المجموع:</h2>
                    <h2>{cart?.list.reduce((a, b) => a + b.price * b.count, 0)} EGP</h2>
                  </div>
                  <Link to="/cart">
                    <button onClick={() => setIsOpen(false)} className='w-full py-2 bg-[rgba(251,176,59,.8)] hover:bg-[rgba(251,176,59,1)] duration-300 mt-5'>عرض السلة</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className='absolute -top-2 -right-3 w-4 h-4 bg-[#d6ae70] rounded-full flex justify-center items-center text-white'>
              <h4 className='transform -translate-y-[.5px] -translate-x-[.5px]'>{cart?.list.length}</h4>
            </div>
          </div>
          <div className='group relative '>
            {isLogin ? <div className='w-12 h-12 rounded-full'><img src={userDetails?.image ? userDetails?.image : anonymousUser} className='w-full h-full object-cover rounded-full' alt="user-profile" /></div> : <NavLink to="/myAccount" className={({ isActive }) => isActive ? "text-white" : "text-gray-500"}><i class="fa-regular fa-circle-user cursor-pointer  duration-500 text-3xl"></i> </NavLink>}
            {isLogin ? <div id='m' className='absolute -buttom-32 left-0 lg:-left-20 lg:w-[300px] w-[200px] bg-[#d6ae70] translate-y-10 text-white p-2 opacity-0  group-hover:opacity-100  group-hover:translate-y-0 duration-500'>
              <Link to={'/profile'}>
                <h3 className='cursor-pointer hover:-translate-x-4 duration-500 pb-1'>الصفحة الشخصية</h3>
              </Link>
              <hr />
              <h3 onClick={() => { localStorage.clear(); setIsLogin(false); setuserDetails([]) }} className='cursor-pointer hover:-translate-x-4 duration-500'>تسجيل الخروج</h3> </div> : ""
            }

          </div>
        </div>



        <div className='lg:hidden  fixed bottom-0 left-0 w-[100%] h-[70px] bg-[#161616] shadow-[0px_-5px_10px_0px_rgba(0,0,0,0.5)] z-[50]'>
          <div className='flex justify-between items-center h-full relative px-5  md:px-16 sm:px-10'>
            <div>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><i className="fa-solid fa-home text-white cursor-pointer text-2xl hover:text-[rgba(251,176,59,1)] duration-300"></i></NavLink>

            </div>
            <div >
              <NavLink to="/products" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}><i className="fa-solid fa-shop text-white cursor-pointer text-2xl hover:text-[rgba(251,176,59,1)] duration-300"></i></NavLink>
            </div>

            <div className='relative'>
              <NavLink to="/cart" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}> <i className="fa-solid fa-cart-shopping text-white cursor-pointer text-2xl hover:text-[rgba(251,176,59,1)] duration-300"></i></NavLink>
              <div className='absolute -top-2 -right-3 w-4 h-4 bg-[#d6ae70] rounded-full flex justify-center items-center text-white'>
                <h4 className='transform -translate-y-[.5px] -translate-x-[.5px]'>{cart?.list.length}</h4>
              </div>
            </div>
            <div>
              <NavLink to="/wishpage" className={({ isActive }) => isActive ? "text-[rgba(251,176,59,1)]" : "text-white"}> <i className="fa-regular fa-heart text-white cursor-pointer text-2xl hover:text-[rgba(251,176,59,1)] duration-300"></i></NavLink>
            </div>


          </div>
        </div>
      </nav>



    </>
  )
}

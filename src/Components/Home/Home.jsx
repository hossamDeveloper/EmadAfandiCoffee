import React, { useContext, useEffect, useMemo, useState } from 'react'
import banner from '../../assets/images/emadafandi-coffee.png.webp'
import CoffeeMix from '../../assets/images/CoffeeMix.jpg'
import capatcheno from '../../assets/images/capatcheno.jpg'
import frenshCoffee from '../../assets/images/frenshCoffee.jpg'
import turckishCoffe from '../../assets/images/turckishCoffe.jpg'
import bigOffer1 from '../../assets/images/bigOffer1.webp'
import bigOffer2 from '../../assets/images/bigOffer2.jpeg'
import { AllProducts } from '../../Context/AllProducts'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom'
import { WishListContext } from '../../Context/WishList'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'

export default function Home() {
  const [someProduct, setSomeProduct] = useState([])
  const { products } = useContext(AllProducts)
  const { handleWishList } = useContext(WishListContext)
  const { userDetails } = useContext(AuthContext)
  const { addToCart } = useContext(CartContext)
  const [typeCoffee, setTypeCoffee] = useState([])







  const carouselOptions = {

    mouseTracking: false, // Enables mouse tracking for drag
    infinite: true, // Infinite looping of the carousel
    autoPlay: true, // Autoplay the carousel
    autoPlayInterval: 3000, // Interval for autoplay in ms (2 seconds)
    stagePadding: { paddingLeft: 0, paddingRight: 0 }, // Stage padding for spacing
    disableDotsControls: true, // Disables dot navigation controls
    disableButtonsControls: false, // Disables next/previous buttons
    responsive: {
      0: { items: 2 },  // 1 item for small screens
      768: { items: 3 }, // 3 items for medium screens (tablets)
      1024: { items: 4 }, // 4 items for large screens (desktops)

    },
    // onSlideChanged: (event) => {
    //   console.log('Slide changed to:', event.item); // Log when slide changes
    // },
    // onInitialized: () => {
    //   console.log('Carousel Initialized'); // Log when carousel is initialized
    // },
    renderPrevButton: () => <button className='text-white '>المنتج السابق</button>, // Custom previous button
    renderNextButton: () => <button className='text-white'>المنتج التالي</button>, // Custom next button
    // renderDotsItem: (dot) => <div className="custom-dot">{dot}</div>, // Custom dots item rendering
  };


  function getCoffeeType(type) {
    if (type === "سادة") {


      setTypeCoffee([])
      setTypeCoffee(products.filter(product => product.grind_type === "سادة"))
    } else {
      setTypeCoffee([])
      setTypeCoffee(products.filter(product => product.grind_type === "محوج"))
    }

  }

  useEffect(() => {
    setSomeProduct(products.slice(0, 10))
    setTypeCoffee(products.filter(product => product.grind_type === "سادة"))

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
      {/* <!-- banner --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 bg-[#111111] xl:my-8 lg:my-6 md:my-4 sm:my-2 my-0'>
        <img src={banner} className='w-full' alt="banner" />
      </section>
      {/* <!-- categories --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
        <div className='flex justify-center items-center  flex-wrap md:flex-nowrap md:gap-4'>
          <div className='w-1/2  md:w-1/4 pe-3 md:p-0 mb-3 md:m-0'>
            <div className='w-full overflow-hidden rounded-lg hover:shadow-[2px_2px_4px_#d6ae70,-2px_-2px_4px_#d6ae70,2px_-2px_4px_#d6ae70,-2px_2px_4px_#d6ae70]  duration-500'>
              <img src={CoffeeMix} alt="coffeeMix" className='w-full rounded-lg cursor-pointer hover:scale-110  duration-500' />
            </div>
            <h2 className='text-center text-white mt-2 text-xl md:text-[20px]'>كوفي ميكس</h2>
          </div>
          <div className='w-1/2  md:w-1/4 ps-3 md:p-0 mb-3 md:m-0'>
            <div className='w-full overflow-hidden rounded-lg hover:shadow-[2px_2px_4px_#d6ae70,-2px_-2px_4px_#d6ae70,2px_-2px_4px_#d6ae70,-2px_2px_4px_#d6ae70]  duration-500'>
              <img src={capatcheno} alt="capatcheno" className='w-full rounded-lg cursor-pointer hover:scale-110  duration-500' />
            </div>
            <h2 className='text-center text-white mt-2 text-xl md:text-[20px]'>كابتشينو</h2>

          </div>
          <div className='w-1/2  md:w-1/4 pe-3 md:p-0 mb-3 md:m-0'>
            <div className='w-full overflow-hidden rounded-lg hover:shadow-[2px_2px_4px_#d6ae70,-2px_-2px_4px_#d6ae70,2px_-2px_4px_#d6ae70,-2px_2px_4px_#d6ae70]  duration-500'>

              <img src={frenshCoffee} alt="frenshCoffee" className='w-full rounded-lg cursor-pointer hover:scale-110  duration-500' />
            </div>
            <h2 className='text-center text-white mt-2 text-xl md:text-[20px]'>قهوة فرنسية</h2>

          </div>
          <div className='w-1/2 md:w-1/4 ps-3 md:p-0 mb-3 md:m-0'>
            <div className='w-full overflow-hidden rounded-lg hover:shadow-[2px_2px_4px_#d6ae70,-2px_-2px_4px_#d6ae70,2px_-2px_4px_#d6ae70,-2px_2px_4px_#d6ae70]  duration-500'>

              <img src={turckishCoffe} alt="turckishCoffe" className='w-full rounded-lg cursor-pointer hover:scale-110  duration-500' />
            </div>
            <h2 className='text-center text-white mt-2 text-xl md:text-[20px]'> قهوة تركية</h2>

          </div>
        </div>
      </section>

      {/* <!-- big offer --> */}
      <section className='flex justify-center items-center flex-wrap sm:flex-nowrap px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>

        <div className='w-full mb-3 me-0 sm:me-3 sm:w-1/2 sm:mb-0 '>
          <img src={bigOffer1} className='w-full' alt="bigOffer1" />
        </div>
        <div className='w-full  sm:w-1/2'>
          <img src={bigOffer2} className='w-full' alt="bigOffer2" />
        </div>

      </section>

      {/* <!-- some products --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
        <h2 className='relative text-center bg-[#161616]  text-white text-[18px] sm:text-[22px] md:text-[26px] mb-5 before:content-[""] before:bg-[rgba(251,176,59,1)] before:w-1/4 before:h-1 before:absolute before:top-1/2 before:left-0 after:content-[""] after:bg-[rgba(251,176,59,1)] after:w-1/4 after:h-1 after:absolute after:top-1/2 after:right-0'>احدث المنتجات</h2>
        <AliceCarousel {...carouselOptions} className='relative'>
          {someProduct.map((product) => (

            <div className='me-2 text-center text-white' key={product.id}>
              <div className='relative overflow-hidden'>
                <Link to={`/product-details/${product.id}`}>  <img src={product.image} className='rounded-lg  w-full h-full hover:scale-[1.05] duration-500' alt={product.name} /></Link>
                <i onClick={() => { handleWishList(product, userDetails?.id); }} className={`fa-regular fa-heart text-red-500 cursor-pointer text-[18px] sm:text-[22px] md:text-[24px] absolute top-2 left-2`}></i>
                <h3 className='text-yellow-600 text-[14px] sm:text-[18px] md:text-[22px] absolute top-2 right-2'>{product.ratings}</h3>
              </div>
              <h4 className='my-2 line-clamp-1'>{product.name}</h4>
              <h3 className='my-2 text-[18px] sm:text-[22px]'>{product.price} EGP</h3>
              <button onClick={() => { addToCart(product, userDetails?.id) }} className='bg-[rgba(251,176,59,0)] text-[14px] sm:text-[18px] px-2 py-1 my-2 w-3/4 rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>اضف للسلة</button>
            </div>

          ))}
        </AliceCarousel>
      </section>

      {/* <!-- Turkish Coffe --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
        <div className='flex items-end border-b-2 border-[rgba(251,176,59,1)] pb-2'>
          <h2 className='text-white text-[18px] sm:text-[22px] md:text-[26px] me-5 '>قهوة تركية</h2>
          <h3 onClick={() => { getCoffeeType("سادة") }} className='me-3 cursor-pointer text-[16px] sm:text-[20px] md:text-[24px] text-gray-500 hover:text-white duration-300 '>سادة</h3>
          <h3 onClick={() => { getCoffeeType("محوج") }} className='me-3 cursor-pointer text-[16px] sm:text-[20px] md:text-[24px] text-gray-500 hover:text-white duration-300 '>محوج</h3>
        </div>
        <div className='my-5 flex flex-wrap'>
          {typeCoffee.map((product) => (

            <div className='text-center  text-white px-2 mb-2 lg:w-1/4 md:w-1/3 w-1/2' key={product.id}>
              <div className='relative overflow-hidden '>
                <Link to={`product-details/${product.id}`} ><img src={product.image} className='rounded-lg w-full h-full hover:scale-[1.05] duration-500' alt={product.name} /></Link>
                <i onClick={() => { handleWishList(product, userDetails?.id) }} className={`fa-regular fa-heart text-red-500 cursor-pointer text-[18px] sm:text-[22px] md:text-[24px] absolute top-2 left-2`}></i>
                <h3 className='text-yellow-600  absolute top-2 right-2 text-[14px] sm:text-[18px] md:text-[22px]'>{product.ratings}</h3>
              </div>
              <h4 className='my-2 line-clamp-1'>{product.name}</h4>
              <h3 className='my-2 text-[18px] sm:text-[22px]'>{product.price} EGP</h3>
              <button onClick={() => { addToCart(product, userDetails?.id) }} className='bg-[rgba(251,176,59,0)] text-[14px] sm:text-[18px] px-2 py-1 my-2 w-3/4 rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>اضف للسلة</button>
            </div>

          ))}
        </div>
      </section>

      {/* <!-- video about coffee --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>

        <iframe className='w-full h-[300px] md:h-[500px]' src="https://www.youtube.com/embed/7gpKdvWmz4Q?si=6FGMkXi2zRCxHSCd" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </section>

      {/* <!-- about us --> */}
      <section className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
        <div className='text-center py-5 px-6 bg-[rgba(251,176,59,1)] rounded-lg'>
          <h3 className='text-black text-3xl mb-5'>عن الشركة</h3>
          <p className='text-gray-800 '>نحن شركة قهوة مصرية رائدة تأسست في جمهورية مصر العربية عام 1995. تتكون مجموعة العطيان و (عماد أفندي) من مجموعة من العلامات التجارية المتكاملة. نقدم منتجات القهوة عالية الجودة ذات الثقة للعملاء والمستهلكين في جميع أنحاء مصر والشرق الأوسط . تقع أصول الشركة في جمهورية مصر العربية ، ويعمل بها أكثر من 300 موظف في تصنيع وتوزيع وتسويق مختلف منتجات القهوة عالية الجودة.</p>
        </div>
      </section>




    </>
  )
}

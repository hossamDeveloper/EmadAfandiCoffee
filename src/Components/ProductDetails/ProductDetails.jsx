import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AllProducts } from '../../Context/AllProducts'
import axios from 'axios'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify'
import { AuthContext } from '../../Context/AuthContext'
import AliceCarousel from 'react-alice-carousel'
import { WishListContext } from '../../Context/WishList'
import { CartContext } from '../../Context/CartContext'

export default function ProductDetails() {
  const [product, setProduct] = useState({})
  const [related, setrelated] = useState([])

  const { id } = useParams()
  const { products } = useContext(AllProducts)
  const { userDetails } = useContext(AuthContext)
  const { handleWishList } = useContext(WishListContext)
  const { addToCart, counter, setCounter, handleIncrementAndDecrement } = useContext(CartContext)

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

    renderPrevButton: () => <button className='text-white '>المنتج السابق</button>, // Custom previous button
    renderNextButton: () => <button className='text-white'>المنتج التالي</button>, // Custom next button
  };
  const initialValues = {
    reviewer: "",
    rating: null,
    comment: ""
  }
  const validationSchema = Yup.object().shape({
    reviewer: Yup.string().required("الاسم مطلوب"),
    rating: Yup.number().min(1, "التقييم يجب ان يكون على الاقل 1").max(5, "التقييم يجب ان يكون على الاكثر 5").required("التقييم مطلوب"),
    comment: Yup.string().required("التقييم مطلوب"),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addReview
  })
  async function addReview(values) {
    const ratings = product.reviews.reduce((sum, review) => sum + review.rating, 0)
    const avgRating = ratings / product.reviews.length
    product.ratings = Math.floor(avgRating)
    const review = product.reviews
    review.push(values)
    await axios.put(`http://localhost:3000/products/${id}`, product)
      .then(response => {
        console.log(response.data);
        toast.success("شكرا لك للتقييم")
        formik.resetForm()
      }).catch(error => {
        console.log(error);
      })
  }

  async function getProduct(id) {
    await axios.get(`http://localhost:3000/products/${id}`)
      .then(response => {
        console.log(response.data);
        setProduct(response.data)
      }).catch(error => {
        console.log(error);

      })

  }
  useEffect(() => {
    getProduct(id)

  }, [id])

  useEffect(() => {
    setrelated(products.filter(prod => prod.grind_type === product.grind_type && prod.id !== id))
  }, [product])

  useMemo(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [id])

  return (
    <>
      <div className='xl:my-8 lg:my-6 md:my-4 sm:my-2 my-0'>
        <div className='flex justify-between px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:flex-row flex-col'>
          <div className='xl:w-1/2 w-full'>
            <img src={product.image} className='xl:w-full lg:w-1/2 md:w-2/3 sm:w-5/6 m-auto rounded-lg' alt={product.name} />
          </div>
          <div className='xl:w-1/2 w-full text-white ps-4'>
            <h4 className='text-gray-500'>الرئيسية / {product.category} / {product.name}</h4>

            <div className='flex justify-between my-5'>
              <h2 className='font-bold md:text-3xl sm:text-2xl text-xl '>{product.name}</h2>
              <h2 className='md:text-2xl text-xl font-bold text-yellow-400 text-center'>{product.ratings} <i className="fa-solid fa-star"></i></h2>

            </div>

            <p className='text-gray-300 tracking-wider leading-8'>{product.description}</p>

            <ul >
              <li className='my-2'>درجة القهوة: {product.roast_level}</li>
              <li className='my-2'>وزن القهوة: {product.weight}</li>
              <li className='my-2'>بلد الاصدار : {product.origin}</li>
              <li>نوع القهوة : {product.grind_type}</li>


            </ul>

            <h2 className='font-bold md:text-2xl text-xl  my-5'>السعر : {product.price} EGP</h2>
            <div className='flex items-center'>
              <div className='flex  items-center gap-5 me-3'>
                <h2 onClick={() => handleIncrementAndDecrement("decrement")} className='cursor-pointer bg-gray-900 border border-[rgba(251,176,59,1)] rounded-lg  text-2xl w-8 h-14 flex justify-center items-center'>-</h2>
                <h2 className='cursor-pointer border border-[rgba(251,176,59,1)] rounded-lg   w-10 h-14 flex justify-center items-center'>{counter}</h2>
                <h2 onClick={() => handleIncrementAndDecrement("increment")} className='cursor-pointer bg-gray-900 border border-[rgba(251,176,59,1)] rounded-lg  text-2xl w-8 h-14 flex justify-center items-center'>+</h2>
              </div>
              <button onClick={() => addToCart(product, userDetails.id)} className='text-white bg-[rgba(251,176,59,.7)] px-5 py-2 rounded-lg w-1/2 hover:bg-[rgba(251,176,59,1)] duration-300'>اضافة للسلة</button>
            </div>
            <h3 onClick={() => { handleWishList(product, userDetails.id) }} className='my-5 cursor-pointer flex items-center'>اضافة للمفضلة <i className='fa-regular fa-heart text-red-500 ms-2 text-2xl'></i></h3>
            <div className='border-t border-gray-500 mt-5'>
              <h3 className='my-3'>رمز المنتج : {product.id}</h3>
              <h3 className='my-3'>التصنيف: {product.category}</h3>

            </div>
          </div>
        </div>

        <div className='xl:my-8 lg:my-6 md:my-4 my-2  px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 py-5 bg-[#111111]'>
          <h2 className='md:text-2xl text-xl font-bold text-white text-center'>يسعدنا اصافة تعليقك</h2>
          <form onSubmit={formik.handleSubmit} className='flex flex-wrap justify-center gap-5'>
            <div className='w-full lg:w-1/3'>
              <label className='text-white' htmlFor="reviewer">ادخل اسمك:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.reviewer = userDetails.name || formik.values.reviewer} type="text" name='reviewer' id='reviewer' className=' border-2 border-gray-500 bg-transparent text-white mt-1 px-5  py-1 w-full focus:outline-none' />
              {formik.touched.reviewer && formik.errors.reviewer && <span className='text-red-500'>{formik.errors.reviewer}</span>}

            </div>
            <div className='w-full lg:w-1/3'>
              <label className='text-white' htmlFor="rating">قم بتقييم المنتج:</label>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rating} type="number" name='rating' id='rating' className='border-2 border-gray-500 bg-transparent text-white mt-1 px-5  py-1 w-full focus:outline-none' placeholder='1-5' />
              {formik.touched.rating && formik.errors.rating && <span className='text-red-500'>{formik.errors.rating}</span>}

            </div>
            <div className='w-full lg:w-1/2 '>
              <label className='text-white' htmlFor="comment">قم بالتعليق:</label>
              <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.comment} name="comment" id="comment" className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none'></textarea>
              {formik.touched.comment && formik.errors.comment && <span className='text-red-500'>{formik.errors.comment}</span>}

            </div>
            <button type='submit' className='text-white bg-[rgba(251,176,59,.7)] px-5 py-2 rounded-lg w-1/2 hover:bg-[rgba(251,176,59,1)] duration-300'>addReview</button>
          </form>
        </div>

        <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6 md:my-4 sm:my-2 my-0'>
          <h2 className='relative text-center bg-[#161616]  text-white text-[18px] sm:text-[22px] md:text-[26px] mb-5 before:content-[""] before:bg-[rgba(251,176,59,1)] before:w-1/4 before:h-1 before:absolute before:top-1/2 before:left-0 after:content-[""] after:bg-[rgba(251,176,59,1)] after:w-1/4 after:h-1 after:absolute after:top-1/2 after:right-0'>منتجات ذات صلة</h2>
          <AliceCarousel {...carouselOptions} className='relative'>
            {related.map((product) => (

              <div key={product.id} className="text-center  text-white  me-2">
                <div className='relative overflow-hidden'>
                  <Link to={`/product-details/${product.id}`} ><img src={product.image} className='rounded-lg w-full h-full hover:scale-[1.05] duration-500' alt={product.name} /></Link>
                  <i onClick={() => { handleWishList(product, userDetails.id) }} className="fa-regular fa-heart text-red-500 cursor-pointer text-2xl absolute top-2 left-2"></i>
                  <h3 className='text-yellow-600 text-[14px] sm:text-[18px] md:text-[22px] absolute top-2 right-2'>{product.ratings}</h3>
                </div>
                <h4 className='my-2 line-clamp-1'>{product.name}</h4>
                <h3 className='my-2 text-[18px] sm:text-[22px]'>{product.price} EGP</h3>
                <button onClick={() => { addToCart(product, userDetails?.id) }} className='bg-[rgba(251,176,59,0)] text-[14px] sm:text-[18px] px-2 py-1 my-2 w-3/4 rounded-2xl border border-[rgba(251,176,59,1)] hover:bg-[rgba(251,176,59,1)] duration-500  '>اضف للسلة</button>
              </div>
            ))}
          </AliceCarousel>
        </div>

      </div>
    </>
  )
}

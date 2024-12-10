import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishList';

export default function Register() {

    const { setIsLogin, isLogin, setuserDetails, userDetails } = useContext(AuthContext)
    const { getCart } = useContext(CartContext)
    const { getWishList } = useContext(WishListContext)
    const navigate = useNavigate()

    const initialValues = {
        email: "",
        password: ""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('الايميل يجب ان يكون صحيح').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'الايميل يجب ان يكون صحيح').required('الايميل مطلوب'),
        password: Yup.string().matches(/^[a-z0-9_]{6,14}$/, "كلمة المرور يجب ان تكون اكثر من 6 حروف").required("كلمة المرور مطلوبة"),
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleLogin
    })


    function handleLogin(values) {
        formik.setSubmitting(true)
        axios.get('http://localhost:3000/users')
            .then(response => {
                let users = response.data
                const user = users.find(user => user.email === values.email && user.password === values.password)
                if (user) {
                    toast.success('تم تسجيل الدخول بنجاح!');
                    navigate('/')
                    localStorage.setItem('userIsLogin', !isLogin)
                    localStorage.setItem('userDetails', JSON.stringify(user.id))
                    setIsLogin(!isLogin)
                    setuserDetails(user)
                    formik.resetForm();
                    getCart()
                    getWishList()
                } else {
                    toast.error('!يرجى التحقق من البيانات المدخلة');
                }


            }).catch(error => {
                toast.error(error);
            }).finally(() => {
                formik.setSubmitting(false);

            })

    }


  

    return (
        <>
            <div className='w-full lg:w-1/2 lg:border-e-2 border-[#d6ae70] lg:pe-20 pe-0 border-e-0'>
                <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg mb-4 font-semibold'>تسجيل الدخول</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email" > البريد الالكتروني:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' autoComplete="current-email" className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                        {formik.touched.email && formik.errors.email && <span className='text-red-500'>{formik.errors.email}</span>}

                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password" >كلمة المرور:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' autoComplete="current-password" className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                        {formik.touched.password && formik.errors.password && <span className='text-red-500'>{formik.errors.password}</span>}
                    </div>
                    <button type='submit' className='bg-[#d6ae70] px-5 py-1 w-full mt-4 hover:bg-[#bf9a62] duration-500'>{formik.isSubmitting ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</button>
                </form>
                <h3 className='mt-3 text-gray-400 cursor-pointer hover:text-gray-600 duration-500'>هل نسيت كلمة المرور؟</h3>
            </div>
        </>
    )
}

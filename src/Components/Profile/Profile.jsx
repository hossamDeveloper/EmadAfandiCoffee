import React, { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup'

export default function Profile() {
    const [updateShow, setUpdateShow] = useState(true)
    const location = useLocation()
    const { userDetails, setuserDetails } = useContext(AuthContext)


    const initialValues = {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        age: userDetails.age,
        password: userDetails.password,
        phone: userDetails.phone,
        name: userDetails.name,
        image: userDetails.image,
        address: {
            address: userDetails?.address?.address,
            city: userDetails?.address?.city,
            postalCode: userDetails?.address?.postalCode,
            notes: userDetails?.address?.notes
        },
        role: "user"
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف").max(15),
        email: Yup.string().email('الايميل يجب ان يكون صحيح').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'الايميل يجب ان يكون صحيح'),
        password: Yup.string().matches(/^[a-z0-9_]{6,14}$/, "كلمة المرور يجب ان تكون اكثر من 6 حروف"),
    })

    const formik = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: handleUpdateProfile
        }
    )

    function handleUpdateProfile(values) {
        userDetails.firstName = values.firstName ? values.firstName : userDetails.firstName
        userDetails.lastName = values.lastName ? values.lastName : userDetails.lastName
        userDetails.age = values.age ? values.age : userDetails.age
        userDetails.password = values.password ? values.password : userDetails.password
        userDetails.phone = values.phone ? values.phone : userDetails.phone
        userDetails.email = values.email ? values.email : userDetails.email
        userDetails.address.address = values.address.address ? values.address.address : userDetails.address.address
        userDetails.address.city = values.address.city ? values.address.city : userDetails.address.city
        userDetails.name = values.name ? values.name : userDetails.name
        console.log(userDetails);

        axios.put(`http://localhost:3000/users/${userDetails.id}`, userDetails)
            .then(response => {
                console.log("afterUpdate", response.data);
                toast.success('تم تحديث الملف الشخصي بنجاح')
                setUpdateShow(true)
            })

    }

    const changePhoto = async (e) => {
        console.log(e.target.files[0]);
        const file = e.target.files[0];
        if (!file) {
            return;
        } else {
            const dataImage = new FormData();
            dataImage.append('file', file);
            dataImage.append('upload_preset', 'profile-image');
            dataImage.append('cloud_name', 'elsanta');

            try {
                const { data } = await axios.post('https://api.cloudinary.com/v1_1/elsanta/image/upload', dataImage)
                console.log(data.url);
                userDetails.image = data.url
                axios.put(`http://localhost:3000/users/${userDetails.id}`, userDetails)
                    .then(response => {
                        setuserDetails(response.data)
                        toast.success('تم تحديث الصورة بنجاح')
                    })
            } catch (error) {
                console.log(error);
            }
        }

    }



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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">الصفحة الشخصية</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
                <div className='flex gap-4 items-center sm:flex-row flex-col relative text-white'>
                    <div className='sm:w-1/4 w-3/4 mt-5 sm:mt-0' >

                        <div className='overflow-hidden rounded-full relative bg-gray-300 group' >
                            <img src={userDetails?.image} className='rounded-full w-full h-full object-cover' alt="profileImage" />
                            <label htmlFor="image" className='h-10 group-hover:bottom-0 duration-300  cursor-pointer text-center absolute -bottom-10 left-0 w-full bg-[rgba(251,176,59,1)]'>تغيير الصورة</label>
                            <input onChange={changePhoto} type="file" name='image' id='image' className='hidden' />
                        </div>

                    </div>

                    <div className={`${updateShow ? "w-3/4 block" : "hidden"} `}>
                        <div>
                            <div className='flex gap-6'>
                                <h2>الاسم: {userDetails?.name ? userDetails?.name : "غير محدد"}</h2>
                                <h2>العمر: {userDetails?.age ? userDetails?.age : "غير محدد"}</h2>
                            </div>
                            <h2 className='mt-4'>العنوان: {userDetails?.address?.city ? userDetails?.address?.city : "غير محدد"}</h2>
                            <h2 className='mt-4'>البريد الالكتروني: {userDetails?.email ? userDetails?.email : "غير محدد"}</h2>
                            <h2 className='mt-4'>رقم الهاتف: {userDetails?.phone ? userDetails?.phone : "غير محدد"}</h2>
                        </div>

                    </div>

                    <h2 onClick={() => setUpdateShow(!updateShow)} className='absolute top-0 left-0 cursor-pointer'>تعديل البيانات <i className='fa-solid fa-pen text-yellow-400'></i></h2>


                    <div className={`${!updateShow ? "w-5/6 block" : "w-0 hidden"}`}>
                        <div>
                            {userDetails.id && <form onSubmit={formik.handleSubmit} className='mt-4' >
                                <div className='flex sm:gap-4 gap-0 sm:flex-nowrap flex-wrap'>
                                    <div className='sm:w-1/3 w-full'>
                                        <label htmlFor="firstName" >الاسم الاول:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName ? formik.values.firstName : userDetails?.firstName} type="text" name='firstName' id='firstName' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                    </div>
                                    <div className='sm:w-1/3 w-full sm:mt-0 mt-3'>
                                        <label htmlFor="lastName" >الاسم الاخير:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName ? formik.values.lastName : userDetails?.lastName} type="text" name='lastName' id='lastName' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                    </div>
                                    <div className='sm:w-1/3 w-full sm:mt-0 mt-3'>
                                        <label htmlFor="age" >العمر:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.age ? formik.values.age : userDetails?.age} type="number" name='age' id='age' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                    </div>
                                </div>
                                <div className='mt-3 flex sm:gap-4 gap-0 sm:flex-nowrap flex-wrap'>
                                    <div className='sm:w-1/2 w-full'>
                                        <label htmlFor="email" >البريد الالكتروني:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email ? formik.values.email : userDetails?.email} type="email" name='email' id='email' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                        {formik.touched.email && formik.errors.email && <span className='text-red-500'>{formik.errors.email}</span>}
                                    </div>
                                    <div className='sm:w-1/2 w-full sm:mt-0 mt-3'>
                                        <label htmlFor="password" >كلمة المرور:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password ? formik.values.password : userDetails?.password} type="password" name='password' id='password' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                        {formik.errors.password && <span className='text-red-500'>{formik.errors.password}</span>}
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="phone" >رقم الهاتف:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone ? formik.values.phone : userDetails?.phone} type="tel" name='phone' id='phone' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none text-end' />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="name" >اسم المستخدم:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name ? formik.values.name : userDetails?.name} type="text" name='name' id='name' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                    {formik.errors.name && <span className='text-red-500'>{formik.errors.name}</span>}
                                </div>

                                <div className='mt-3 flex sm:gap-4 gap-0 sm:flex-nowrap flex-wrap'>
                                    <div className='sm:w-1/2 w-full'>
                                        <label htmlFor="city">المدينة / المحافظة:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address?.city ? formik.values.address?.city : userDetails?.address?.city} name='address.city' type="text" id='city' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />

                                    </div>
                                    <div className='sm:w-1/2 w-full sm:mt-0 mt-3'>
                                        <label htmlFor="address">العنوان بالتفصيل:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values?.address?.address ? formik.values?.address?.address : userDetails?.address?.address} name='address.address' type="text" id='address' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                                    </div>

                                </div>


                                <button type='submit' className='bg-yellow-400 px-5 py-2 mt-5'>حفظ</button>



                            </form>}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

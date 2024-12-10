import axios from 'axios'
import { useFormik } from 'formik'
import React, { useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from '../Login/Login'
import * as Yup from 'yup'
import { v4 as uuidv4 } from 'uuid';


export default function MyAccount() {
  const [register, setRegister] = useState(false)
  const location = useLocation()
  const initialValues = {
    id: "",
    firstName: "",
    lastName: "",
    age: null,
    password: "",
    phone: "",
    name: "",
    password: "",
    image: "",
    address: {
      address: "",
      city: "",
      postalCode: "",
      notes: ""
    },
    role: "user"
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف").max(15).required("اسم المستخدم مطلوب"),
    email: Yup.string().email('الايميل يجب ان يكون صحيح').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'الايميل يجب ان يكون صحيح').required('الايميل مطلوب'),
    password: Yup.string().matches(/^[a-z0-9_]{6,14}$/, "كلمة المرور يجب ان تكون اكثر من 6 حروف").required("كلمة المرور مطلوبة"),
  })

  const formik = useFormik(
    {
      initialValues,
      validationSchema,
      onSubmit: handleRegister
    }
  )

  async function handleImage(e) {
    const newUuid = uuidv4();
    formik.setFieldValue('id', newUuid);
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
        formik.setFieldValue('image', data.url);
      } catch (error) {
        console.log(error);

      }
    }

  }

  function handleRegister(values) {

    console.log(values);

    axios.get('http://localhost:3000/users')
      .then(response => {
        const users = response.data;
        const emailExists = users.some(user => user.email === values.email);

        if (emailExists) {
          toast.error('البريد الإلكتروني موجود بالفعل!');
        } else {
          axios.post('http://localhost:3000/users', values)
            .then(response => {
              toast.success('تم تسجيل بنجاح!');
              setRegister(false)
              createWishList()
              createCart()
              createOrder()
            })
            .catch(error => {
              toast.error('حدث خطأ أثناء التسجيل!')
            }).finally(() => {
              formik.resetForm();
            })
        }
      })
      .catch(error => {
        console.error('حدث خطأ في التحقق من البريد الإلكتروني:', error);
      });
  }

  function createWishList() {
   
    const wishList = {
      userId: formik.values.id,
      list: [
        
      ]
    }
    
    axios.post('http://localhost:3000/wishlist', wishList)
      .then(response => {
        
      }).catch(error => {
      })
  }
  function createCart() {
   
    const cart = {
      userId: formik.values.id,
      list: [
        
      ]
    }
    
    axios.post('http://localhost:3000/cart', cart)
      .then(response => {

      }).catch(error => {
      })
  }
   function createOrder() {
    
    const order = {
        userId: formik.values.id,
        orders: [
          
        ]
      }
     axios.post('http://localhost:3000/ordersUsers',order)
        .then(response => {
            
        }).catch(error => {
          console.log("errorCreateOrder",error);
          
        })
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
        <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">MyAccount</h2>
        <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
      </div>

      <div className='flex justify-center text-white px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 my-5  lg:flex-row flex-col'>
        {!register ?
          <Login /> :
          <div className='w-full lg:w-1/2 lg:border-e-2 border-[#d6ae70] lg:pe-20 pe-0 border-e-0'>
            <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg mb-4 font-semibold'>انشاء حساب</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="image" >الصورة الشخصية:</label>
                <input onChange={handleImage} type="file" name='image' id='image' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />

              </div>
              <div className='mb-3'>
                <label htmlFor="name" >اسم المستخدم:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name='name' id='name' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                {formik.touched.name && formik.errors.name && <span className='text-red-500'>{formik.errors.name}</span>}

              </div>
              <div className='mb-3'>
                <label htmlFor="email" >البريد الالكتروني:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name='email' id='email' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                {formik.touched.email && formik.errors.email && <span className='text-red-500'>{formik.errors.email}</span>}

              </div>
              <div className='mb-3'>
                <label htmlFor="password" >كلمة المرور:</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name='password' id='password' className='border-2 border-gray-500 bg-transparent text-white mt-1  px-5 py-1 w-full focus:outline-none' />
                {formik.touched.password && formik.errors.password && <span className='text-red-500'>{formik.errors.password}</span>}

              </div>
              <button type='submit' className='bg-[#d6ae70] px-5 py-1 w-full mt-4 hover:bg-[#bf9a62] duration-500'>انشاء حساب</button>
            </form>

          </div>
        }


        <div className='lg:w-1/2 w-full lg:ps-20 pe-0 mt-3 lg:mt-0 text-center'>
          <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg mb-4 font-semibold'> انشاء حساب جديد</h2>
          <p className='leading-10 lg:text-[18px] md:text-[16px] sm:text-[14px] text-[12px]'>يتيح لك التسجيل في هذا الموقع الوصول إلى حالة طلبك وسجله. ما عليك سوى ملء الحقول أدناه، وسننشئ لك حسابًا جديدًا في وقت قصير. لن نطلب منك سوى المعلومات الضرورية لجعل عملية الشراء أسرع وأسهل.</p>
          <button onClick={() => setRegister(!register)} className='bg-[#d6ae70] px-5 py-1 w-full sm:w-1/2  mt-4 hover:bg-[#bf9a62] duration-500'>{register ? "تسجيل الدخول" : "انشاء حساب جديد"}</button>
        </div>
      </div>

    </>
  )
}

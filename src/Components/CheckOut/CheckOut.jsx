import { useFormik } from 'formik'
import React, { useContext, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'
import axios from 'axios'
import { OrderContext } from '../../Context/OrderContext'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify'
import emailjs from '@emailjs/browser';

export default function CheckOut() {
    const [dropDown, setDropDown] = useState(false)
    const [dropVodafone, setDropVodafone] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const location = useLocation()
    const { userDetails } = useContext(AuthContext)
    const { carts } = useContext(CartContext)
    const cart = carts.find((cart) => cart.userId === userDetails.id)
    const { orderContainer } = useContext(OrderContext)
    const orderUser = orderContainer.find((order) => order.userId === userDetails.id)



    const initialValues = {
        order_id: "",
        userDetails: {
            firstName: "",
            lastName: "",
            phone: "",
            email: ""
        },
        shipping_address: {
            address: "",
            city: "",
            postalCode: "",
            notes: ""
        },
        order_date: "",
        items: [
            {
                id: "",
                itemName: "",
                category: "",
                price: null,
                image: "",
                count: null
            }
        ],
        payment: {
            payment_method: "",
            amount_paid: null,
            payment_date: ""
        },
        order_status: "pending"
    }

    const validationSchema = Yup.object().shape({
        userDetails: Yup.object().shape({
            firstName: Yup.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف").max(15).required("اسم المستخدم مطلوب"),
            lastName: Yup.string().min(3, "اسم المستخدم يجب ان يكون اكثر من 3 حروف").max(15).required("اسم المستخدم مطلوب"),
            phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "رقم الهاتف يجب ان يكون اكثر من 10 رقم").required("رقم الهاتف مطلوب"),
            email: Yup.string().email('الايميل يجب ان يكون صحيح').matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'الايميل يجب ان يكون صحيح').required('الايميل مطلوب')
        }),
        shipping_address: Yup.object().shape({
            address: Yup.string().required("العنوان مطلوب"),
            city: Yup.string().required("المدينة / المحافظة مطلوبة"),
        })
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleOrder
    })

    function setSomeData() {
        const newUuid = uuidv4();
        const date = new Date()
        formik.setFieldValue('order_id', newUuid);
        formik.setFieldValue('order_date', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        formik.setFieldValue('payment.payment_date', `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`);
        formik.setFieldValue('items', cart.list)
        formik.setFieldValue('payment.amount_paid', Math.floor(cart?.list.reduce((total, product) => total + product.price * product.count, 0) * 0.85) + 40)

    }
    function handleOrder(values) {

        orderUser.orders.push(values)
        axios.put(`http://localhost:3000/ordersUsers/${orderUser.id}`, orderUser)
            .then(response => {
                cart?.list.splice(0, cart?.list.length)
                axios.put(`http://localhost:3000/cart/${cart.id}`, cart)
                    .then(response => {
                        emailjs
                            .send('service_fly4zm9', 'template_11s5r0i', {
                                from_name: `${formik.values.userDetails.firstName} ${formik.values.userDetails.lastName}`,
                                from_email: formik.values.userDetails.email,
                            }, {
                                publicKey: 'IPUENCr3JNbGTeCHL',
                            })
                            .then(
                                () => {
                                    console.log('SUCCESS!');
                                    window.location.replace('/')
                                    formik.resetForm()
                                    toast.success("تم الطلب بنجاح وسيتم التواصل معك في اقرب وقت")

                                },
                                (error) => {
                                    console.log('FAILED...', error);
                                },
                            );
                    })

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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">الدفع</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            {cart?.list?.length > 0 ?

                <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
                    <div className='flex justify-center  text-white gap-5 lg:flex-row flex-col'>
                        <div className='lg:w-1/2 w-full'>
                            <form>
                                <div className='flex justify-center items-center gap-3'>
                                    <div className='w-1/2'>
                                        <label htmlFor="firstName">الاسم الاول:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userDetails.firstName} name='userDetails.firstName' type="text" id='firstName' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                        {formik.touched.userDetails?.firstName && formik.errors.userDetails?.firstName &&
                                            <span className="text-red-500">{formik.errors.userDetails.firstName}</span>
                                        }
                                    </div>
                                    <div className='w-1/2'>
                                        <label htmlFor="lastName">الاسم الاخير:</label>
                                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userDetails.lastName} name='userDetails.lastName' type="text" id='lastName' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                        {formik.touched.userDetails?.lastName && formik.errors.userDetails?.lastName &&
                                            <span className="text-red-500">{formik.errors.userDetails.lastName}</span>
                                        }
                                    </div>
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="city">المدينة / المحافظة:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shipping_address.city} name='shipping_address.city' type="text" id='city' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                    {formik.touched.shipping_address?.city && formik.errors.shipping_address?.city &&
                                        <span className="text-red-500">{formik.errorsshipping_address?.city}</span>
                                    }
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="address">العنوان بالتفصيل:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shipping_address.address} name='shipping_address.address' type="text" id='address' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                    {formik.touched.shipping_address?.address && formik.errors.shipping_address?.address &&
                                        <span className="text-red-500">{formik.errorsshipping_address?.address}</span>
                                    }
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="postalCode">الرمز البريدي: <span className='text-red-500'>اختياري*</span></label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shipping_address.postalCode} name='shipping_address.postalCode' type="number" id='postalCode' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="phone">رقم الهاتف:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userDetails.phone} name='userDetails.phone' type="tel" id='phone' className='text-end mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                    {formik.touched.userDetails?.phone && formik.errors.userDetails?.phone &&
                                        <span className="text-red-500">{formik.errors.userDetails?.phone}</span>
                                    }
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="email">البريد الالكتروني:</label>
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.userDetails.email} name='userDetails.email' type="email" id='email' className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]' />
                                    {formik.touched.userDetails?.email && formik.errors.userDetails?.email &&
                                        <span className="text-red-500">{formik.errors.userDetails?.email}</span>
                                    }
                                </div>
                                <div className='my-3'>
                                    <label htmlFor="notes">ملاحظات:</label>
                                    <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.shipping_address.notes} name="shipping_address.notes" id="notes" className='mt-1 border border-gray-300 bg-transparent px-5 py-1 w-full focus:outline-none focus:border-[rgb(251,176,59)]'></textarea>
                                </div>

                            </form>
                        </div>
                        <div className='lg:w-1/2 w-full h-fit p-5 bg-[#161616] shadow-[2px_2px_10px_0_rgba(251,176,59,1),-2px_-2px_10px_0_rgba(251,176,59,1)]'>
                            <h2 className='text-center lg:text-3xl md:text-2xl sm:text-xl text-lg'>طلبك</h2>
                            <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                                <h2>عدد المنتجات</h2>
                                <h2>{cart?.list.length}</h2>
                            </div>
                            <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                                <h2>المجموع</h2>
                                <h2>{cart?.list.reduce((total, product) => total + product.price * product.count, 0)} EGP</h2>
                            </div>
                            <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                                <h2>خصم 15%</h2>
                                <h2>{Math.floor(cart?.list.reduce((total, product) => total + product.price * product.count, 0) * 0.85)} EGP</h2>
                            </div>
                            <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                                <h2>مصاريف الشحن</h2>
                                <h2>40 EGP</h2>
                            </div>
                            <div className='flex justify-between my-3 py-2 border-b border-gray-400'>
                                <h2>المجموع الكلي</h2>
                                <h2>{Math.floor(cart?.list.reduce((total, product) => total + product.price * product.count, 0) * 0.85) + 40} EGP</h2>
                            </div>

                            <div className=' mt-5 mb-2  '>
                                <div className='flex gap-3 items-center mb-3'>
                                    <input onClick={() => { setDropDown(true); setDropVodafone(false) }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={'عند الاستلام'} type="radio" id='cash' name='payment.payment_method' className='w-4 h-4' />
                                    <h2 className='text-[14px] sm:text-[16px] '>الدفع عند الاستلام</h2>
                                    {!dropVodafone && !dropDown && <span className="text-red-500 text-[14px] sm:text-[16px] ">هذا الحقل مطلوب</span>}

                                </div>
                                <div className={dropDown ? `shadow-[2px_2px_10px_0_gray,-2px_-2px_10px_0_gray] p-5  "h-full"  duration-500` : "h-0 overflow-hidden"}>
                                    <h2 className='text-[14px] sm:text-[16px] '>الدفع نقدا عند الاستلام</h2>

                                </div>
                            </div>
                            <div className='py-2 '>
                                <div className='flex gap-3 items-center mb-2'>
                                    <input onClick={() => { setDropVodafone(true); setDropDown(false); }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={'فودافون كاش'} type="radio" id='cash' name='payment.payment_method' className='w-4 h-4' />
                                    <h2 className='text-[14px] sm:text-[16px] '>فودافون كاش</h2>
                                    {!dropVodafone && !dropDown && <span className="text-red-500 text-[14px] sm:text-[16px] ">هذا الحقل مطلوب</span>}

                                </div>
                                <div className={dropVodafone ? `shadow-[2px_2px_10px_0_gray,-2px_-2px_10px_0_gray] p-5  "h-full"  duration-500` : "h-0 overflow-hidden"}>
                                    <h2 className='text-[14px] sm:text-[16px] '>قم باجراء تحويل جزئي او كلي من قمية الاوردر على حساب فودافون كاش الشركه علي رقم 01066398472 وارسال صوره التحويل عن طريق الواتساب على رقم خدمه العملاء 01066398472 حتي يتم تأكيد شحن طلبكم</h2>

                                </div>
                            </div>
                            <div className='my-3 py-3 border-b border-t border-gray-400'>
                                <h2 className='text-[14px] sm:text-[16px] '> سيتم استخدام بياناتك لدعم تجربتك في جميع أنحاء هذا الموقع ، وإدارة الوصول إلى حسابك ، ولأغراض أخرى موصوفة في <Link to='/termsAndConditions' className='font-bold'>سياسة الخصوصية</Link> .</h2>
                            </div>
                            <div className='flex items-center gap-3 my-3 py-2 '>
                                <input type="checkbox" id='terms' name='terms' className='w-4 h-4' onClick={() => setIsChecked(!isChecked)} />
                                <h2 className='text-[14px] sm:text-[16px] '>لقد قرأتُ <Link to='/termsAndConditions' className='font-bold'>الشروط والأحكام</Link> وأوافق عليها لهذا الموقع</h2>
                                {!isChecked && <span className="text-red-500 text-[14px] sm:text-[16px] ">هذا الحقل مطلوب</span>}

                            </div>
                            <button disabled={!isChecked || (!dropDown && !dropVodafone)} type='submit' onClick={() => { formik.handleSubmit(); setSomeData() }} className='border border-[rgba(251,176,59,1)]  w-full py-2 hover:bg-[rgba(251,176,59,1)] duration-300 '>تأكيد الطلب</button>
                        </div>
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
                </div>


            }

        </>
    )
}

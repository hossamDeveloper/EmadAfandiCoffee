import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function ExchangeAndReturnPolicy() {
    const location = useLocation()
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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">سياسة التبديل والاسترجاع</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
                <div className='my-7'>
                    <h2 className=' md:text-2xl sm:text-xl text-lg font-bold text-white'>عملية الإرجاع
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>إذا رغبت بإرجاع طلبك مقابل استرداد المبلغ المدفوع أو استبداله بمنتجات معينة فإنه لديك 3 ايام من تاريخ الشراء بشرط ان يكون المنتج في حالتة  الاصلية ولم يتم استخدامه
                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>  تتطلب عملية الإرجاع هذه الشروط:
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>إرجاع المنتج إلينا أو إستبداله بنفس الحالة التي تم توصيله بها و بغلافها الأصلي وداخل البوكس الخاص بالتوصيل.
                    </p>
                    <p className='mt-4 text-gray-500 tracking-wider'>يتوجب عليك التعامل بحرص مع أي منتجات ترغب بإرجاعها وبالإضافة الى عدم استخدامها يجب الحفاظ عليها في صورتها الأصلية.
                    </p>
                    <p className='mt-4 text-gray-500 tracking-wider'>نحن لا نتحمل مسؤولية أي خسائر أو أضرار تقع للمنتجات أثناء تواجدها بحوزتك او بحوزت شركة الشحن ويمكننا في هذه الحالة رفض طلبك للإرجاع أو الإستبدال.
                    </p>
                    <p className='mt-4 text-gray-500 tracking-wider'>في حال توريد منتجات خاطئة غير مطابقة لطلبك أو متضررة أو غير صحيحة، سنقوم بعرض منتج بديل عليك أو استبدالها علي الفور أو سنقوم برد كامل المبلغ إليك بالطريقة الممكنة والمناسبة لنا بما في ذلك رسوم التوصيل المدفوعة كخدمة لعملية الشحن (إن وجدت) وفي جميع الحالات عليك إرجاع المنتجات الخاطئة أو المتضررة أو غير الصحيحة إلينا بالسرعة الممكنة في نفس صورتها الأصلية.
                    </p>
                    <p className='mt-4 text-gray-500 tracking-wider'>مصاريف الاسترجاع والاستبدال 50  جنيه

                    </p>
                </div>

                <div className='my-7'>
                    <h2 className='text-2xl font-bold text-white'>عملية الاستبدال
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>إذا رغبت في إستبدال أي من المنتجات يمكنك التواصل معنا عن طريق الواتس اب على الرقم  01066398472
                    </p>
                    <p className='mt-4 text-gray-500 tracking-wider'> يجب مراعاة إمكانية توفر المنتج وتتم عملية الاستبدال حسب سياسات الشركة المتبعة
                    </p>
                </div>

                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>رد الأموال
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'> مع مراعاة الاستثناءات الواردة أعلاه، عندما تقوم بإرجاع طلبك أو عندما ترغب في استبداله بمنتجات معينة اخرى، سوف نقوم بتنفيذ عملية إرجاع المال عند استلام المنتجات المرتجعة / المستبدلة، باستثناء أي رسوم توصيل تم دفعها.
                    </p>
                </div>

                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>الإلغاء
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>إذا رغبت في إلغاء طلبك، يمكنك القيام بذلك بالاتصال علي الرقم 01066398472 خلال ساعات العمل من الساعة 9 صباحا وحتي الساعة 4 مساءا .

                    </p>
                </div>
            </div>
        </>
    )
}

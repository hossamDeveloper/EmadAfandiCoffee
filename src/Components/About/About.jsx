import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function About() {
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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">عن الشركة</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>
                <h2 className='lg:text-3xl md:text-2xl sm:text-xl text-lg text-white text-center my-10'>حول العطيان و العلامة التجارية (عماد أفندي)</h2>
                <p className='text-gray-500 tracking-wider my-5'>نحن شركة قهوة مصرية رائدة تأسست في جمهورية مصر العربية عام 1995. تتكون مجموعة العطيان و (عماد أفندي) من مجموعة من العلامات التجارية المتكاملة. نقدم منتجات القهوة عالية الجودة ذات الثقة للعملاء والمستهلكين في جميع أنحاء مصر والشرق الأوسط .</p>
                <p className='text-gray-500 tracking-wider my-5'>تقع أصول الشركة في جمهورية مصر العربية  ، ويعمل بها أكثر من 300 موظف في تصنيع وتوزيع وتسويق مختلف منتجات القهوة عالية الجودة.
                    نقوم بذلك هنا في مصر للعملاء من مختلف التوجهات ، ومن جميع الجنسيات.
                    هذا الالتزام الجاد هو الدافع وراء ما نقوم به في كل مرحلة من مراحل التصنيع بداية من الحقل حتي الوصول إلى المستهلك .</p>
                <p className='text-gray-500 tracking-wider my-5'>مصممون على تلبية أعلى معايير جودة انتاج القهوة بطريقة مستدامة وعالمية .
                    نحن نقدر كل شخص نخدمه ، وكل من يعمل معنا، نفعل هذا بكل إخلاص لأننا نريد أن يعيش كل شخص الحياة على أكمل وجه.

                </p>
            </div>

        </>
    )
}

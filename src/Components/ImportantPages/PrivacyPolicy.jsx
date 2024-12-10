import React, { useMemo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function PrivacyPolicy() {
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
                <h2 className="text-center lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-semibold">سياسة الخصوصية</h2>
                <h2 className='text-center mt-4 lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px]'><NavLink to="/">الرئيسية </NavLink>{location.pathname}</h2>
            </div>
            <div className='px-5 xl:px-32 lg:px-20 md:px-16 sm:px-10 xl:my-8 lg:my-6   my-4'>

                <p className='my-7 text-gray-500 tracking-wider'>تصف سياسة الخصوصية هذه (“السياسة”) كيف يقوم عماد افندي (“عماد افندي” أو “نحن” أو “لدينا”) بجمع وحماية واستخدام معلومات التعريف الشخصية (“المعلومات الشخصية”) أنت (“المستخدم” ، “أنت” أو “الخاص بك”) على موقع emadafandi.com وأي من منتجاته أو خدماته (يُشار إليها إجمالاً بـ “الموقع” أو “الخدمات”). كما يصف الخيارات المتاحة لك فيما يتعلق باستخدامنا لمعلوماتك الشخصية وكيف يمكنك الوصول إلى هذه المعلومات وتحديثها. لا تنطبق هذه السياسة على ممارسات الشركات التي لا نملكها أو نتحكم فيها ، أو على الأفراد الذين لا نوظفهم أو نديرهم.
                </p>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>الجمع التلقائي للمعلومات
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>عندما تزور موقع الويب ، تقوم خوادمنا تلقائيًا بتسجيل المعلومات التي يرسلها متصفحك. قد تتضمن هذه البيانات معلومات مثل عنوان IP الخاص بجهازك ، ونوع المتصفح وإصداره ، ونوع نظام التشغيل وإصداره ، وتفضيلات اللغة أو صفحة الويب التي كنت تزورها قبل وصولك إلى موقعنا الإلكتروني ، وصفحات موقعنا الإلكتروني التي تزورها ، والوقت الذي تقضيه في تلك الصفحات والمعلومات التي تبحث عنها على موقعنا الإلكتروني وأوقات الوصول والتواريخ وإحصائيات أخرى.
                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>جمع المعلومات الشخصية
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>يمكنك زيارة موقع الويب دون إخبارنا عن هويتك أو الكشف عن أي معلومات يمكن من خلالها التعرف عليك كفرد محدد يمكن التعرف عليه. ومع ذلك ، إذا كنت ترغب في استخدام بعض ميزات موقع الويب ، فسيُطلب منك تقديم معلومات شخصية معينة (على سبيل المثال ، اسمك وعنوان بريدك الإلكتروني). نتلقى ونخزن أي معلومات تزودنا بها عن قصد عند إنشاء حساب أو إجراء عملية شراء أو ملء أي نماذج عبر الإنترنت على الموقع. عند الاقتضاء ، قد تتضمن هذه المعلومات عنوان بريدك الإلكتروني أو اسمك أو رقم هاتفك أو عنوانك أو معلومات شخصية أخرى. يمكنك اختيار عدم تزويدنا بمعلوماتك الشخصية ، ولكن بعد ذلك قد لا تتمكن من الاستفادة من بعض ميزات موقع الويب. نرحب بالمستخدمين الذين لا يعرفون ما هي المعلومات الإلزامية للاتصال بنا.
                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>إدارة المعلومات الشخصية
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>يمكنك الوصول إلى معلومات شخصية معينة عنك والإضافة إليها وتحديثها وحذفها. قد تتغير المعلومات التي يمكنك عرضها وتحديثها وحذفها مع تغير موقع الويب أو الخدمات. ومع ذلك ، عندما تقوم بتحديث المعلومات ، فقد نحتفظ بنسخة من المعلومات غير المنقحة في سجلاتنا. قد تبقى بعض المعلومات في سجلاتنا الخاصة بعد حذفك لهذه المعلومات من حسابك. سنحتفظ بمعلوماتك الشخصية ونستخدمها للفترة اللازمة للامتثال لالتزاماتنا القانونية ، وحل النزاعات ، وإنفاذ اتفاقياتنا ما لم يتطلب القانون فترة احتفاظ أطول أو يسمح بها. قد نستخدم أي بيانات مجمعة مشتقة من معلوماتك الشخصية أو دمجها بعد تحديثها أو حذفها ، ولكن ليس بطريقة تحدد هويتك الشخصية. بمجرد انتهاء فترة الاحتفاظ ، سيتم حذف المعلومات الشخصية. لذلك ، لا يمكن إنفاذ الحق في الوصول والحق في المسح والحق في التصحيح والحق في إمكانية نقل البيانات بعد انتهاء فترة الاحتفاظ.
                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>استخدام ومعالجة المعلومات التي تم جمعها
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>يمكن استخدام أي من المعلومات التي نجمعها منك لإضفاء الطابع الشخصي على تجربتك ؛ تحسين موقعنا ؛ تحسين خدمة العملاء والرد على استفسارات ورسائل البريد الإلكتروني لعملائنا ؛ معالجة المعاملات إرسال رسائل إخبارية إرسال رسائل بريد إلكتروني للإشعارات مثل تذكيرات كلمة المرور والتحديثات وما إلى ذلك ؛ تشغيل وتشغيل موقعنا وخدماتنا. يتم استخدام المعلومات التي يتم جمعها تلقائيًا فقط لتحديد الحالات المحتملة لسوء الاستخدام وإنشاء معلومات إحصائية بشأن استخدام الموقع. لا يتم تجميع هذه المعلومات الإحصائية بطريقة أخرى من شأنها تحديد أي مستخدم معين للنظام. قد نعالج المعلومات الشخصية المتعلقة بك إذا كان أحد الإجراءات التالية ينطبق: (1) لقد أعطيت موافقتك لهدف أو أكثر من الأغراض المحددة. لاحظ أنه بموجب بعض التشريعات ، قد يُسمح لنا بمعالجة المعلومات حتى تعترض على هذه المعالجة (عن طريق إلغاء الاشتراك) ، دون الحاجة إلى الاعتماد على الموافقة أو أي من القواعد القانونية التالية أدناه. ومع ذلك ، لا ينطبق هذا ، عندما تخضع معالجة المعلومات الشخصية لقانون حماية البيانات الأوروبي ؛ (2) تقديم المعلومات ضروري لأداء اتفاقية معك و / أو لأي التزامات تعاقدية سابقة لها ؛ (3) المعالجة ضرورية للامتثال لالتزام قانوني تخضع له ؛ (4) تتعلق المعالجة بمهمة يتم تنفيذها للمصلحة العامة أو في ممارسة السلطة الرسمية المخولة لنا ؛ (5) المعالجة ضرورية لأغراض المصالح المشروعة التي نتابعها أو نتابعها بواسطة طرف ثالث. على أي حال ، يسعدنا توضيح الأساس القانوني المحدد الذي ينطبق على المعالجة ، وعلى وجه الخصوص ما إذا كان توفير المعلومات الشخصية شرطًا قانونيًا أو تعاقديًا ، أو شرطًا ضروريًا لإبرام عقد.

                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>نقل المعلومات وتخزينها

                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>اعتمادًا على موقعك ، قد تتضمن عمليات نقل البيانات نقل وتخزين معلوماتك في بلد آخر غير بلدك. يحق لك التعرف على الأساس القانوني لنقل المعلومات إلى بلد خارج الاتحاد الأوروبي أو إلى أي منظمة دولية يحكمها القانون الدولي العام أو أنشأتها دولتان أو أكثر ، مثل الأمم المتحدة ، وحول الإجراءات الأمنية التي اتخذتها لنا لحماية معلوماتك. في حالة حدوث أي نقل من هذا القبيل ، يمكنك معرفة المزيد عن طريق التحقق من الأقسام ذات الصلة من هذا المستند أو الاستفسار معنا باستخدام المعلومات الواردة في قسم الاتصال.
                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>حقوق المستخدمين

                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>يمكنك ممارسة بعض الحقوق فيما يتعلق بمعلوماتك التي نقوم بمعالجتها. على وجه الخصوص ، لديك الحق في القيام بما يلي: (1) لديك الحق في سحب الموافقة حيث سبق لك أن أعطيت موافقتك على معالجة معلوماتك ؛ (2) لديك الحق في الاعتراض على معالجة معلوماتك إذا تمت المعالجة على أساس قانوني بخلاف الموافقة ؛ (3) لديك الحق في معرفة ما إذا كانت المعلومات قيد المعالجة بواسطتنا ، والحصول على إفصاح بشأن جوانب معينة من المعالجة والحصول على نسخة من المعلومات التي تخضع للمعالجة ؛ (4) لديك الحق في التحقق من دقة المعلومات الخاصة بك وطلب تحديثها أو تصحيحها ؛ (5) لديك الحق ، في ظل ظروف معينة ، في تقييد معالجة معلوماتك ، وفي هذه الحالة ، لن نقوم بمعالجة معلوماتك لأي غرض بخلاف تخزينها ؛ (6) يحق لك ، في ظل ظروف معينة ، الحصول على محو معلوماتك الشخصية منا ؛ (7) لديك الحق في تلقي معلوماتك بتنسيق منظم وشائع الاستخدام وقابل للقراءة آليًا ، وإذا كان ذلك ممكنًا من الناحية الفنية ، فيتم نقلها إلى وحدة تحكم أخرى دون أي عائق. يسري هذا الحكم شريطة أن تتم معالجة معلوماتك بوسائل آلية وأن المعالجة تستند إلى موافقتك ، على عقد تكون جزءًا منه أو على التزامات تعاقدية مسبقة منه.

                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>الحق في الاعتراض على المعالجة

                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>عندما تتم معالجة المعلومات الشخصية للمصلحة العامة ، أو في ممارسة سلطة رسمية مخولة لنا أو لأغراض المصالح المشروعة التي نتبعها ، يمكنك الاعتراض على هذه المعالجة من خلال توفير أساس متعلق بموقفك الخاص لتبرير اعتراض. يجب أن تعلم أنه في حالة معالجة معلوماتك الشخصية لأغراض التسويق المباشر ، يمكنك الاعتراض على هذه المعالجة في أي وقت دون تقديم أي مبرر. لمعرفة ما إذا كنا نعالج المعلومات الشخصية لأغراض التسويق المباشر ، يمكنك الرجوع إلى الأقسام ذات الصلة من هذا المستند.

                    </p>
                </div>
                <div className='my-7'>
                    <h2 className='md:text-2xl sm:text-xl text-lg font-bold text-white'>كيف تمارس هذه الحقوق
                    </h2>
                    <p className='mt-4 text-gray-500 tracking-wider'>يمكن توجيه أي طلبات لممارسة حقوق المستخدم إلى المالك من خلال تفاصيل الاتصال الواردة في هذا المستند. يمكن ممارسة هذه الطلبات مجانًا وسيتم معالجتها من قبل المالك في أقرب وقت ممكن.

                    </p>
                </div>
                

            </div>
        </>
    )
}
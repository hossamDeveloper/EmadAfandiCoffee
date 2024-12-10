// api/json-server.js
import { create, router as _router, defaults } from 'json-server';
const server = create();
const router = _router('Data/db.json');  // تحديد ملف البيانات
const middlewares = defaults();

// تحديد كيفية معالجة الطلبات (middlewares)
server.use(middlewares);
server.use(router);

// تصدير الدالة ليتم استخدامها بواسطة Vercel
export default (req, res) => {
  return new Promise((resolve, reject) => {
    server(req, res, (result) => {
      resolve(result); // إعادة النتيجة إلى Vercel
    });
  });
};

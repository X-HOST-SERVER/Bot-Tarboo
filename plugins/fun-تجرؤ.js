import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';

let yoMamaJokeHandler = async (m, { conn, text }) => {
  try {
    console.log('جاري جلب نكتة Yo Mama من API...');
    let res = await fetch(`https://shizoapi.onrender.com/api/texts/dare?apikey=shizo`);

    if (!res.ok) {
      throw new Error(`فشل طلب API مع الحالة ${res.status}`);
    }

    console.log('تم جلب النكتة بنجاح. جاري تحليل الاستجابة...');
    let json = await res.json();

    console.log('النكتة المستلمة:', json);

    let yoMamaJoke = `${json.result}`;
    
    console.log('النكتة المستلمة:', yoMamaJoke);

    console.log('جاري ترجمة النكتة إلى العربية...');
    let translation = await translate(yoMamaJoke, { to: 'ar' });

    let translatedYoMamaJoke = translation.text;

    console.log('تمت ترجمة النكتة بنجاح:', translatedYoMamaJoke);

    m.reply(translatedYoMamaJoke); // إرسال النكتة المترجمة للمستخدم
  } catch (error) {
    console.error('حدث خطأ:', error);
    m.reply('حدث خطأ أثناء جلب النكتة أو ترجمتها. حاول مرة أخرى لاحقاً.'); // إرسال رسالة خطأ للمستخدم
  }
};

yoMamaJokeHandler.help = ['yomamajoke'];
yoMamaJokeHandler.tags = ['fun'];
yoMamaJokeHandler.command = /^(تجرؤ)$/i;

export default yoMamaJokeHandler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
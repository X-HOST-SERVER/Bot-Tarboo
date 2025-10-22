import fetch from "node-fetch";
import { JSDOM } from "jsdom";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    if (!text) throw "أكتب اسم الصورة التي تبحث عنها"; // التأكد من وجود النص (اسم الصورة)
    
    try {
        const wait = "جاري البحث عن الصورة..."; // رسالة الانتظار
        await m.reply(wait); // إرسال رسالة الانتظار للمستخدم

        // استدعاء الدالة للبحث عن الصور
        let res = await FreePik(text);

        // اختيار صورة عشوائية من النتائج
        let rdm = res[Math.floor(Math.random() * res.length)];

        // إرسال الصورة للمستخدم
        await conn.sendMessage(m.chat, {
            image: { url: rdm },
            caption: "[ أليست هذه هي الصورة التي طلبتها ]"
        }, { quoted: m });

    } catch (e) {
        // التعامل مع الأخطاء وإظهار رسالة مناسبة
        throw "حدث خطأ أثناء البحث عن الصورة. حاول مرة أخرى.";
    }
};

handler.help = ["✓ ◡̈⃝ ✓│فريبيك🧸💜"];
handler.tags = ["search"];
handler.command = /فريبيك$/i;

export default handler;

/* الدالة للبحث عن الصور من FreePik */
async function FreePik(query) {
    // إرسال طلب إلى FreePik باستخدام fetch
    let res = await fetch('https://www.freepik.com/search?format=search&query=' + query + '&type=psd');
    let html = await res.text(); // تحويل النص المسترجع إلى HTML

    // استخدام JSDOM لتحليل الـ HTML
    let dom = new JSDOM(html);
    var collection = dom.window.document.getElementsByTagName('img'); // الحصول على جميع عناصر الـ img

    let img = [];
    // تصفية الصور التي تبدأ بالرابط المناسب
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].getAttribute('src').startsWith('https://img.freepik.com')) {
            img.push(collection[i].getAttribute('src'));
        }
    }

    // إزالة الصور الفارغة أو الغير صحيحة
    let newArr = img.filter(el => el != null);
    return newArr; // إرجاع قائمة الصور
}
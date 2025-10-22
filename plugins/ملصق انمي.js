import { sticker } from '../lib/sticker.js';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    // التأكد من أن قائمة الإشارة موجودة
    if (!m.mentionedJid) m.mentionedJid = [];

    // إضافة المستخدم المقتبس إلى قائمة الإشارة إن وجد
    if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender);

    // إذا لم يتم الإشارة إلى أحد، يتم إضافة المرسل
    if (!m.mentionedJid.length) m.mentionedJid.push(m.sender);

    // جلب رابط الصورة من API
    let res = await fetch('https://api.waifu.pics/sfw/pat');
    if (!res.ok) throw new Error('خطأ في الاتصال بـ API');

    let json = await res.json();
    let { url } = json;

    // إنشاء الملصق
    let stiker = await sticker(
      false,
      url,
      global.packname || '𝐵𝑌:𝑻𝑼𝑹𝑩𝑶﹝⚡️﹞𝑩𝑶𝑻',
      global.author || ''
    );

    if (!stiker) throw new Error('فشل في إنشاء الملصق');

    // إرسال الملصق
    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, { asSticker: true });
  } catch (e) {
    console.error(e);
    m.reply('*[❗] حدث خطأ أثناء إنشاء الملصق. حاول مرة أخرى.*');
  }
};

handler.command = /^(ملصق-انمي)$/i;
export default handler;
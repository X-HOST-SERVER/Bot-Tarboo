import MessageType from '@whiskeysockets/baileys';
import { xpRange } from '../lib/levelling.js';

const handler = async (m, { conn, text, participants }) => {
  // الحصول على رقم المستخدم بناءً على المنشن أو الرد أو النص المدخل
  let userId;

  if (m.quoted) { // إذا كان الأمر رد على رسالة
    userId = m.quoted.sender;
  } else if (m.mentionedJid && m.mentionedJid[0]) { // إذا كان هناك منشن لرقم
    userId = m.mentionedJid[0];
  } else if (text) { // إذا كان الرقم مكتوب في النص
    const args = text.split(' ');
    if (args.length < 2) throw '*رجاءً ادخل رقم المستخدم والمستوى الجديد*';
    userId = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
    text = args.slice(1).join(' '); // تحديث النص لإزالة الرقم
  } else {
    throw '*رجاءً ادخل رقم المستخدم والمستوى الجديد أو الرد على رسالة*';
  }

  const newLevel = text.trim();

  if (isNaN(newLevel)) throw '*[❗معلومة❗] الرمز غير مقبول، فقط الأرقام مسموحة!*';

  const newLevelInt = parseInt(newLevel);
  if (newLevelInt < 0) throw '*[❗معلومة❗] القيمة لا يمكن أن تكون سالبة!*';

  const users = global.db.data.users;

  // تعيين المستوى الجديد للمستخدم
  if (!users[userId]) users[userId] = {}; // إذا لم يكن المستخدم موجوداً، يتم إنشاء سجل له
  users[userId].level = newLevelInt;
  const { min, max } = xpRange(newLevelInt, global.multiplier);
  users[userId].exp = min;

  let name = await conn.getName(userId);
  let response = `
≡ *تعديل مستوى المستخدم*
┌──────────────
▢ *المستخدم:* ${name}
▢ *المستوى الجديد:* ${newLevelInt}
└──────────────`;

  m.reply(response);
};

handler.command = ['تغير-لفل', 'changelevel'];
handler.rowner = true;

export default handler;
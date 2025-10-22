const handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  const datas = global;
  const idioma = datas.db.data.users[m.sender].language;

  const optionsFull = `الخيار:* ✨ | الترحيب
*الامر:* ${usedPrefix + command} الترحيب
*الوصف:* فتح او قفل الترحيب في الجروب.

--------------------------------

*الخيار:* 🌎 | مود العام
*الامر:* ${usedPrefix + command} عام
*الوصف:* يصبح البوت علنا او خاصا.
*الحاله:* لا يمكن استخدام هذا الامر الا بواسطه المطور.

--------------------------------

*الخيار:* 🔗 | مضاد اللينكات
*الامر:* ${usedPrefix + command} مضاداللينكات
*الحاله:* تشغيل او ايقاف مضاد لينكات الواتس.
*الحاله:* يجب ان يكون مفعلا.

--------------------------------

*الخيار:* 🔗 | مضاد اللنكات 2
*الامر:* ${usedPrefix + command} مضاداللينكات2
*الوصف:* تشغيل وا اقاف مضاد اي لنكات.
*الحاله:* يجب ان يكون مفعلا.

--------------------------------

*الخيار:* 🔎 | كشف
*الامر:* ${usedPrefix + command} كشف
*:* تنشيط او الغاء التعديل علي الوصف.

--------------------------------

*الخيار:* 🔎 | كشف 2
*الامر:* ${usedPrefix + command} كشف2
*الوصف:* يكشف التعديلات في المجموعه و يحافظ علي اداره افضل.

--------------------------------

*الخيار:* ❗ | يقيد
*الامر:* ${usedPrefix + command} تقيد
*وصف:* فتح او قفل قيود البوت مثلا  يطرد و يضيفه.
*حاله:* المطور بس الي يستعمل الامر ده.

--------------------------------

*الخيار:* ☑️ | القرائه التلقائي
*الامر:* ${usedPrefix + command} الصحين
*الوصف:* فتح او قفل القرائه التلقائي.
*الحاله:* المطور بس الي بيتسعمل الامر ده.

--------------------------------

*الخيار:* 🔊 |  اصوات
*الامر:* ${usedPrefix + command} اصوات
*الوصف:* فتح او قفل الريكات في الجروب.

--------------------------------

*الخيار:* 👾 | ستيكر تلقائي
*الامر:* ${usedPrefix + command} ستيكرتلقائي 
*الوصف:*تصبح جميع الصور أو مقاطع الفيديو المرسلة في المجموعة ملصقات. 

--------------------------------

*الخيار:* 💬 | خاص فقط
*الامر:* ${usedPrefix + command} برايفت
*الوصف:* سوف يستجيب البوت في الخاص بس.
*الحاله:* المطور بس الي يقدر يستعمل الامر ده.

--------------------------------

*الخيار:* 🏢 | جروبات فقط
*الامر:* ${usedPrefix + command} جروبات
*الوصف:* البوت هيشتغل في الجروبات بس. 
*الحاله:* المكور بس الي يستخدم الامر ده.

--------------------------------

*الخيار:* ❌ | مضاد الاخفاء
*الامر:* ${usedPrefix + command} مضادالاخفاء
*الوصف:* الصوره او الفيديو الذي يبعت ليرا مره واحده يبعت من البوت مره اخري بشكل طبيعي. 

--------------------------------

*الخيار:* 📵 | ممنوع الاتصال
*الامر:* ${usedPrefix + command} مضادالاتصال
*الوصف:* يبلك اي حد يرن علي رقم البوت. 
*الحاله:* المطور بس الي يستخدم الامر ده.

--------------------------------

*الخاله:* 💬 | مضاد الخاص
*الامر:* ${usedPrefix + command} مضادالخاص
*الوصف:* يبلك اي حد يكلم البوت خاص. 
*الحاله:* المطور بس الي يستخدم الامرد ده.

--------------------------------

*الخيار:* 🤬 | مضاد الشتائم
*الامر:* ${usedPrefix + command} مضادالشتائم
*الوصف:* يقوم بتحذير اي شخص سب او شتم او كتب شئ عيب واذا تجاوذ التحذيرات يقوم بطرده.
*الحاله:* يجب ان يكون التقيد مفعلا.

--------------------------------

*الخيار:* 🤖 | البوت الفرعي
*الامر:* ${usedPrefix + command} البوت-الفرعي
*الحاله:* تفعيل و اقاف امر (${usedPrefix}serbot / ${usedPrefix}jadibot). 
*الحاله:* المطور بس الي يقدر يستعمل الامر ده.

--------------------------------

*الخيار:* 👑 | الادمن
*الامر:* ${usedPrefix + command} الادمن-فقط
*الوصف:* سوف يجيب البوت علي الادمن فقط.

--------------------------------

*الخيار:* 😃 | سمسمي
*الامر:* ${usedPrefix + command} سمسمي
*الوصف:* هيبدا البوت يرد باستخدام الذكاء الصتناعي سمسمي.

--------------------------------

*الخيار:* ⏳ | مضاد الاسبام
*الامر:* ${usedPrefix + command} مضادالاسبام
*الوصف:* يكتشف البوت بعد ارسال 5 رسائل و يحظر المستخدم.
*الخاله:* المطور بس الي يستخدم الامر ده.

--------------------------------

*الخيار:* 🛡️ | مضاد الحذف
*الامر:* ${usedPrefix + command} مضادالحذف
*الوصف:* يكتشف البوت الرساله المحذوفه و يقوم بتحويلها للمستخدم.

--------------------------------

*الخيار:* 🔊 | صوت_بوت
*الامر:* ${usedPrefix + command} اصوات_البوت
*الوصف:* يتم الغاء جميعرالصوات الخاصه بالبوت .
*الحاله:* المطور بس الي يستخدم الامر ده..
`.trim();

  const isEnable = /فعل/i.test(command);
  const isDisable = /عطل/i.test(command);
  if (!isEnable && !isDisable) return await conn.sendMessage(m.chat, { text: optionsFull }, { quoted: m });
  const chat = global.db.data.chats[m.chat];
  const user = global.db.data.users[m.sender];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const type = (args[0] || '').toLowerCase();
  let isAll = false;
  const isUser = false;
  switch (type) {
    case 'الترحيب': // welcome
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!(isAdmin || isOwner || isROwner)) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.welcome = isEnable;
      break;
    case 'كشف': // detect
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect = isEnable;
      break;
    case 'كشف2': // detect2
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, conn);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, conn);
        throw false;
      }
      chat.detect2 = isEnable;
      break;
    case 'سمسم': // simsimi
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.simi = isEnable;
      break;
    case 'مانع_إباحية': // antiporno
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiporno = isEnable;
      break;
    case 'حذف': // delete
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.delete = isEnable;
      break;
    case 'مضاد_الحذف': // antidelete
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antidelete = isEnable;
      break;
    case 'عام': // public
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['self'] = !isEnable;
      break;
    case 'مانع الروابط': // antilink
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;
    case 'مانع الروابط2': // antilink2
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiLink2 = isEnable;
      break;
    case 'مضاد العرض': // antiviewonce
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.antiviewonce = isEnable;
      break;
    case 'وضع_غير_لائق': // modohorny
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modohorny = isEnable;
      break;
    case 'وضع_الأدمن': // modoadmin
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;
    case 'الملصقات_التلقائية': // autosticker
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.autosticker = isEnable;
      break;
    case 'الأصوات': // audios
      if (m.isGroup) {
        if (!(isAdmin || isROwner || isOwner)) {
          global.dfail('admin', m, conn);
          throw false;
        }
      }
      chat.audios = isEnable;
      break;
    case 'تقييد': // restrict
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.restrict = isEnable;
      break;
    case 'أصوات_البوت': // audios_bot
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.audios_bot = isEnable;
      break;
    case 'وضع_الذكاء_الصناعي': // modoia
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.modoia = isEnable;
      break;
    case 'الاستماع': // nyimak
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['nyimak'] = isEnable;
      break;
    case 'قراءة_تلقائية': // autoread
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      bot.autoread2 = isEnable;
      break;
    case 'خاص_فقط': // pconly
    case 'خاص': // privateonly
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['pconly'] = isEnable;
      break;
    case 'مجموعات_فقط': // gconly
    case 'مجموعات': // grouponly
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['gconly'] = isEnable;
      break;
    case 'حالة_فقط': // swonly
    case 'حالة': // statusonly
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, conn);
        throw false;
      }
      global.opts['swonly'] = isEnable;
      break;
    case 'مانع_المكالمات': // anticall
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiCall = isEnable;
      break;
    case 'مانع_الخاص': // antiprivado
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antiprivado = isEnable;
      break;
    case 'وضع_العبارات': // modejadibot
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.modejadibot = isEnable;
      break;
    case 'ألعاب': // juegos
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.juegos = isEnable;
      break;
    case 'مانع_الأرقام_المزيفة': // antifake
      isAll = true;
      if (!(isROwner || isOwner)) {
        global.dfail('owner', m, conn);
        throw false;
      }
      bot.antifake = isEnable;
      break;
    default:
      return await conn.sendMessage(m.chat, { text: optionsFull }, { quoted: m });
  }
  conn.sendMessage(m.chat, {
    text: `_*تم تغيير الإعدادات بنجاح*_\n\n*تم ${isEnable ? 'تفعيل' : 'تعطيل'} ${type}* بنجاح.`,
  }, { quoted: m });
};

handler.command = /^(فعل|عطل)$/i;
export default handler;
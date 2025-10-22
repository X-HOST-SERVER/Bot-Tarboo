import fs from 'fs';

const handler = async (m, { text, usedPrefix, command }) => {
  // التحقق من أن المستخدم هو المسموح له فقط
  const allowedUsers = ['201119857886', '201280244814']; // ضع أرقام المطورين هنا بدون "+"
        
        // تطبيع الرقم بإزالة أي رموز غير الأرقام
        const senderNumber = m.sender.replace(/[^0-9]/g, '');

        // التحقق من صلاحية المستخدم
        if (!allowedUsers.includes(senderNumber)) {
            throw '🚫 ليس لديك صلاحية لاستخدام هذا الأمر!';
        }

  if (!text) throw 'امم.. ما الاسم الذي أعطيه للأمر الإضافي؟';
  if (!m.quoted || !m.quoted.text) throw 'الرد على الرسالة!';

  const path = `plugins/${text}.js`;
  await fs.writeFileSync(path, m.quoted.text);
  m.reply(`✅ تم الحفظ باسم: ${path}`);
};

handler.help = ['saveplugin'].map((v) => v + ' <nombre>');
handler.tags = ['owner'];
handler.command = ['ضيف', 'addp', 'addplugin'];
handler.owner = true;

export default handler;


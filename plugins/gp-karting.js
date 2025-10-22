const handler = async (m, {conn, isOwner}) => {
  const adv = Object.entries(global.db.data.users).filter((user) => user[1].warn);
  const imagewarn = './src/warn.gif';

  // تجهيز القائمة مع استخدام `taguser` لذكر المستخدم وتوجيهه إلى صفحة المستخدم عند النقر
  const caption = `*قائمة الانذارات*\n 
*╔═══════════════════·•*
║ *العدد* ${adv.length} *مستخدمين* ${adv ? '\n' + adv.map(([jid, user], i) => `
║
║ ${i + 1}.- @${jid.split`@`[0]} (${user.warn}/3)\n║\n║ - - - - - - - - -`.trim()).join('\n') : ''}
*╚══════════════════·•*`;

  // إعداد المنشنات باستخدام `mentions` وتوجيهها إلى صفحة المستخدم
  const mentions = adv.map(([jid]) => jid);

  // إرسال الرسالة مع رد فعل وذكر المستخدمين
  await conn.sendMessage(m.chat, { react: { text: '🚨', key: m.key } });
  await conn.sendMessage(m.chat, { image: { url: imagewarn }, caption: caption, mentions: mentions }, { quoted: m });
};

handler.command = /^(listwarn|الانذارات|التحذيرات)$/i;
handler.group = true;
handler.admin = true;
export default handler;
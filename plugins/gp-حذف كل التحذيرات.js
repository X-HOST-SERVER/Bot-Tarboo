const handler = async (m, { conn, text, command, usedPrefix }) => {
  const pp = './src/lvlup_template.jpg';
  let who;
  
  if (m.isGroup) {
    who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text;
  } else {
    who = m.chat;
  }

  if (!who) {
    const warntext = `*[❗] اعمل منشن او ريبلاي علي الرساله *\n\n*—◉ مثال:*\n*${usedPrefix + command} @${global.suittag}*`;
    throw m.reply(warntext, m.chat, { mentions: conn.parseMention(warntext) });
  }

  if (m.mentionedJid.includes(conn.user.jid)) return;

  const user = global.db.data.users[who];
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (user.warn == 0) throw '*[❗] المستخدم عنده 0 تحذير*';

  user.warn -= 2;

  await m.reply(
    `${user.warn == 1 ? `*@${who.split`@`[0]}*` : `*♻️ ابسط يا عم سامحناك @${who.split`@`[0]}`}*\n*اصبح عدد التحذيرات ${user.warn}/3*`,
    null,
    { mentions: [who] }
  );

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
  await conn.sendMessage(m.chat, { image: { url: pp }, caption: 'تم إلغاء التحذير' }, { quoted: m });
};

handler.command = /^(الغاء_الانذارات|حذف_الانذارات)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;
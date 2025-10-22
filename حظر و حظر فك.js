const handler = async (m, { text, conn, usedPrefix, command }) => {
  const why = `*[❗] منشن أو قم بالرد على الشخص الذي تريد إعطائه بلوك مثل:*\n*—◉ ${usedPrefix + command} @${m.sender.split('@')[0]}*`;
  
  const who = m.mentionedJid[0] 
    ? m.mentionedJid[0] 
    : m.quoted 
      ? m.quoted.sender 
      : text 
        ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' 
        : false;

  if (!who) return conn.reply(m.chat, why, m, { mentions: [m.sender] });

  const res = [];

  switch (command) {
    case 'بلوك': case 'block':
      if (who) {
        await conn.updateBlockStatus(who, 'block').then(() => {
          res.push(who);
        });
      } else {
        return conn.reply(m.chat, why, m, { mentions: [m.sender] });
      }
      break;

    case 'فكبلوك': case 'unblock':
      if (who) {
        await conn.updateBlockStatus(who, 'unblock').then(() => {
          res.push(who);
        });
      } else {
        return conn.reply(m.chat, why, m, { mentions: [m.sender] });
      }
      break;
  }

  if (res.length) {
    conn.reply(
      m.chat, 
      `*[✅] تم تنفيذ الأمر بنجاح: ${command} للمستخدم/ة ${res.map((v) => '@' + v.split('@')[0]).join(', ')}*`, 
      m, 
      { mentions: res }
    );
  }
};

handler.command = /^(بلوك|فكبلوك)$/i;
handler.rowner = true;
export default handler;
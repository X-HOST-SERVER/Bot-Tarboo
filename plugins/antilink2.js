let linkRegex = /https:/i;

export async function before(m, { isAdmin, isBotAdmin, text }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  let chat = global.db.data.chats[m.chat];
  let sender = m.key.participant;
  let messageId = m.key.id;
  const user = `@${m.sender.split`@`[0]}`;
  let botSettings = global.db.data.settings[this.user.jid] || {};

  const isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLinks2 && isGroupLink && !isAdmin) {
    if (isBotAdmin) {
      const youtubeLink1 = `https://www.youtube.com/`;
      const youtubeLink2 = `https://youtu.be/`;
      if (m.text.includes(thisGroupLink)) return true;
      if (m.text.includes(youtubeLink1)) return true;
      if (m.text.includes(youtubeLink2)) return true;
    }    

    await conn.sendMessage(
      m.chat, 
      {text: `*「 تم اكتشاف رابط غير مسموح به 」*\n\n${user} 🤨 إذا كنت ترى أن هناك خطأ، يرجى توضيحه.`, mentions: [m.sender]}, 
      {quoted: m}
    );

    if (!isBotAdmin) 
      return m.reply('*لا أستطيع حذف الرابط لأنني لست مشرفًا 👾✨️*');  

    if (isBotAdmin) {
      await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: messageId, participant: sender }});
      let kickResult = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
      if (kickResult[0].status === "404") return;   
    } else if (!botSettings.restrict) {
      return m.reply('*مالك البوت لم يقم بتفعيل ميزة التقييد. يرجى التواصل معه لتفعيلها.*');
    }
  }
  return true;
}
const handler = async (m, { conn, usedPrefix, command, args }) => {
  let usageMsg = `*╮┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
*˼📍˹ الاستخدام الصحيح للأمر*\n
*${usedPrefix + command} 1ي* (لـخـروج الـبـوت بـعـد يـوم)\n
*${usedPrefix + command} 2س* (لـخـروج الـبـوت بـعـد سـاعـتـيـن)\n
*${usedPrefix + command} 1د* (لـخـروج الـبـوت بـعـد دقـيـقـة)\n
*╯┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
> © By Mori-Dev`;

  if (!m.isGroup || !m.sender) return m.reply(usageMsg);

  let botDevelopers = ['201119857886@s.whatsapp.net', '201276506015@s.whatsapp.net', '201224563219@s.whatsapp.net'];

  if (!botDevelopers.includes(m.sender)) {
    return m.reply('*❌ هذا الأمر مخصص للمطورين فقط !!*');
  }

  if (!args[0]) return m.reply(usageMsg);

  let timeStr = args[0];
  let unit = timeStr.slice(-1);
  let amount = parseInt(timeStr.slice(0, -1));

  if (isNaN(amount)) return m.reply('*❌ يجب إدخال رقم صحيح لتحديد الوقت !!*');

  let timeMultiplier = { 'ي': 24 * 60 * 60 * 1000, 'س': 60 * 60 * 1000, 'د': 60 * 1000 }[unit];

  if (!timeMultiplier) {
    return m.reply('*❌ يجب استخدام (ي = يوم) أو (س = ساعة) أو (د = دقيقة) !!*');
  }

  let delay = amount * timeMultiplier;
  let unitName = { 'ي': 'يوم', 'س': 'ساعة', 'د': 'دقيقة' }[unit];

  m.reply(`*❐『تـم تـحـديـد الـمـده ✅』*
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
*❐『⏳』سـيـتـم خـروج الـبـوت مـن الـمـجـمـوعـة بـعـد 『 ${amount} 』 ${unitName}*
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
> © By Mori-Dev`);

  setTimeout(async () => {
    try {
      let groupMetadata = await conn.groupMetadata(m.chat);
      let participants = groupMetadata.participants.map(p => p.id);
      
      await conn.sendMessage(m.chat, {
        text: `*❐『📍』*
*╮┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
*┇❐『‼️』لـقـد انـتـهـى الاشـتـراك الـخـاص بـكـم فـي الـبـوت، الـى الـقـاء*
*╯┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
> لـي الـتـجـديـد اسـتـعـمـل أمـر *『 .المطور 』*
> © By Terbo-Dev`,
        mentions: participants
      });

      await conn.groupLeave(m.chat);
    } catch (e) {
      console.error(e);
      m.reply('*❌ حدث خطأ أثناء محاولة الخروج من المجموعة!*');
    }
  }, delay);
};

handler.help = ['exitdelay'];
handler.tags = ['owner'];
handler.command = ['الخروج'];
handler.group = true;
handler.owner = true;

export default handler;
const handler = async (m, {conn, text, usedPrefix, command}) => {
  if (!text) throw ` *❗لم يتم إدخال بادئة جديدة، يرجى إدخال البادئة المرغوبة مثل* ${usedPrefix + command} #`;
  global.prefix = new RegExp('^[' + (text || global.opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']');
  await m.reply(`✅ *تم تعيين البادئة بنجاح إلى* [ ${text} ]`);
};
handler.help = ['setprefix'].map((v) => v + ' [prefix]');
handler.tags = ['owner'];
handler.command = /^(البادئه)$/i;
handler.rowner = true;
export default handler;

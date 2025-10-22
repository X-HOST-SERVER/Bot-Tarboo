const handler = async (m, {command}) => {
  
  switch (command) {
  
  case 'بانشات':
  global.db.data.chats[m.chat].isBanned = true;
  m.reply('*`❲🔒❳` تم كتم المحادثه*\n\n*`⛊ هذه المحادثة ليس لها الأذن لاستعمالي الآن`*');
  break;
  
  case 'بانشاتفك':
  global.db.data.chats[m.chat].isBanned = false;
  m.reply('*`❲🔓❳` تم الغاء كتم المحادثه*\n\n*`⛊ هذه المحادثة لها الأذن لاستعمالي الآن`*');
  break;
  
  }
};
handler.help = ['banchat'];
handler.tags = ['owner'];
handler.command = ['بانشات', 'بانشاتفك'];
handler.rowner = true;
export default handler;
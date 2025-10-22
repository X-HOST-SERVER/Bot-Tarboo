let toM = a => '@' + a.split('@')[0];

function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id);
  let a = ps[Math.floor(Math.random() * ps.length)];
  let b = ps[Math.floor(Math.random() * ps.length)];

  m.reply(`${toM(b)}, *☠️💀تم تأكيد إدانتك بالجريمة التي تقضي عليك بالإعدام عن جرم قتل متعمد ووحشي*`, null, {
    mentions: [a]
  });
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['formarpareja', 'اعدام'];
handler.group = true;

export default handler;
const handler = async (m, {isPrems, conn}) => {
  const time = global.db.data.users[m.sender].lastcofre + 86400000; // 36000000 10 Horas //86400000 24 Horas
  if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) throw `[❗خطاء❗] لقد حصلت علي الكنز بالفعل\nارجع بعد *${msToTime(time - new Date())}* للمطالبة مرة أخرى`;

  const img = 'https://img.freepik.com/vector-gratis/cofre-monedas-oro-piedras-preciosas-cristales-trofeo_107791-7769.jpg?w=2000';
  const dia = Math.floor(Math.random() * 10000);
  const tok = Math.floor(Math.random() * 10);
  const raizel = Math.floor(Math.random() * 2000);
  const dollar = Math.floor(Math.random() * 100000);

  global.db.data.users[m.sender].gold += dia;
  global.db.data.users[m.sender].diamond += raizel;
  global.db.data.users[m.sender].joincount += tok;
  global.db.data.users[m.sender].dollar += dollar;

  const texto = `
الــكــنــز ↶
*●━── ⊱•┇«🔥»┇•⊰ ──━●*
┇لـقـد حـصـلـت عـلـي ↶
*●━── ⊱•┇«📍»┇•⊰ ──━●*
┇ *${raizel} جوهرة* 💎
┇ *${dia} ذهب* 🪙
┇ *${dollar} دولار* 💷
*●━── ⊱•┇«🔥»┇•⊰ ──━●*`;

  const fkontak = {
    'key': {
      'participants': '0@s.whatsapp.net',
      'remoteJid': 'status@broadcast',
      'fromMe': false,
      'id': 'Halo',
    },
    'message': {
      'contactMessage': {
        'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
    'participant': '0@s.whatsapp.net',
  };

 await conn.sendFile(m.chat, img, 'mystic.jpg', texto, fkontak);
  //await conn.sendButton(m.chat, texto, wm, img, [['𝙼𝙴𝙽𝚄 🤖', '/menu'] ], fkontak, m)
  global.db.data.users[m.sender].lastcofre = new Date * 1;
};
handler.help = ['daily'];
handler.tags = ['xp'];
handler.command = ['الكز', 'الكنز', 'كنز', 'cofreabrir'];
handler.level = 0;
export default handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;

  return hours + ' ساعه ' + minutes + ' دقيقه';
}
import fs from 'fs/promises';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let fkontak = {
    "key": {
      "participants": "0@s.whatsapp.net",
      "remoteJid": "status@broadcast",
      "fromMe": false,
      "id": "Halo"
    },
    "message": {
      "contactMessage": {
        "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    "participant": "0@s.whatsapp.net"
  };

  await m.reply(`_*🗂️ إرسال قاعدة البيانات. . .*_`);

  try {
    let d = new Date();
    let date = d.toLocaleDateString('ar', { day: 'numeric', month: 'long', year: 'numeric' });

    let [database, creds] = await Promise.all([
      fs.readFile('./database.json'),
      fs.readFile('./MysticSession/creds.json')
    ]);

    await conn.reply(m.sender, `*🗓️ قاعده البايانات:* ${date}`, fkontak);
    await conn.sendMessage(m.sender, { document: database, mimetype: 'application/json', fileName: 'database.json' }, { quoted: m });
    await conn.sendMessage(m.sender, { document: creds, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m });

  } catch (e) {
    await m.reply('فشل');
    console.log('فشل');
    console.log(e);
  }
};

handler.command = /^(backup|قاعده_بيانات|copia)$/i;
handler.owner = true;

export default handler;
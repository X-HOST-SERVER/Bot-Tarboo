import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  let fake = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: '120363389629091988@g.us',
    },
    message: {
      conversation: '⋄┄┄┄┄┄┄┄〘 تحــميل اليــوتيوب 〙┄┄┄┄┄┄┄⋄'
    },
    participant: '0@s.whatsapp.net',
  };

  if (!text) {
    let info = `*❲ ❗ ❳ يرجى إدخال رابط فيديو يوتيوب أو عنوان للبحث!*\n\n🔹 **مثال:**\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/rmW_wQwDkJU`;
    await conn.sendMessage(m.chat, { text: info, mentions: [m.sender] }, { quoted: fake });
    return;
  }

  let outputPath = path.join('/tmp', `downloaded_${Date.now()}.mp4`);
  let format = command === 'اغنيه' ? 'bestaudio' : 'bestvideo+bestaudio';

  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

  let ytProcess = spawn('yt-dlp', ['-f', format, '-o', outputPath, text]);

  ytProcess.stdout.on('data', (data) => {
    console.log(`yt-dlp: ${data}`);
  });

  ytProcess.stderr.on('data', (data) => {
    console.error(`yt-dlp Error: ${data}`);
  });

  ytProcess.on('close', async (code) => {
    if (code === 0) {
      let caption = `*تم التحميل بنجاح!*\n📌 **العنوان:** ${text}`;
      let fileType = command === 'اغنيه' ? 'audio' : 'video';
      let mimeType = command === 'اغنيه' ? 'audio/mpeg' : 'video/mp4';
      let fileName = fileType === 'audio' ? 'the_end.mp3' : 'the_end.mp4';

      await conn.sendMessage(m.chat, { [fileType]: { url: outputPath }, fileName, mimetype: mimeType, caption }, { quoted: fake });

      fs.unlinkSync(outputPath); // حذف الملف بعد الإرسال
    } else {
      await conn.sendMessage(m.chat, { text: '⚠️ حدث خطأ أثناء تحميل الفيديو.' }, { quoted: fake });
    }
  });
};

handler.help = ['اغنيه <رابط/كلمة بحث>', 'فيديو <رابط/كلمة بحث>'];
handler.tags = ['التحميل'];
handler.command = ['اغنيه', 'فيديو', 'اغاني'];

export default handler;
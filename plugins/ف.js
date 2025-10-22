import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
 
    if (!text) {
      await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ يرجي إدخال نص للبحث عن ملف الفيديو .*\nمثال :\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    try {
      const yt_play = await search(args.join(' '));
      
      const dataMessage = `*❲ نتيجة البحث عن : ${text} ❳*\n➤ العنوان : ${yt_play[0].title}\n➤ النشر : ${yt_play[0].ago}\n➤ الطول : ${secondString(yt_play[0].duration.seconds)}\n➤ الرابط : ${yt_play[0].url}\n➤ المشاهدات : ${MilesNumber(yt_play[0].views)}\n➤ الصانع : ${yt_play[0].author.name}\n➤ القناة : ${yt_play[0].author.url}\n> انتظر جاري تحميل ملف الفيديو ...`.trim();

      const iturl = yt_play[0].url;
      const itimg = yt_play[0].thumbnail;
      
      await conn.sendMessage(m.chat, { image: {url: itimg}, caption: dataMessage}, { quoted: m });
      
      try {
      
      const playmp3 = await getmp3url(iturl);
      
      const { title, videoUrl, thumbnail } = playmp3;
      
           await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
           
             
             await conn.sendMessage(m.chat, {document: {url: videoUrl}, fileName: title + '.mp4', mimetype: 'video/mp4', caption: `⛊ العنوان : ${title}\n`}, {quoted: m});
             
          } catch {
          
            await conn.reply(m.chat, '*❲ ❗ ❳ حدث خطأ عند جلب ملف الفيديو.*', m);
          }
        
      
      
        } catch {
      await conn.sendMessage(m.chat, { text: `*❲ ❗ ❳ حدث خطأ عند البحث عن ملف الفيديو .*\nيرجي ادخال نص صحيح أو رابط مثال :\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/JLWRZ8eWyZo?si=EmeS9fJvS_OkDk7p` }, { quoted: m });
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }
      
      
      
      
};

handler.command = /^(فيدو1)$/i;
export default handler;

async function search(query, options = {}) {
  const search = await yts.search({ query, hl: 'ar', gl: 'AR', ...options });
  return search.videos;
}

async function getmp3url(url) {
  
  const fetchUrl = `https://the-end-api.vercel.app/home/sections/Ai/api/convert?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(fetchUrl);
    const data = await response.json();
    
    if (!data.status) {
      return conn.reply(m.chat, `❌ _Error:_ ${data.message || 'No se encontró el video'}`, m);
    }
    
  return data.data;
}

function MilesNumber(number) {
  const exp = /(\d)(?=(\d{3})+(?!\d))/g;
  const rep = '$1.';
  const arr = number.toString().split('.');
  arr[0] = arr[0].replace(exp, rep);
  return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
  seconds = Number(seconds);
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
  const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
  const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
  const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return 'n/a';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return i === 0 ? `${bytes} ${sizes[i]}` : `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}



/*
╮────────────────────────╭ـ
│ By : 𝗦𝗔𝗬𝗘𝗗-𝗦𝗛𝗔𝗪𝗔𝗭𝗔 🧞
│ Number : https://wa.me/201145624848
│ Community : https://chat.whatsapp.com/Hg4F5jQ9Z9r1lUH6I1jkhI
│ Group Support : https://chat.whatsapp.com/JGtNRFwfHJC8XholdKmVGS
│ Chanel : https://whatsapp.com/channel/0029Vael6wMJP20ze3IXJk0z
╯────────────────────────╰ـ 
*/
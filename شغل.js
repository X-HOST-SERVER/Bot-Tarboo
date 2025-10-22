import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'
import yts from 'yt-search';
import fetch from 'node-fetch';
import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
    
    const device = await getDevice(m.key.id);
    
    let faketext = {
  key: {
    fromMe: false,
    participant: '0@s.whatsapp.net',
    remoteJid: '120363389629091988@g.us',
  },
  message: {
    conversation: '⋄┄┄┄┄┄┄┄〘 بحــث اليــوتيوب 〙┄┄┄┄┄┄┄⋄'
  },
  participant: '0@s.whatsapp.net',
};
    
    const infotext = `*❲ ❗ ❳ يرجي إدخال نص للبحث في اليوتيوب .*\nمثال :\n> ➤  ${usedPrefix + command} القرآن الكريم\n> ➤  ${usedPrefix + command} https://youtu.be/rmW_wQwDkJU?si=W8P7-ujM9w24V24S`;
    
    
  if (!text) { 
  await conn.sendMessage(m.chat, {text: infotext, mentions: [m.sender]}, { quoted: faketext });
  await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key } });
      return;
    }
    
  if (device !== 'desktop' || device !== 'web') {      
  await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
  
  const results = await yts(text);
  const videos = results.videos.slice(0, 30);
  const randomIndex = Math.floor(Math.random() * videos.length);
  const randomVideo = videos[randomIndex];

  var messa = await prepareWAMessageMedia({ image: {url: randomVideo.thumbnail}}, { upload: conn.waUploadToServer });
  
  const imagurl = 'https://files.catbox.moe/hm0l6b.jpg';
 
 let chname = '尺月乙月ル🧧乃〇丁';
 let chid = '120363316635505389@newsletter';
  
  const captain = `
  
     *⧏⟖❲ نتيجة البحث عن : ${text} ❳⟕⧐*
  
  *↳ نتائج البحث ${results.videos.length}↲*
  
  *⦉ العنوان ⦊* ${randomVideo.title}
  *⦉ الصانع ⦊* ${randomVideo.author.name}
  *⦉ المشاهدات ⦊* ${randomVideo.views}
  *⦉ المدة ⦊* ${randomVideo.duration.seconds}
  *⦉ النشر ⦊* ${randomVideo.ago}
  *⦉ الرابط ⦊* ${randomVideo.url}
  *⦉ القناة ⦊* ${randomVideo.author.url}
  
  
> ↬ اختر من القائمه بالاسفل.
  `;
  
  
  const interactiveMessage = {
    body: { text: captain },
    footer: { text: `${global.wm}`.trim() },  
      header: {
          title: `*⋄┄┄┄┄┄〘 بحــث اليــوتيوب 〙┄┄┄┄┄⋄*\n`,
          hasMediaAttachment: true,
          imageMessage: messa.imageMessage,
      },
      contextInfo: {
        mentionedJid: await conn.parseMention(captain), 
        isForwarded: true, 
        forwardingScore: 1, 
        forwardedNewsletterMessageInfo: {
        newsletterJid: chid, 
        newsletterName: chname, 
        serverMessageId: 100
        },
        externalAdReply: {
        showAdAttribution: true,
          title: "⋄┄〘 بحــث اليــوتيوب 〙┄⋄",
          body: "❲ قسم البحث ❳",
          thumbnailUrl: imagurl,
          mediaUrl: imagurl,
          mediaType: 1,
          sourceUrl: 'https://www.atom.bio/shawaza-2000/',
          renderLargerThumbnail: false
        }
      },
    nativeFlowMessage: {
      buttons: [
        {
          name: 'single_select',
          buttonParamsJson: JSON.stringify({
            title: '⋄┄┄┄┄┄〘 قائمة النتائج 〙┄┄┄┄┄⋄',
            sections: videos.map((video) => ({
              title: video.title,
              rows: [
                {
                  header: '',
                  title: '',
                  description: '〘 🎧 صــوتي 〙',
                  id: `.ريك ${video.url}`
                },
                  {
                  header: '',
                  title: '',
                  description: '〘 🎥 فيــديو 〙',
                  id: `.play.2 ${video.url}`
                },
                
              ]
            }))
          })
        }
      ],
      messageParamsJson: ''
    }
  };        
            
        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: faketext })
        
        await conn.sendMessage(m.chat, { react: { text: '✔️', key: m.key } });
      conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

  } else {
  
  const results = await yts(text);
  const tes = results.all;
  
  const teks = results.all.map((v) => {
    switch (v.type) {
      case 'video': return `
° *العنوان:* ${v.title}
↳ 🫐 *الرابط:* ${v.url}
↳ 🕒 *المدة:* ${v.timestamp}
↳ 📥 *منذ:* ${v.ago}
↳ 👁 *المشاهدات:* ${v.views}`;
    }
  }).filter((v) => v).join('\n\n◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦◦\n\n');
  
  conn.sendFile(m.chat, tes[0].thumbnail, 'error.jpg', teks.trim(), faketext);      
  }    
};
handler.help = ['يوتيوب <النص>'];
handler.tags = ['البحث'];
handler.command = ['شغل'];

export default handler;



/*

〔 البحث قائمة يوتيوب 〕


╮────────────────────────╭ـ
│ By : 𝗦𝗔𝗬𝗘𝗗-𝗦𝗛𝗔𝗪𝗔𝗭𝗔 🧞
│ Number : https://wa.me/201145624848
│ Community : https://chat.whatsapp.com/DGF8tY4VhSr2JATe6XpM02
│ Group Support : https://chat.whatsapp.com/Je9MR6MIJ245CvzKJYQSCY
│ Chanel : https://whatsapp.com/channel/0029Vael6wMJP20ze3IXJk0z
╯────────────────────────╰ـ 
*/
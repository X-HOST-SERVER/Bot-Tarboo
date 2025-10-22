import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';
import cheerio from 'cheerio';

const handler = async (m, { text, conn, isOwner, args, command, usedPrefix }) => {

let fakecontact = { 'key': { 'participants': '0@s.whatsapp.net', 'remoteJid': 'status@broadcast', 'fromMe': false, 'id': '𝐒𝐇𝐀𝐖𝐀𝐙𝐀-𝐁𝐎𝐓' }, 'message': { 'contactMessage': { 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` } }, 'participant': '0@s.whatsapp.net' };
  

  if (db.data.chats[m.chat].modohorny && m.isGroup) return conn.sendMessage(m.chat,{text: '*وضع التقييد شغال ي حوب*'}, {quoted: fakecontact });   
  
  
  
  if (command === 'سكس') {
  
 if (!text) { 
 conn.sendMessage(m.chat, {text: '*`〘 ⚠️ 〙 فين النص اللي هتبحث عنو ي حوب`*'}, {quoted: fakecontact }); 
 await conn.sendMessage(m.chat, { react: { text: '⚠️', key: m.key } });
 return;
  }
  
  let textsearch = text;
  
  let pagenumber = Math.floor(Math.random() * 150);

conn.sendMessage(m.chat, {text: '*`〘 ♻️ 〙 جاري البحث عن نتائج ...`*'}, {quoted: fakecontact }); 
  
  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

  try {
    const vids_ = {
      from: m.sender,
      urls: [],
    };

    if (!global.videoListXXX) {
      global.videoListXXX = [];
    }

    if (global.videoListXXX[0]?.from === m.sender) {
      global.videoListXXX.splice(0, global.videoListXXX.length);
    }


    const res = await xnxxsearch(textsearch, pagenumber);
    const json = res.result;
    const preview = json[0];
    
   // title, author, time, resolution, views, link
    
    const title = preview.title;
    const author = preview.author;
    const time = preview.time;
    const resolution = preview.resolution;
    const views = preview.views;
    const link = preview.link;
    
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    const cap =  `*⎙ المنصه: XNXX VIDEOS*\n\n*⛊ رقم الصفحة:* ${pagenumber}\n*⛊ نتائج البحث:* ${json.length}\n\n*⛊ نتيجة البحث عن:* ${textsearch.toUpperCase()}\n\n- *-› العنوان:* ${title}\n- *-› الرابط:* ${link}\n- *-› التقييم:* ${time}\n- *-› المدة:* ${resolution}\n- *-› الجودة:* ${views}\n- *-› المشاهدات:* ${author}\n\n> 🗃️ اختر من القائمه بالاسفل.\n\n`.trim();
    
    const menu = `❲ نتائج البحث عن : ${command} ${textsearch.toUpperCase()} ❳`;

    const plinke = `https://image.thum.io/get/fullpage/`;
  const imageUrl = `${plinke}https://www.xnxx.com/search/${text}/${pagenumber - 1}`;


    let messa = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });
    
    let count = 1;
    let heager = [];  
    for (const v of json) {
      const linkXXX = v.link;
      vids_.urls.push(linkXXX);

      heager.push({
        header: '',
        title: v.title,
        id: `.تحميل-سكس ${v.link}`,
        description: `📽️ Download MP4`
      });
      count++;
    }

    let msg = generateWAMessageFromContent(m.chat, { 
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: cap },
            footer: { text: wm },
            header: {
            title: `⛊─━━═══〘 الـبحث إبـاحي 〙═══━━─⛊\n`,
              hasMediaAttachment: true,
              imageMessage: messa.imageMessage,
            },
            nativeFlowMessage: {
              buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '≺ قائمة النتائج ≻',
                  sections: [
                    {
                      title: menu,
                      highlight_label: '🔞',
                      rows: heager
                    }
                  ]
                }),
              },
              ],
              messageParamsJson: "",
            },
          },
        },
      }
    }, { userJid: conn.user.jid, quoted: fakecontact });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    
    await conn.sendMessage(m.chat, { react: { text: '🔞', key: m.key } });

    global.videoListXXX.push(vids_);
    
 
  } catch (e) {
    throw e;
  }
}

if (command === 'تحميل-سكس') {

let xnxxLink = args[0];

await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } });

  try {
    
    const res = await xnxxdl(xnxxLink);
    const json = await res.result.files;
    
    await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });
    
    conn.sendMessage(m.chat, {text: '*`〘 ♻️ 〙 جاري تحميل المقطع ...`*'}, {quoted: fakecontact }); 
    
    const video = json.high;
    const title = res.result.title;
    const image = res.result.image;
    const duration = res.result.duration;
    const url = res.result.URL;
    
    const info = await res.result.info;
    const [author, time, resolution, views] = info
      .split(/[\s-]+/)
      .filter(item => item.trim() !== ''); 
    
    
    let txt2 = `\n*العنوان :* ${title}\n*الصانع :* ${author}\n*المدة :* ${time}\n*الجودة :* ${resolution}\n*المشاهدات :* ${views}\n*الرابط :* ${url}\n\n`;
    
 
 await conn.sendMessage(m.chat, {video: {url: video}, mimetype: 'video/mp4', fileName: title, caption: txt2}, {quoted: fakecontact});
 
 await conn.sendMessage(m.chat, { react: { text: '📥', key: m.key } });
  
  } catch {
    throw `*جرب تاني واتاكد من الرابط 🧞*`;
  }
}

};

handler.help = ['xns'].map((v) => v + ' <query>');
handler.tags = ['downloader', 'premium'];
handler.command = /^(xns|سكس|تحميل-سكس|xnd)$/i;
handler.rowner = true

export default handler;

async function xnxxsearch(query, page) {
  const baseurl = 'https://www.xnxx.com';
  const url = `${baseurl}/search/${query}/${page}`;
  try {
    const res = await fetch(url);
    const text = await res.text();
    const $ = cheerio.load(text);
    const results = [];

    $('div.mozaique').each((a, b) => {
      const thumb = $(b).find('div.thumb a');
      const thumbUnder = $(b).find('div.thumb-under');
      thumb.each((i, el) => {
        const link = baseurl + $(el).attr('href').replace('/THUMBNUM/', '/');
        const title = thumbUnder.eq(i).find('a').attr('title');
      
      const info = thumbUnder.eq(i).find('p.metadata').text().trim();
      
      const [author, time, resolution, views] = info
      .split(/[\s-]+/)
      .filter(item => item.trim() !== ''); 
      
      results.push({ title, author, time, resolution, views, link });
      });
    });
    
    if (!results) {
    await xnxxsearch(query, page);
    return;
    }

    return { code: 200, status: true, result: results.slice(0, 37) };
  } catch (err) {
    return { code: 503, status: false, result: err };
  }
}

async function xnxxdl(URL) {
  return new Promise((resolve, reject) => {
    fetch(`${URL}`, {method: 'get'}).then((res) => res.text()).then((res) => {
      const $ = cheerio.load(res, {xmlMode: false});
      const title = $('meta[property="og:title"]').attr('content');
      const duration = $('meta[property="og:duration"]').attr('content');
      const image = $('meta[property="og:image"]').attr('content');
      const videoType = $('meta[property="og:video:type"]').attr('content');
      const videoWidth = $('meta[property="og:video:width"]').attr('content');
      const videoHeight = $('meta[property="og:video:height"]').attr('content');
      const info = $('span.metadata').text();
      const videoScript = $('#video-player-bg > script:nth-child(6)').html();
      const files = {
        low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
        high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
        HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
        thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
        thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
        thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
        thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1]};
      resolve({status: 200, result: {title, URL, duration, image, videoType, videoWidth, videoHeight, info, files}});
    }).catch((err) => reject({code: 503, status: false, result: err}));
  });
}
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from 'baileys';

const handler = async (m, {conn, usedPrefix, command, text}) => {
  if (!text) throw `✳️ يرجى إدخال كلمة للبحث\n\nمثال: *${usedPrefix + command} سولو ليفل*`;
  
  try {
    m.reply('🔍 جاري البحث على إنستجرام...');
    
    const apiUrl = `https://the-end-api.vercel.app/home/sections/Search/api/insta/search?q=${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (!data.status || !data.results || data.results.length === 0) {
      throw '❌ لم يتم العثور على نتائج';
    }
    
    const firstResultThumbnail = data.results[0].video_inbnail;
    const mediaMessage = await prepareWAMessageMedia({ image: { url: firstResultThumbnail } }, { upload: conn.waUploadToServer });
    
    const rows = data.map((result, index) => ({
      header: `النتيجة ${index + 1}`,
      title: result.video_title.substring(0, 20) + (result.video_title.length > 20 ? '...' : ''),
      description: result.video_description ? result.video_description.substring(0, 30) + '...' : '',
      id: `${usedPrefix}انستا ${result.video_info.link}`
    }));
    
    const caption = `╭─────────────────────────╮\n\n│ نتائج البحث على إنستجرام\n\n│ كلمة البحث: ${text}\n\n│ العدد: ${data.results.length} نتيجة\n\n╰─────────────────────────╯`;
    
    const msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            body: { text: caption },
            footer: { text: 'اختر أحد النتائج لعرض الرابط' },
            header: {
              hasMediaAttachment: true,
              imageMessage: mediaMessage.imageMessage
            },
            nativeFlowMessage: {
              buttons: [
                {
                  name: 'single_select',
                  buttonParamsJson: JSON.stringify({
                    title: '「 نتائج إنستجرام 」',
                    sections: [
                      {
                        title: '「 قائمة النتائج 」',
                        highlight_label: 'انستجرام',
                        rows: rows
                      }
                    ]
                  })
                }
              ]
            }
          }
        }
      }
    }, { userJid: conn.user.jid, quoted: m });
    
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    
  } catch (error) {
    console.error(error);
    m.reply('❌ حدث خطأ أثناء البحث، يرجى المحاولة لاحقاً');
  }
};

handler.help = ['بحث-انستا'].map((v) => v + ' *<كلمة البحث>*');
handler.tags = ['search'];
handler.command = /^(بحث-انستا)$/i;

export default handler;
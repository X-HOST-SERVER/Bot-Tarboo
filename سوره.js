import fetch from 'node-fetch';
import translate from '@vitalets/google-translate-api';
import pkg from '@whiskeysockets/baileys';

const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, args, usedPrefix, command }) => {
  try {
    if (!args[0]) {
      return m.reply(`❌ *يرجى تحديد رقم أو اسم السورة*\n\n📌 مثال: *${usedPrefix + command}* 1 أو *${usedPrefix + command}* الفاتحة`);
    }

    let surahInput = args.join(' ').toLowerCase();
    let surahListRes = await fetch('https://quran-endpoint.vercel.app/quran');
    let surahList = await surahListRes.json();

    if (!surahList || !surahList.data) {
      return m.reply(`❌ *تعذر جلب قائمة السور.*`);
    }

    let surahData = surahList.data.find(surah =>
      surah.number === Number(surahInput) ||
      surah.asma.ar.short.toLowerCase() === surahInput ||
      surah.asma.en.short.toLowerCase() === surahInput
    );

    if (!surahData) {
      return m.reply(`❌ *لم يتم العثور على سورة بهذا الرقم أو الاسم:* "${surahInput}"`);
    }

    let res = await fetch(`https://quran-endpoint.vercel.app/quran/${surahData.number}`);
    let json = await res.json();

    if (!json || !json.data) {
      return m.reply(`❌ *تعذر جلب تفاصيل السورة.*`);
    }

    let surahInfo = json.data;
    let translatedTafsir = await translate(surahInfo.tafsir.id, { to: 'ar', autoCorrect: true });

    let messageText = `*┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╮*\n📖 *القرآن الكريم*\n*┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╯*\n
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*\n📜 *سورة ${surahInfo.number}: ${surahInfo.asma.ar.long}*\n
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*\n📌 النوع: ${surahInfo.type.ar}\n
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*\n🔢 عدد الآيات: ${surahInfo.ayahCount}\n\n*┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╮*\n 🔍 *التفسير:*\n${translatedTafsir.text}\n *┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅╯*`;

    const imageUrl = 'https://files.catbox.moe/awrifn.jpg';
    let media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

    let message = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: { title: `📖 ${surahInfo.asma.ar.long}` },
            body: { text: messageText, subtitle: "القرآن الكريم" },
            header: { hasMediaAttachment: true, ...media },
            nativeFlowMessage: {
              buttons: [
                {  
                  name: "quick_reply",  
                  buttonParamsJson: JSON.stringify({  
                    display_text: "🎧 استمع للسورة",  
                    id: `${usedPrefix}audio ${surahInfo.number}`  
                  })  
                },
                {  
                  name: "cta_url",  
                  buttonParamsJson: JSON.stringify({  
                    display_text: "『قناه البوت🥷🔥』",  
                    url: `https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c`  
                  })  
                }
              ]
            }
          }
        }
      }
    };

    await conn.relayMessage(m.chat, message, {});

  } catch (error) {
    console.error(error);
    m.reply(`❌ *حدث خطأ!*\n📝 ${error.message}`);
  }
};

handler.help = ['quran [رقم_السورة|اسم_السورة]'];
handler.tags = ['quran', 'اسلام'];
handler.command = ['quran', 'surah', 'سوره', 'سورة'];
export default handler;
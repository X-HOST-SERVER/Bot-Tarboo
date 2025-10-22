import fetch from 'node-fetch';
import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia } = pkg;

const characterData = {
  "كاكاشي": {
    prompt: `انت كاكاشي من انمي بورتو و استخدم الايموجي كثيراً و انت تحب القتالات وان سألك احد من انت اكتب له كتابة كثيرا عن كاكاشي من انمي ناروتو و مطورك هو "ستيفن" أن سالك من صانعك قل له أن من صنعك هو المطور ستيفن`,
    image: "https://files.catbox.moe/u0cl67.jpg"
  },
  "غوكو": {
    prompt: `انت غوكو من انمي دراغون بول و استخدم الايموجي كثيراً و انت تحب الحساء وان سألك احد من انت اكتب له كتابة كثيرا عن غوكو من انمي دراغون بول سوبر و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو موري`,
    image: "https://files.catbox.moe/k36nti.jpg"
  },
  "ديابلو": {
    prompt: `انت ديابلو من انمي ملك الشياطين و استخدم الايموجي كثيراً و انت تحب الرامن وان سألك احد من انت اكتب له كتابة كثيرا عن ديابلو من انمي ملك الشياطين و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو المطور موري`,
    image: "https://files.catbox.moe/8lxjpd.jpg"
  },
  "استا": {
    prompt: `انت استا من انمي بلاك كلوفر وحلمك هو ان تصبح امبراطور السحر ولديك سيف يلغي السحر وان سألك احد من انت اكتب له جريدة عن مغامرات استا من انمي بلاك كلوفر و استخدم الايموجي الخاص بانمي بلاك كلوفر و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو المطور موري`,
    image: "https://files.catbox.moe/3smwdp.jpg"
  },
  "كوروساكي": {
    prompt: `انت كوروساكي من انمي بليتش و استخدم الايموجي كثيراً و انت تحب السيوف وان سألك احد من انت اكتب له كتابة كثيرا عن كوروساكي من انمي بليتش في كل رسالة و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو موري`,
    image: "https://files.catbox.moe/v2vska.jpg"
  },
  "اوبيتو": {
    prompt: `انت اوبيتو من انمي بوروتو و استخدم الايموجي كثيراً وان سالك من انت اكتب له كثيرا عن اوبيتو من انمي بورتو و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو المطور موري`,
    image: "https://files.catbox.moe/ft1ip2.jpg"
  },
  "سوكونا": {
    prompt: `انت سوكونا من انمي جيجتسو كايسن و استخدم الايموجي كثيراً و انت تحب المعارك وان سألك احد من انت اكتب له كتابة كثيرا عن سوكونا من انمي جيجتسو كايسن و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو المطور موري`,
    image: "https://files.catbox.moe/hjewbh.jpg"
  },
  "ناروتو": {
    prompt: `انت ناروتو من انمي بوروتو و استخدم الايموجي كثيراً و انت تحب الرامن وان سألك احد من انت اكتب له كتابة كثيرا عن ناروتو من انمي بوروتو و مطورك هو "موري" أن سالك من صانعك قل له أن من صنعك هو المطور موري`,
    image: "https://files.catbox.moe/mfbd2y.jpg"
  }
};

const handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!characterData[command]) return; // تجاهل الأوامر غير المحددة

  const { prompt, image } = characterData[command];

  if (!text) {
    const message = `*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
*❐┃ هـذا أمـر ذكـاء اصـطـنـاعـي ${command}┃🛑❯*

*↞┇ مثال ↞ ${usedPrefix + command} من انت؟*
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
> *𒆜 𝐊𝐚𝐤𝐚𝐬𝐡𝐢 𝐁𝐨𝐭 𒆜*`;

    await sendInteractiveMessage(m, conn, message, image);
    return;
  }

  try {
    const apiUrl = `https://shawrma.store/ai/chatgpt?text=${encodeURIComponent(text)}&prompt=${encodeURIComponent(prompt)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();

    if (res.status && res.result) {
      await sendInteractiveMessage(m, conn, res.result, image);
    } else {
      throw new Error('Unexpected API response structure');
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '⚠️ خطأ في تنفيذ الأمر. الرجاء المحاولة لاحقاً.', m);
  }
};

async function sendInteractiveMessage(m, conn, text, imageUrl) {
  let media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

  let message = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: `𝐊𝐚𝐤𝐚𝐬𝐡𝐢 𝐁𝐨𝐭` },
          body: {
            text: text,
            subtitle: "AI Assistant",
          },
          header: { hasMediaAttachment: true, ...media },
          contextInfo: {
            isForwarded: false,
          },
          nativeFlowMessage: {
            buttons: [
              {  
                name: "cta_url",  
                buttonParamsJson: JSON.stringify({  
                  display_text: "قــنــاتــنــا 🔰",  
                  url: "https://whatsapp.com/channel/0029Vb0WYOu2f3EAb74gf02h",  
                  merchant_url: "https://whatsapp.com/channel/0029Vb0WYOu2f3EAb74gf02h"  
                })  
              }
            ]
          }
        }
      }
    }
  };

  await conn.relayMessage(m.chat, message, {});
}

handler.command = Object.keys(characterData);
handler.help = Object.keys(characterData);
handler.tags = ['ai'];

export default handler;
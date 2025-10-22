import fetch from 'node-fetch';

const handler = async (m, { conn }) => {
  try {
    const res = await fetch('https://api.thedogapi.com/v1/images/search');
    const img = await res.json();
    const caption = `*_⌬ ❛╏❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭_*`;

    await conn.sendMessage(m.chat, {
      image: { url: img[0].url },
      caption: caption,
      footer: `${global.gt}`,
      buttons: [
        {
          buttonId: '.كلب',
          buttonText: { displayText: '↬⌯الـمــ🐶ــزيـد‹◝' }
        }
      ],
      viewOnce: true
    }, { quoted: m });
  } catch (e) {
    console.log(e);
    throw '*❌ حدث خطأ، حاول مرة أخرى!*';
  }
};

handler.help = ['dog'];
handler.tags = ['random'];
handler.command = /^كلب$/i;
handler.fail = null;

export default handler;
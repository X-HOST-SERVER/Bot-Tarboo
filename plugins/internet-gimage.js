import axios from 'axios';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw `❓ بتبحث عن ايه؟\n💬 من فضلك أدخل اسم البحث.\nمثال:\n*${usedPrefix + command} شادو*`;
  }

  try {
    // طلب خلفيات باستخدام API خارجي
    const response = await axios.get(
      `https://api.lolhuman.xyz/api/wallpaper?apikey=${lolkeysapi}&query=${encodeURIComponent(text)}`
    );

    if (!response.data || !response.data.result || response.data.result.length === 0) {
      throw `⚠️ لم أتمكن من العثور على نتائج للخلفية المطلوبة "${text}".`;
    }

    // اختيار صورة عشوائية من النتائج
    const img = response.data.result[Math.floor(Math.random() * response.data.result.length)];

    await delay(5000); // تأخير 5 ثوانٍ
    await conn.sendFile(
      m.chat,
      img,
      'wallpaper.jpg',
      `*💞 نتائج البحث عن: ${text}*`,
      m
    );
  } catch (error) {
    console.error(error);
    m.reply(`⚠️ حدث خطأ أثناء البحث عن الخلفيات. حاول مرة أخرى.`);
  }
};

handler.help = ['', '2'].map(v => 'wallpaper' + v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^(wp|خلفية|خلفيه|wallpaper2?)$/i;
handler.exp = 29;
handler.limit = false;
handler.register = true;
handler.level = false;

export default handler;

const delay = (time) => new Promise((res) => setTimeout(res, time));
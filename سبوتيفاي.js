// كود تحميل سبوتيفاي Mp3 🇵🇸
// Channel WhatsApp>>> https://whatsapp.com/channel/0029Vb0WYOu2f3EAb74gf02h
// Channel Telegram>>> https://t.me/MoriDev1

// By Mori-Dev 💗

import fetch from 'node-fetch';

const handler = async (m, { text, conn, command, args }) => {
  try {
    if (!args.length) {
      return await m.reply("❌ يرجى توفير اسم الأغنية للبحث عنها في Spotify.");
    }

    let query = args.join(" ");
    let searchApiUrl = `https://takamura-api.joanimi-world.site/api/search/spotify?name=${encodeURIComponent(query)}`;
    
    let searchResponse = await fetch(searchApiUrl);
    let searchData = await searchResponse.json();

    if (!searchData.status || !searchData.results.length) {
      return await m.reply("❌ لم يتم العثور على أي نتائج.");
    }

    let firstResult = searchData.results[0];
    let spotifyUrl = firstResult.url;

    let msg = `🎵 *تم العثور على الأغنية:* _${firstResult.title}_\n`;
    msg += `🎤 *الفنان:* ${firstResult.artist}\n`;
    msg += `⏱ *المدة:* ${firstResult.duration}\n`;
    msg += `🏷️ *رابط الاغنيه:* ${spotifyUrl}\n\n`;
    msg += `⏳ *جاري التحميل...*`;
    
    await m.reply(msg);
    
    let downloadApiUrl = `https://takamura-api.joanimi-world.site/api/download/spotify?url=${encodeURIComponent(spotifyUrl)}`;
    let downloadResponse = await fetch(downloadApiUrl);
    let downloadData = await downloadResponse.json();

    if (!downloadData.status || !downloadData.file_url) {
      return await m.reply("❌ لم يتم العثور على رابط التحميل.");
    }

    let Mori = downloadData.file_url;

    await conn.sendMessage(m.chat, { 
      audio: { url: Mori }, 
      mimetype: 'audio/mp3' 
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    await m.reply("❌ حدث خطأ أثناء تنفيذ الأمر.");
  }
};

handler.help = ["M O R I"];
handler.tags = ["D E V"];
handler.command = ['spotify', 'سبوتيفاي'];

export default handler;
import axios from "axios";
import yts from "yt-search";

const formatAudio = ['mp3'];
const apiBaseUrl = "https://p.oceansaver.in/ajax";

const downloadMedia = async (url) => {
  const apiUrl = `${apiBaseUrl}/download.php?format=mp3&url=${encodeURIComponent(url)}&api=YOUR_API_KEY`;

  try {
    const { data } = await axios.get(apiUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!data || !data.success) throw new Error('فشل الحصول على تفاصيل الفيديو.');

    return await checkProgress(data.id);
  } catch (error) {
    throw new Error(`خطأ أثناء التنزيل: ${error.message}`);
  }
};

const checkProgress = async (id) => {
  const progressUrl = `${apiBaseUrl}/progress.php?id=${id}`;
  let attempts = 0;
  const maxAttempts = 30;

  while (attempts < maxAttempts) {
    const { data } = await axios.get(progressUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (data && data.success && data.progress === 1000) {
      return data.download_url;
    }
    attempts++;
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  throw new Error('العملية استغرقت وقتًا طويلاً.');
};

const handler = async (m, { conn, text }) => {
  if (!text || text.trim().length < 2) {
    return m.reply("❌ الرجاء كتابة اسم الأغنية بوضوح.");
  }

  try {
    const search = await yts(text);
    const video = search.all[0];
    if (!video) return m.reply('لم يتم العثور على نتائج.');

    const detail = `*⋄┄┄┄┄┄┄┄〘 تحــميل اليــوتيوب 〙┄┄┄┄┄┄┄⋄*

│ *◈ العنوان :* ${video.title || 'غير متوفر'}
│ *◈ الوصف :* ${video.description || 'غير متوفر'}
│ *◈ الوقت :* ${video.timestamp || 'غير متوفر'}
│ *◈ النشر :* ${video.ago || 'غير متوفر'}
│ *◈ الصانع :* ${video.author.name || 'غير متوفر'}

> © Powered By Shadow
`;

    await conn.sendMessage(m.chat, {
      text: detail,
      contextInfo: {
        externalAdReply: {
          title: video.title,
          body: "Powered By Shadow",
          thumbnailUrl: video.thumbnail,
          mediaUrl: video.url,
        },
      },
    }, { quoted: m });

    const downloadUrl = await downloadMedia(video.url);
    if (!downloadUrl) return m.reply('فشل تحميل الصوت.');

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: 'audio/mpeg',
      ptt: false,
    }, { quoted: m });
  } catch (error) {
    m.reply(`خطأ: ${error.message}`);
  }
};

handler.help = ['اغنية <اسم الأغنية>'];
handler.tags = ['بحث', 'صوت'];
handler.command = /^(ريك)$/i;

export default handler;
import fs from 'fs';
import acrcloud from 'acrcloud';

const acr = new acrcloud({
  host: 'identify-eu-west-1.acrcloud.com',
  access_key: 'c33c767d683f78bd17d4bd4991955d81',
  access_secret: 'bvgaIAEtADBTbLwiPGYlxupWqkNGIjT7J9Ag2vIu',
});

const handler = async (m) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (/audio|video/.test(mime)) {
    if ((q.msg || q).seconds > 1000) 
      return m.reply('[❗𝐈𝐍𝐅𝐎❗]\n\nالملف الذي تقوم بتحميله كبير جداً، يُفضل تقليل حجم الملف إلى 10-20 ثانية كحد أقصى للحصول على نتائج دقيقة');

    const media = await q.download();
    const ext = mime.split('/')[1];
    fs.writeFileSync(`./tmp/${m.sender}.${ext}`, media);
    const res = await acr.identify(fs.readFileSync(`./tmp/${m.sender}.${ext}`));

    const { code, msg } = res.status;
    if (code !== 0) throw msg;

    const { title, artists, album, genres, release_date } = res.metadata.music[0];
    const txt = `
نتائج البحث

• 📌 العنوان: ${title}
• 👨‍🎤 الفنان: ${artists !== undefined ? artists.map((v) => v.name).join(', ') : 'لم يُعثر عليه'}
• 💾 الألبوم: ${album.name || 'لم يُعثر عليه'}
• 🌐 النوع: ${genres !== undefined ? genres.map((v) => v.name).join(', ') : 'لم يُعثر عليه'}
• 📆 تاريخ الإصدار: ${release_date || 'لم يُعثر عليه'}
`.trim();

    fs.unlinkSync(`./tmp/${m.sender}.${ext}`);
    m.reply(txt);
  } else {
    throw '*[❗𝐈𝐍𝐅𝐎❗] يُرجى الرد على ملف صوتي*';
  }
};

handler.help = ['quemusica'];
handler.tags = ['tools'];
handler.command = /^quemusica|اعرف|whatmusic$/i;
handler.register = true;

export default handler;
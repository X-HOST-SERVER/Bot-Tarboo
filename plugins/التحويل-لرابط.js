import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';


const handler = async (m) => {
 
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!mime) throw `*فين الملف إللي عاوز ترفعو ي حوب 🧞‍♂️*`;
  const media = await q.download();
  const isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
  const link = await (isTele ? uploadImage : uploadFile)(media);
  m.reply(`*لينك الملف:* ${link}`);
};
handler.help = ['tourl <reply image>'];
handler.tags = ['sticker'];
handler.command = /^(لرابط|tourl)$/i;
export default handler;

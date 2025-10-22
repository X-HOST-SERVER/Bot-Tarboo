import fetch from 'node-fetch';
import { mediafiredl } from '@bochilteam/scraper';

let handler = async (m, { conn, args, usedPrefix, command, isOwner, isPrems }) => {
    var limit = (isOwner || isPrems) ? 1200 : 100;
    
    if (!args[0]) throw `*✳️ أدخـل الـرابــط بـجانـب الأمــر*`;
    if (!args[0].match(/mediafire/gi)) throw `*❎ الـرابــط خـاطئ !*`;

    let u = /^https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0];

    try {
        let res = await mediafiredl(args[0]);
        if (!res || !res.url) throw `❎ فشل في استخراج بيانات الملف!`;

        let { url, filename, ext, aploud, filesize, filesizeH } = res;
        let isLimit = limit * 1024 * 1024 < filesize; // تحويل الحد إلى بايتات

        let caption = `
        ↰ *الــأسـم:* ${filename}
        ↰ *الـمســاحه:* ${filesizeH}
        ↰ *الـأمـتداد:* ${ext}
        ↰ *وقـت الـرفع:* ${aploud}
        ${isLimit ? `\n*❖ يـتجاوز الـملـف حـد الـمساحــه المـتاحـه لـك* *+${limit} MB*\n*كـن عـضو بـريـمـيـام لـتسـتطـيع تـنزيل مـلف بـمساحـة* *900 MB*` : ''} 
        `.trim();

        // إرسال بيانات الملف
        await conn.sendMessage(m.chat, { text: caption }, { quoted: m });

        // إرسال الملف إذا لم يتجاوز الحد المسموح به
        if (!isLimit) {
            await conn.sendMessage(m.chat, { document: { url }, fileName: filename, mimetype: ext }, { quoted: m });
        }
    } catch (error) {
        console.error(error);
        throw `❎ حدث خطأ أثناء معالجة الطلب!`;
    }
};

handler.help = ['mediafire <url>'];
handler.tags = ['dl', 'prem'];
handler.command = ['mediafire', 'ميديافاير'];
handler.diamond = true;
handler.premium = false;

export default handler;
import fetch from "node-fetch";
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender];
    let packname = user.packname || global.packname;
    let author = (user.packname && user.author) ? user.author : (user.packname && !user.author ? '' : global.author);

    if (!args[0]) {
        throw `يرجى إدخال رابط مجموعة الملصقات من تيليجرام.\nمثال:\n${usedPrefix + command} https://t.me/addstickers/Porcientoreal`;
    }

    if (!args[0].match(/(https:\/\/t.me\/addstickers\/)/gi)) {
        throw `الرابط غير صحيح. يرجى التأكد من أنه رابط لمجموعة ملصقات تيليجرام.`;
    }

    let packName = args[0].replace("https://t.me/addstickers/", "");

    let res = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, {
        method: "GET",
        headers: { "User-Agent": "GoogleBot" }
    });

    if (!res.ok) throw 'حدث خطأ أثناء تحميل الملصكات.';

    let json = await res.json();

    m.reply(`عدد الملصقات: ${json.result.stickers.length}\nسيتم إرسالها خلال ${(json.result.stickers.length * 1.5).toFixed(1)} ثانية تقريبًا.`);

    for (let i = 0; i < json.result.stickers.length; i++) {
        let fileId = json.result.stickers[i].thumb.file_id;

        let fileRes = await fetch(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`);
        let fileJson = await fileRes.json();

        let filePath = fileJson.result.file_path;
        let imageUrl = `https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/${filePath}`;

        let stiker = await sticker(false, imageUrl, packname, author);

        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
            contextInfo: {
                forwardingScore: 200,
                isForwarded: false,
                externalAdReply: {
                    showAdAttribution: false,
                    title: "TERBO | الفاجر",
                    body: "تم إنشاء الملصق بواسطة بوت TERBO",
                    mediaType: 2,
                    sourceUrl: redesMenu.getRandom(),
                    thumbnail: gataImg.getRandom()
                }
            }
        });

        await delay(3000); // تأخير 3 ثوانٍ بين كل ملصق
    }

    throw `تم إرسال جميع الملصقات بنجاح.`;
};

handler.help = ['stikertele <رابط>'];
handler.tags = ['sticker', 'downloader'];
handler.command = /^(استيكر-تليجرام)$/i;
handler.cookie = 1;
handler.limit = 1;
handler.register = true;
export default handler;

const delay = time => new Promise(res => setTimeout(res, time));
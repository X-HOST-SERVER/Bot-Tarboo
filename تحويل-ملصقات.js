import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2mp4 } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let stiker = false;

    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || '';

        if (/webp|image|video/.test(mime)) {
            if (/video/.test(mime) && (q.msg || q).seconds > 8) {
                return m.reply('*❌ لا يمكن أن يزيد الفيديو عن 7 ثوانٍ.*');
            }

            let img = await q.download?.();
            if (!img) throw `*⚠️ يرجى الرد على صورة أو فيديو (أقل من 8 ثوانٍ)، أو إدخال رابط صورة بصيغة jpg. استخدم الأمر: ${usedPrefix + command}*`;

            let out;
            try {
                stiker = await sticker(img, false, global.packname, global.author);
            } catch (e) {
                console.error(e);
            }

            if (!stiker) {
                try {
                    if (/webp/.test(mime)) {
                        out = await webp2mp4(img);
                    } else if (/image/.test(mime)) {
                        out = await uploadImage(img);
                    } else if (/video/.test(mime)) {
                        out = await uploadFile(img);
                    }

                    if (typeof out !== 'string') out = await uploadImage(img);
                    stiker = await sticker(false, out, global.packname, global.author);
                } catch (e) {
                    console.error(e);
                    throw '*❌ حدث خطأ أثناء معالجة الوسائط، يرجى المحاولة مرة أخرى.*';
                }
            }
        } else if (args[0]) {
            if (isValidUrl(args[0])) {
                stiker = await sticker(false, args[0], global.packname, global.author);
            } else {
                return m.reply('*❌ الرابط غير صالح، يجب أن يكون بصيغة jpg، مثال: https://telegra.ph/file/5f6d20951b3930d99b306.jpg*');
            }
        } else {
            return m.reply(`*⚠️ يرجى الرد على صورة أو فيديو (أقل من 8 ثوانٍ)، أو إدخال رابط صورة بصيغة jpg. استخدم الأمر: ${usedPrefix + command}*`);
        }
    } catch (e) {
        console.error(e);
        if (!stiker) stiker = '*❌ خطأ غير متوقع، يرجى المحاولة لاحقًا.*';
    } finally {
        if (stiker) {
            conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        } else {
            throw '*❌ فشل في إنشاء الملصق، تأكد من إرسال وسائط صالحة.*';
        }
    }
};

handler.help = ['sticker (caption|reply media)', 'sticker <url>', 'stikergif (caption|reply media)', 'stikergif <url>'];
handler.tags = ['sticker'];
handler.command = /^لستيك|لملصق?$/i;

export default handler;

const isValidUrl = (text) => {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*\.(jpe?g|gif|png))/.test(text);
};
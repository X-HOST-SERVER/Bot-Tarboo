import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import fetch from 'node-fetch';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

var handler = async (m, { conn }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (!mime) throw '*⌗ قـم بـي الـرد عـلـي الـصـوره أو الفيديو.*';

    let media = await q.download();
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link = await (isTele ? uploadImage : uploadFile)(media);
    let shortLink = await shortUrl(link);
    
    let mentionId = m.key.participant || m.key.remoteJid;

    // إعداد زر النسخ بنفس طريقة كود "لينك"
    const interactiveMessage = {
        body: { text: `*⧼🖇┊تـحـويـل لـرابـط ┊🖇⧽*` },
        footer: { text: `لـي اخـذ الـرابـط انـسـخـه مـن الـزر\n${global.gt}` },
        header: {
            title: `مـرحـبـا يـا ˼@${mentionId.split('@')[0]}˹`,
            subtitle: `نـسـخـة الـرسـالـه لـيـه؟ `,
            hasMediaAttachment: true,
            imageMessage: (await prepareWAMessageMedia({ image: { url: link } }, { upload: conn.waUploadToServer })).imageMessage
        },
        nativeFlowMessage: {
            buttons: [
                {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                        display_text: '˼📋╿نـسـخ╿📋˹',
                        copy_code: shortLink
                    })
                }
            ],
            messageParamsJson: ''
        }
    };

    // إنشاء الرسالة التفاعلية
    let msg = generateWAMessageFromContent(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage,
            },
        },
    }, { userJid: conn.user.jid, quoted: m });

    // إضافة المرسل ضمن المعلومات
    msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };

    // إرسال الرسالة
    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.help = ['لرابط'];
handler.tags = ['تحويل'];
handler.command = /^(لرابط|تليجراف)$/i;
handler.limit = true;

export default handler;

async function shortUrl(url) {
    try {
        let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`);
        if (!res.ok) throw new Error('Failed to shorten URL');
        return await res.text();
    } catch (e) {
        console.error(e);
        return url; // في حالة الفشل، إرجاع الرابط الأصلي
    }
}
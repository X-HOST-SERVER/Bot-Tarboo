import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
    let text;
    if (args.length >= 1) {
        text = args.slice(0).join(" ");
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text;
    } else return conn.reply(m.chat, "*🧚🏼‍♂️أضف نص علشان أعمل الملصق", m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: wm,
                body: '',
                previewType: 0,
                thumbnail: img.getRandom(),
                sourceUrl: redes.getRandom()
            }
        }
    });

    if (!text) return conn.reply(m.chat, "*🧚🏼‍♂️أضف نص علشان أعمل الملصق*", m, {
        contextInfo: {
            externalAdReply: {
                mediaUrl: null,
                mediaType: 1,
                description: null,
                title: wm,
                body: '',
                previewType: 0,
                thumbnail: img.getRandom(),
                sourceUrl: redes.getRandom()
            }
        }
    });

    const who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    const mentionRegex = new RegExp(`@${who.split('@')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*`, 'g');
    const mishi = text.replace(mentionRegex, '');

    if (mishi.length > 45) return m.reply('*🧚🏼‍♂️ النص مينفعش يكون أكتر من 45 حرف*');

    const pp = await conn.profilePictureUrl(who).catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
    const nombre = await conn.getName(who);
    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": `${who?.name || nombre}`,
                "photo": { url: `${pp}` }
            },
            "text": mishi,
            "replyMessage": {}
        }]
    };

    const json = await axios.post('https://bot.lyo.su/quote/generate', obj, { headers: { 'Content-Type': 'application/json' } });
    const buffer = Buffer.from(json.data.result.image, 'base64');
    let stiker = await sticker(buffer, false, global.packname, global.author);

    if (stiker) return conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true, {
        contextInfo: {
            'forwardingScore': 200,
            'isForwarded': false,
            externalAdReply: {
                showAdAttribution: false,
                title: wm,
                body: `h`,
                mediaType: 2,
                sourceUrl: [nna, nn, md, yt].getRandom(),
                thumbnail: imagen4
            }
        }
    }, { quoted: m });
}

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = /^(ملصق2)$/i;
handler.register = true;

export default handler;
import fetch from 'node-fetch';
import fs from 'fs';
import jimp from 'jimp';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    let wm = '尺月乙月〔😜〕𝑬𝑳 𝑭𝑨𝑮𝑬𝑹';

    // إضافة تفاعل بالرمز 👨‍💻
    await conn.sendMessage(m.chat, { react: { text: '👨‍💻', key: m.key } });

    let fakecontact = { 
        'key': { 
            'participants': '0@s.whatsapp.net', 
            'remoteJid': 'status@broadcast', 
            'fromMe': false, 
            'id': '尺月乙月ル🧧乃〇丁' 
        }, 
        'message': { 
            'contactMessage': { 
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        'participant': '0@s.whatsapp.net' 
    };

    let fakegif = {
        key: { participant: `0@s.whatsapp.net`, ...(m.isGroup ? { remoteJid: m.chat } : {}) },
        message: {
            'videoMessage': {
                'title': '尺月乙月ル🧧乃〇丁',
                'h': `Hmm`,
                'seconds': '99999',
                'gifPlayback': 'true',
                'caption': '尺月乙月ル🧧乃〇丁',
                'jpegThumbnail': false
            }
        }
    };

    let fakelocation = {
        key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
        message: {
            locationMessage: {
                degreesLatitude: 37.7749,
                degreesLongitude: -122.4194,
                name: 'Palestine',
                address: 'San Francisco, CA, USA',
                url: 'https://maps.google.com/?q=37.7749,-122.4194'
            }
        }
    };

    let faketext = {
        key: { fromMe: false, participant: '0@s.whatsapp.net', remoteJid: 'status@broadcast' },
        message: { conversation: 'فلسطين حرة مهما كان الثمن ❤️🧞' }
    };

    let fake = [fakegif, fakecontact, fakelocation, faketext];
    let vn = fake[Math.floor(Math.random() * fake.length)];

    let poster = [
        'https://telegra.ph/file/ba984d78fa802662438ee.jpg',
        'https://telegra.ph/file/0e22282b399e105776618.jpg',
        'https://telegra.ph/file/5e6456d22a8264b08a2bc.jpg',
        'https://telegra.ph/file/996f53288a1e2f4f35812.jpg'
    ];
    
    let vn2 = poster[Math.floor(Math.random() * poster.length)];

    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    let ftroli = { 
        key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, 
        message: { 
            orderMessage: { 
                itemCount: 2023, 
                status: 1, 
                thumbnail: 'https://i.imgur.com/RbaRjrb.jpeg', 
                surface: 1, 
                message: wm, 
                orderTitle: wm, 
                sellerJid: '0@s.whatsapp.net' 
            } 
        } 
    };

    let name = await conn.getName(who);

    // إرسال الصوت بعد التفاعل 👨‍💻
    await new Promise(res => setTimeout(res, 500)); // تأخير نصف ثانية بعد التفاعل
    await conn.sendMessage(m.chat, { 
        audio: { 
            url: 'https://files.catbox.moe/jq8j8a.mp3'  // رابط الصوت
        }, 
        mimetype: 'audio/mpeg', 
        ptt: false 
    }, { quoted: m });

    await new Promise(res => setTimeout(res, 1000)); // تأخير بسيط قبل إرسال الرسالة التفاعلية

    // إرسال الرسالة التفاعلية
    await conn.sendContact(m.chat, [[`201119857886` + `@s.whatsapp.net`, wm]], vn, {
        contextInfo: { 
            forwardingScore: 2023,
            isForwarded: false, 
            externalAdReply: {  
                title: '↝|尺月乙月 𝑬𝑳 𝑮𝑨𝑴𝑬𝑫↝|', 
                body: '尺月乙月ル🧧乃〇丁', 
                sourceUrl: 'https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c',
                thumbnail: vn2,
                thumbnailUrl: vn2, 
                mediaType: 1,
                showAdAttribution: true, 
                renderLargerThumbnail: true, 
                mentionedJid: [m.sender]
            }
        }
    }, { quoted: vn });
}

handler.help = ['owner', 'creator'];
handler.tags = ['info'];
handler.command = /^(owner|مطور|المطور)$/i;

export default handler;

async function getBuffer(url) {
    return new Promise(async (resolve, reject) => {
        let buffer;
        await jimp.read(url)
            .then((image) => {
                image.getBuffer(image._originalMime, function (err, res) {
                    buffer = res;
                });
            })
            .catch(reject);
        if (!Buffer.isBuffer(buffer)) reject(false);
        resolve(buffer);
    });
}
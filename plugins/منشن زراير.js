function clockString(ms) {
    let h = Math.floor(ms / 3600000);
    let m = Math.floor((ms % 3600000) / 60000);
    let s = Math.floor((ms % 60000) / 1000);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems }) => {
    let d = new Date(Date.now() + 3600000); // تصحيح التوقيت
    let locale = 'ar';
    let week = d.toLocaleDateString(locale, { weekday: 'long' });
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
    let _uptime = process.uptime() * 1000;
    let uptime = clockString(_uptime);

    // تأكد من وجود المستخدم في قاعدة البيانات
    if (!global.db.data.users[m.sender]) {
        global.db.data.users[m.sender] = {};
    }

    let user = global.db.data.users[m.sender];
    let name = conn.getName(m.sender);
    let { money = 0, joincount = 0, exp = 0, limit = 0, level = 0, role = 'مبتدئ', premiumTime = 0 } = user;
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length;

    let mentionId = m.key.participant || m.key.remoteJid || m.sender;
    let taguser = '@' + (mentionId.split('@')[0] || '');

    await conn.sendMessage(m.chat, { react: { text: '🔥', key: m.key } });

    const zack = 'https://files.catbox.moe/ozvn72.jpg';

    const media = await prepareWAMessageMedia({ image: { url: zack } }, { upload: conn.waUploadToServer });

    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        title: "terbo",
                        hasMediaAttachment: true,
                        ...media
                    },
                    body: {
                        text: `「⚡」↜ مـࢪحـبـا بـك/ي @${mentionId.split('@')[0]}
> ˼🪪˹↜ مــعــلــومــاتــك ↶
┏━╼━━━╃⌬〔⚡️〕⌬╄━━━╾━┓
┇≡ ◡̈⃝⚡️↜ بـريـمـيـوم↞『 ${premiumTime > 0 || isPrems ? 'مــمـ🔱ـيز' : 'عــ🍁ــادي'} 』
┇≡ ◡̈⃝🔥↜ مـــســـتواك↞『 ${level} 』
┇≡ ◡̈⃝⚜️↜ رتـبـتـك↞『 ${role} 』
┇≡ ◡̈⃝📍↜ الـخـبـرة↞『 ${exp} 』
┇≡ ◡̈⃝💎↜ الـمـاس↞『 ${limit} 』
┗━╼━━━╃⌬〔⚡️〕⌬╄━━━╾━┛`,
                        subtitle: "Araab Zack",
                    },
                    contextInfo: {
                        mentionedJid: [m.sender],
                        isForwarded: false,
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: 'single_select',
                                buttonParamsJson: JSON.stringify({
                                    title: '『⚡️┊اومــر الـمنـ⚡️ـشـن┊⚡️』',
                                    sections: [
                                        {
                                            title: '『⚡️┊اخـتـر الـمنـ⚡️ـشـن┊⚡️』',
                                            rows: [
                                                {
                                                    header: '「📍┊الكل┊🐉」',
                                                    title: '『🥷┊منشن الكل┊🔥』\n*⧈─╼━╾╼━┇•⚡️•┇━╾─╼╾─⧈*',
                                                    description: '『🐉┊𝙏𝙀𝙍𝘽𝙊 𝘽𝙊𝙏┊🐉』',
                                                    id: '.tagall'
                                                },
                                                {
                                                    header: '「📍┊الاعضاء┊🐉」',
                                                    title: '『🔥┊منشن الاعضاء┊🥷』\n*⧈─╼━╾╼━┇•⚡️•┇━╾─╼╾─⧈*',
                                                    description: '『🐉┊𝙏𝙀𝙍𝘽𝙊 𝘽𝙊𝙏┊🐉』',
                                                    id: '.الاعضاء'
                                                },
                                                {
                                                    header: '「📍┊المشرفين┊🐉」',
                                                    title: '『🔥┊منشن المشرفين┊🥷』\n*⧈─╼━╾╼━┇•⚡️•┇━╾─╼╾─⧈*',
                                                    description: '『🐉┊𝙏𝙀𝙍𝘽𝙊 𝘽𝙊𝙏┊🐉』',
                                                    id: '.المشرفين'
                                                },
                                                {
                                                    header: '「📍┊مخفي┊🐉」',
                                                    title: '『🔥┊منشن مخفي┊🥷』\n*⧈─╼━╾╼━┇•⚡️•┇━╾─╼╾─⧈*',
                                                    description: '『🐉┊𝙏𝙀𝙍𝘽𝙊 𝘽𝙊𝙏┊🐉』',
                                                    id: '.مخفي'
                                                }
                                            ]
                                        }
                                    ]
                                })
                            }
                        ]
                    }
                }
            }
        }
    }, {});

    // إرسال رسالة صوتية
    await conn.sendMessage(m.chat, {
        audio: {
            url: 'https://files.catbox.moe/jq8j8a.mp3'
        },
        mimetype: 'audio/mpeg',
        ptt: true
    }, { quoted: m });
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['منشن'];

export default handler;
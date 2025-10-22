import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { conn }) => {
    let fake = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: '120363387503112989@g.us',
        },
        message: { conversation: '© ┊𝙏𝙀𝘽𝙍𝙊〔🔥〕𝘽𝙊𝙏┊' },
        participant: '0@s.whatsapp.net',
    };

    let img = 'https://files.catbox.moe/quheip.jpg';
    let message = `
*╭· · • • •  ━┈ ⌬ ⌝🥷⌞ ⌬ ┈━ • • • · ·╮*
*˼♦️˹ ⪦┆اهلا بيك  يــا حب*
*˼🤖˹ ⪦┆لا تقلق شغال 24/24 ساعه*
*˼⚡˹ ⪦┆انا تيربو بوت*
*╰· · • • •  ━┈ ⌬ ⌝🩸⌞ ⌬ ┈━ • • • · ·╯*
> ˼⚠️˹ مــلـاحـــظـــة ⇅ ↶
*╭· · • • •  ━┈ ⌬ ⌝🥷⌞ ⌬ ┈━ • • • · ·╮*
*• ➊ - _يمنع سب البوت = سب المطور_*
*• ➋ - _ممنوع الاسبام بالبوت_*
*• ➌ - _إذا البوت اطرد ما بيدخل تاني_*
*• ❹ - _تابع الاوامر من الازرار_*
*╰· • • •  ━┈ ⌬ ⌝🩸⌞ ⌬ ┈━ • • • · ·╯*`;

    let buttons = [
        { buttonId: `.اوامر`, buttonText: { displayText: '⋄┄〘🥷┆ الـقـائـمـه الـرئـيـسـية┆🩸〙┄⋄' }, type: 1 },
        { buttonId: `.تسجيل`, buttonText: { displayText: '⋄┄〘🥷┆ الــتــســجــيل┆🩸〙┄⋄' }, type: 1 },
        { buttonId: `.المطور`, buttonText: { displayText: '⋄┄〘🥷┆الــمــطــور┆🩸〙┄⋄' }, type: 1 },
    ];

    let buttonMessage = {
        image: { url: img },
        caption: message,
        footer: '© ┊𝙏𝙀𝘽𝙍𝙊〔🔥〕𝘽𝙊𝙏┊',
        buttons,
        headerType: 4, // استخدام `4` لضبط نوع الهيدر عند وجود صورة
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: fake });
};

handler.customPrefix = /^(بوت)$/i;
handler.command = new RegExp("^(بوت)$", "i"); 

export default handler;
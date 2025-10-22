import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
    let fake = {
        key: {
            fromMe: false,
            participant: '0@s.whatsapp.net',
            remoteJid: '120363387503112989@g.us',
        },
        message: {
            conversation: '© ┊𝙏𝙀𝘽𝙍𝙊〔🔥〕𝘽𝙊𝙏┊'
        },
        participant: '0@s.whatsapp.net',
    };

    let img = 'https://files.catbox.moe/kqwo9w.jpg';
    let message = `╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ
*˼♦️˹ ⪦┆مـرحـبـاً بـك يــا عــيــونــي*
*˼🤖˹ ⪦┆لا تقلق شغاله 24/24 ساعه*
*˼⚡˹ ⪦┆انا تيربو بوت*
╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ
> ˼⚠️˹ مــلـاحـــظـــة ⇅ ↶
╮ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╭ـ
*• ➊ - _يمنع سب البوت = سب المطور_*
*• ➋ - _ممنوع الاسبام بالبوت_*
*• ➌ - _إذا البوت اطرد ما بيدخل تاني_*
*• ❹ - _تابع الاوامر من الازرار_*
╯ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ── ⋆⋆ ╰ـ`;

    let buttons = [
        {
            buttonId: `.الاوامر`,
            buttonText: { displayText: '┊🍷⧼الــقــائــمــه الــرئــيــســية⧽🍷┊' },
            type: 1,
        },
        {
            buttonId: `.تسجيل`,
            buttonText: { displayText: '┊🍷⧼الــتــســجــيل الــرئــيــســي⧽🍷┊' },
            type: 1,
        },
        {
            buttonId: `.المطور`,
            buttonText: { displayText: '┊🍷⧼الــمــطــور الــرئــيــســي⧽🍷┊' },
            type: 1,
        },
    ];

    let buttonMessage = {
        image: { url: img },
        caption: message,
        footer: '© ┊𝙏𝙀𝘽𝙍𝙊〔🔥〕𝘽𝙊𝙏┊',
        buttons: buttons,
        headerType: 1,
        viewOnce: true
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: fake });
};

handler.customPrefix = /^(بوت)$/i;
handler.command = new RegExp;

export default handler;
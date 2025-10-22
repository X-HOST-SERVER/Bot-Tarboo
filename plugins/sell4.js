import pkg from '@whiskeysockets/baileys';
const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { react: { text: '🚀', key: m.key } });

    const harley = 'https://telegra.ph/file/b9b4ff9c328cfe440f91f.jpg';

    let messageContent = {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: { title: '尺月乙月ル🧧乃〇丁 ' },
                    body: {
                        text: `━ ╼╃ ⌬〔﷽〕⌬ ╄╾ ━
> 尺月乙月ル🧧乃〇丁
> 〔 الاشتراك البريميام┊ ˼‏ 🚀˹ ↶〕
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
            *尺月乙月ル🧧乃〇丁*
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
╗───¤﹝السعر ↶ 💵﹞
> •┊˹🦈˼┊- 150 جنية مصري
> •┊˹🦈˼┊- روبل بوت ارقام
> •┊˹🦈˼┊- 1500 نقطة دعمكم
╝───────────────¤
╗───¤﹝المميزات ↶ 🚀﹞
> •┊˹🦈˼┊- اشتراك سرفر عام
> •┊˹🦈˼┊- شغال 7/24
> •┊˹🦈˼┊- البوت تحت التطوير
╝───────────────¤
╗───¤﹝طرق الدفع ↶ 💰﹞
> •┊˹🦈˼┊- Payeer
> •┊˹🦈˼┊- VodafoneCash
╝───────────────¤
*ملحوظة : الاشتراك البريميام اي اشتراك سنوي ومعاه خصومات كمان 🚀*
*⋅ ───━ •﹝👑﹞• ━─── ⋅*
> 〔تـوقـيـع┊ ˼‏📜˹ 〕↶
⌠尺月乙月ル🧧乃〇丁⌡
*⋅ ───━ •﹝👑﹞• ━─── ⋅*`,
                        subtitle: "尺月乙月ル🧧乃〇丁"
                    },
                    header: {
                        hasMediaAttachment: true,
                        ...(await prepareWAMessageMedia({ image: { url: harley } }, { upload: conn.waUploadToServer }, { quoted: m }))
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈🚀╎𝐁𝐔𝐘 ˹💰˼ 𝐍𝐎𝐖╎🚀⌋","url":"https://api.whatsapp.com/send?phone=+201119857886","merchant_url":"https://api.whatsapp.com/send?phone=+201119857886"}'
                            },
                            {
                                name: "cta_url",
                                buttonParamsJson: '{"display_text":"⌈📲╎قـنـاة الـمـطـور╎📲⌋","url":"https://whatsapp.com/channel/0029VaxrsAa5kg7EJfR5qU1f","merchant_url":"https://whatsapp.com/channel/0029VaxrsAa5kg7EJfR5qU1f"}'
                            }
                        ]
                    }
                }
            }
        }
    };

    conn.relayMessage(m.chat, messageContent, {});
};

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['مميز', 'ش4', 'اشتراك_مميز', 'بريميام'];

export default handler;

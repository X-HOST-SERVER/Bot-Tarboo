let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;

export async function before(m, { isAdmin, isBotAdmin, participants }) {
    if (m.isBaileys && m.fromMe) return !0;
    if (!m.isGroup) return !1;

    let delet = m.key.participant;
    let bang = m.key.id;
    const user = `@${m.sender.split`@`[0]}`;
    const groupAdmins = participants.filter(p => p.admin);
    let bot = global.db.data.settings[this.user.jid] || {};
    const isGroupLink = linkRegex.exec(m.text);
    const grupo = `https://chat.whatsapp.com`;

    if (isAdmin && m.text.includes(grupo)) {
        return m.reply('*`مش هعرف امسحو انت/ي رول يروحي نزل/ي براحتك🧚‍♀️`!*');
    }

    if (isGroupLink && !isAdmin) { // التعديل هنا
        if (isBotAdmin) {
            const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
            if (m.text.includes(linkThisGroup)) return !0;
        }

        await conn.sendMessage(m.chat, {
            text: `⬣━━━━〘مانع الروابط🥷🩸〙━━━━┏
🐉🔥┇  تم اكتشاف رابط
❐⊹━━━━━『𝑻𝑼𝑹𝑩𝑶』━━━━━⊹❐
🐉❗️┇${user} بص تحت يزماله 
⬣━━━━〘مانع الروابط🥷🩸〙━━━━┗`,
            mentions: [m.sender]
        }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });

        if (!isBotAdmin) {
            return conn.sendMessage(m.chat, {
                text: `*『انا م رول هحذف الينك ازاي🙂؟』*`,
                mentions: [...groupAdmins.map(v => v.id)]
            }, { quoted: m });
        }

        if (isBotAdmin) {
            await conn.sendMessage(m.chat, {
                delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet }
            });

            let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            if (responseb[0].status === "404") return;
        } else if (!bot.restrict) {
            return m.reply('*𝙀𝙡 𝙥𝙧𝙤𝙥𝙞𝙚𝙩𝙖𝙧𝙞𝙤 𝙙𝙚𝙡 𝙗𝙤𝙩 𝙣𝙤 𝙩𝙞𝙚𝙣𝙚 𝙖𝙘𝙩𝙞𝙫𝙖𝙙𝙤 𝙚𝙡 𝙧𝙚𝙨𝙩𝙧𝙞𝙘𝙘𝙞𝙤𝙣 (𝙚𝙣𝙖𝙗𝙡𝙚 𝙧𝙚𝙨𝙩𝙧𝙞𝙘𝙩) 𝙘𝙤𝙣𝙩𝙖𝙘𝙩𝙚 𝙘𝙤𝙣 𝙚𝙡 𝙥𝙖𝙧𝙖 𝙦𝙪𝙚 𝙡𝙤𝙨 𝙝𝙖𝙗𝙞𝙡𝙞𝙩𝙚*');
        }
    }

    return !0;
}
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }

    if (!who) return m.reply(`حدد المستخدم.`);

    let user = global.db.data.users[who];

    switch (command) {
        case 'بان':
            user.banned = true;
            conn.reply(m.chat, '*`❲🔒❳` تم حظر المستخدم @' + who.split`@`[0] + '*\n\n*`⛊ هذا المستخدم ليس له الأذن لاستعمالي الآن`*', m, { mentions: [who] });
            break;

        case 'بانفك':
            user.banned = false;
            conn.reply(m.chat, '*`❲🔓❳` تم إلغاء حظر المستخدم @' + who.split`@`[0] + '*\n\n*`⛊ هذا المستخدم له الأذن لاستعمالي الآن`*', m, { mentions: [who] });
            break;

    }
};

handler.help = ['mban *@user*'];
handler.tags = ['owner'];
handler.command = ['بان', 'بانفك'];
handler.rowner = true;

export default handler;
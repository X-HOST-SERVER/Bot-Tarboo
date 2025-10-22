import axios from 'axios';

let handler = async (m, { conn, usedPrefix, args }) => {
    let target = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
    let user = global.db.data.users[target];
    let username = m.sender ? conn.getName(m.sender) : null;

    if (!user) 
        throw `🟨 المستخدم مش مسجل في قاعدة البيانات`;

    let xpToAdd = args[1] ? parseInt(args[1]) : 1;

    if (isNaN(xpToAdd) || xpToAdd < 1) 
        throw 'من فضلك أدخل كمية صالحة من XP للإضافة. مثال: .darxp @المستخدم 50';

    user.exp += xpToAdd;

    const emojis = ['👍', '👏', '🎉', '💼', '💰'];

    let message = `
━━━━━━━━━━━━━━━━━━━━
🌟 *إضافة XP* 🌟
━━━━━━━━━━━━━━━━━━━━
👤 *المستخدم*: ${username}
💬 *XP المضافة*: ${xpToAdd}
━━━━━━━━━━━━━━━━━━━━
`.trim();

    try {
        const imgUrl = 'https://i.imgur.com/Em0VBOJ.png';
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (e) {
        await conn.reply(m.chat, message, m);
    }

    for (const emoji of emojis) {
        await m.react(emoji);
    }
}

handler.help = ['darxp', 'addxp'];
handler.tags = ['اقتصاد'];
handler.command = ['اقتصاد', 'addxp'];

export default handler;
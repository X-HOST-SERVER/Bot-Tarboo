let handler = async (m, { conn, participants, usedPrefix, command }) => {
    let kickte = `*🤨 فين اللي عاوز تطرده يسطا؟*`
    if (!m.mentionedJid[0] && !m.quoted) return m.reply(kickte, m.chat, { mentions: conn.parseMention(kickte)}) 
    
    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    let owner = '201119857886@s.whatsapp.net'
    let botNumber = conn.user.jid

    if (user === botNumber) return m.reply('*🤖 لا يمكن للبوت طرد نفسه، بتهزر ولا ايه؟ 😂*')
    if (user === owner) {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        return m.reply('*😏 بتحاول تطرد المطور؟ طب خد على دماغك!*')
    }
    if (user === m.sender) return m.reply('*🤔 انت بتهزر؟ بتطرد نفسك ليه؟*')

    await conn.groupParticipantsUpdate(m.chat, [user], 'remove')
    m.reply(`*عندك تاني انا جاهز 🐦✨*`) 
}

handler.help = ['kick @user']
handler.tags = ['group']
handler.command = ['انطر', 'طرد']
handler.admin = true
handler.group = true
handler.botAdmin = true

export default handler
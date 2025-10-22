let handler = async (m, { conn, args, groupMetadata }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false
    else who = m.chat
    if (!who) throw `✳️ من فضلك شاور أو اتكلم على حد معين`
    if (!(who in global.db.data.users)) throw `✳️ المستخدم ده مش موجود في قاعدة بياناتي :c`
    
    let warn = global.db.data.users[who].warn
    if (warn > 0) {
        global.db.data.users[who].warn -= 1
        m.reply(`⚠️ *إزالة تحذير*
        
▢ التحذيرات: *-1*
▢ إجمالي التحذيرات: *${warn - 1}*`)
        m.reply(`✳️ الأدمن شال تحذير منك، التحذيرات بتاعتك بقت *${warn - 1}*`, who)
    } else if (warn == 0) {
        m.reply('✳️ المستخدم ده معندوش أي تحذيرات')
    }
}

handler.help = ['شيل_تحذير @user']
handler.tags = ['group']
handler.command = ['حذف تحذير', 'الغى_تحذير', 'سامح', 'شيل_التنبيه','حذف_انذار', 'حذف_تحذير'] 
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler
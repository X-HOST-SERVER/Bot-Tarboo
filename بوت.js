let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*فين النص؟*`
    try {
        await conn.updateProfileName(text)
        m.reply('*تم التغيير😎*')
    } catch (e) {
        console.log(e)
        throw `*فيه خطأ*`
    }
}
handler.help = ['setbotname <نص>']
handler.tags = ['owner']
handler.command = /^(اسم_البوت)$/i

handler.owner = true

export default handler

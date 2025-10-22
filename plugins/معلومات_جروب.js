let handler = async (m, { conn, participants, groupMetadata }) => {
const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/+18.jpg' 
const { isBanned, autolevelup, antiver, antitoxic, temporal, restrict, stickers, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, antiLink2, modohorny, autosticker, audios, delete: del } = global.db.data.chats[m.chat]

let text = 
`╭━[ اعدادات الجروب ]━⬣
┃
┃ الترحيب ${welcome ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ انتي لينك ${antiLink ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ انتي لينك *2* ${antiLink2 ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الاستيكر ${stickers ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ البوا مؤقت  ${global.db.data.settings[conn.user.jid].temporal ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الاضافه والازالة ${global.db.data.settings[conn.user.jid].restrict ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ المستوي التلقائي ${global.db.data.users[m.sender].autolevelup ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ مكتشف ${detect ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ انتي توكسيك ${antitoxic ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ مضاد الرؤيه ${antiver ? '✅' : '❌'}
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ حذف تلقائي ${global.db.data.chats[m.chat].delete ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الاباحية ${modohorny ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الاستيكر التلقائي ${autosticker ? '✅' : '❌'} 
┃┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
┃ الصوتيات ${audios ? '✅' : '❌'} 
╰━━━━━❰ *𓃠 ${vs}* ❱━━━━⬣
`.trim()
//conn.sendFile(m.chat, pp, 'error.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] }) 
conn.sendHydrated(m.chat, text, wm, pp, md, '𝒕𝒂𝒓𝒃𝒐𝒐', null, null, [
['الاوامر ☘️', '/الاوامر]
], m,)
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(configuración|settings|setting|المكافحة|معلومات-الجروب|configuracion|vezgrupo|gruporesumen|المضاد)$/i
handler.group = true
export default handler
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `*[❗تحذير❗] ادخل مشكلتك و بلاغك*\n\n*مثال:*\n*${usedPrefix + command} مرحباً سيدي تيربو${usedPrefix}كيف اخبارك*`
if (text.length < 10) throw `*[❗تحذير❗] البلاغ لا يقل عن عشرة احرف*`
if (text.length > 1000) throw `*[❗تحذير❗] البلاغ لا يزيد عن الف حرف*`
let teks = `*❒═════[إبلاغ مهم]═════❒*\n*┬*\n*├❧ الرقم:* wa.me/${m.sender.split`@`[0]}\n*┴*\n*┬*\n*├❧ البلاغ:* ${text}\n*┴*`
conn.reply('201119857886@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
conn.reply('@s.whatsapp.net', m.quoted ? teks + m.quoted.text : teks, null, { contextInfo: { mentionedJid: [m.sender] }})
m.reply(`*〔 بلغت المطور يروحي اصبر هيتواصل معاك 🧚‍♀️〕*`)
}
handler.help = ['reporte', 'request'].map(v => v + ' <teks>')
handler.tags = ['info']
handler.command = /^(report|بلاغ|بلغ|ابلاغ|bug|report-owner|reportes)$/i
export default handler
import { randomBytes } from 'crypto'
let handler = async (m, { conn, command, participants, usedPrefix, text }) => {    
let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${conn.user.jid.split('@')[0]}:${conn.user.jid.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" } 
if (!text && !m.quoted) return m.reply('*⚠️ من فضلك أدخل الرسالة اللي عايز تبعتها*')   

let users = participants.map(u => conn.decodeJid(u.id))
let cc2 = text ? m : m.quoted ? await m.getQuotedObj() : false || m
let teks2 = text ? text : cc2.text 
let d = new Date(new Date + 3600000)
let locale = 'ar-EG' // تغيير اللغة إلى العربية
let dia = d.toLocaleDateString(locale, { weekday: 'long' })
let fecha = d.toLocaleDateString(locale, { day: 'numeric', month: 'numeric', year: 'numeric' })
//let mes = d.toLocaleDateString(locale, { month: 'long' })
//let año = d.toLocaleDateString(locale, { year: 'numeric' })
let tiempo = d.toLocaleString(locale, { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
let groups = Object.keys(await conn.groupFetchAllParticipating())
let usersTag = participants.map(u => conn.decodeJid(u.id))
let readMS = String.fromCharCode(8206).repeat(850)
await m.reply(`*جاري إرسال الرسالة الرسمية، من فضلك انتظر...*`) 
for (let i = 0; i < groups.length; i++) {
const id = groups[i];
//const infoGP = `رسالة رسمية، ${dia}, ${fecha}, ${tiempo}`
const delay = i * 4000 //4 ثواني
setTimeout(async () => { 
await conn.sendMessage(id, { text: `✅ *بيان رسمي* ✅\n\n` + teks2, mentions: [m.sender], mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak }) 
//await conn.reply(id, infoGP + teks2, { mentions: (await conn.groupMetadata(id)).participants.map(v => v.id) }, { quoted: fkontak });
}, delay)}         
let totalGP = groups.length
await m.reply(`✅ تم إرسال الرسالة إلى ${groups.length} مجموعة/مجموعات*\n\n*ملحوظة: من الممكن أن يحدث بعض الأخطاء في هذا الأمر وأنه لن يتم الإرسال لجميع المحادثات، نأسف لذلك.*`)
}     
handler.help = ['broadcastgroup', 'bcgc'].map(v => v + ' <نص>')
handler.tags = ['owner']
handler.command = /^(نشر2|bc)(group|grup|gc)$/i
handler.owner = true
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const delay = time => new Promise(res => setTimeout(res, time))

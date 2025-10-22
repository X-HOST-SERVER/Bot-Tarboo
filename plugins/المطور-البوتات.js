import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import ws from 'ws'

async function handler(m, { conn, usedPrefix, command }) {
    // تحديد المسارات
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const carpetaBase = path.resolve(__dirname, '..', 'jadibts)
    
    // حساب عدد المجلدات
    const cantidadCarpetas = fs.existsSync(carpetaBase) 
        ? fs.readdirSync(carpetaBase, { withFileTypes: true }).filter(item => item.isDirectory()).length 
        : 0

    // تحديد الأجهزة المتصلة
    let _uptime = process.uptime() * 1000
    let uptime = convertirMs(_uptime)
    
    const users = [...new Set([...global.conns.filter(conn => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)])]

    const message = users.map((v, index) => `👤 \`[${index + 1}]\` *${v.user.name || global.db.data.users[v.user.jid]?.name || 'Anónimo'}*
⏱️ \`\`\`${v.uptime ? convertirMs(Date.now() - v.uptime) : "Desconocido"}\`\`\`
🐈 wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}serbot+code`).join('\n\n∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵ ∵\n\n')

    const replyMessage = message.length === 0 
        ? `*NO HAY SUB BOTS DISPONIBLE. VERIFIQUE MÁS TARDE.*\n🐈 wa.me/${conn.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}تنصيب` 
        : message

    const totalUsers = users.length
    const responseMessage = `☄️ *قائمة الروبوتات الفرعية ${vsJB}*\n
\`أصبح بوتًا فرعيًا من بين الروبوتات الفرعية الأخرى!\`\n
🔄 *الاتصال التلقائي*
✨ *قـنـاتـنـا:* 
_${canal1}_

${totalUsers ? `💠 *الروبوتات المتصلة:* ${totalUsers}\n` : ''}${cantidadCarpetas ? `📁 *تم إنشاء الجلسات:* ${cantidadCarpetas}\n` : ''}${totalUsers ? `📁 *الـجـلـسـات الـنـشـطـة:* ${totalUsers}\n` : ''}💻 *الـتـشـغـيـل:* \`\`\`${uptime}\`\`\`\n\n${replyMessage.trim()}`.trim()

    try { 
        const images = ['https://qu.ax/spUwF.jpeg', 'https://qu.ax/ZfKAD.jpeg', 'https://qu.ax/UKUqX.jpeg']
        const randomImage = images[Math.floor(Math.random() * images.length)]
        await conn.sendMessage(m.chat, { image: { url: randomImage }, caption: responseMessage }, { quoted: m })
    } catch {
        await conn.sendMessage(m.chat, { text: responseMessage }, { quoted: m })
    }
}

handler.command = /^(البوتات|bots|subsbots)$/i
export default handler

function convertirMs(ms) {
    const s = Math.floor(ms / 1000) % 60
    const m = Math.floor(ms / 60000) % 60
    const h = Math.floor(ms / 3600000) % 24
    const d = Math.floor(ms / 86400000)
    return [ d > 0 ? `${d}d` : "", `${h}h`, `${m}m`, `${s}s` ].filter(Boolean).join(" ")
}
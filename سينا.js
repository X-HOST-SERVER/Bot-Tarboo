import { sticker } from '../lib/sticker.js'
import axios from 'axios'

let handler = async (m, { conn, args }) => {
    let text
    if (args.length >= 1) {
        text = args.join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else {
        return m.reply("مثال: تيربو طلقةة الجيزه")
    }

    if (text.length > 30) return m.reply("𝙈𝘼𝙓𝙄𝙈𝙐𝙈 30 𝙋!")

    let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/3387ec330bbd16d82195e.jpg')
    let senderName = await conn.getName(m.sender) || "مستخدم مجهول"

    const obj = {
        "type": "quote",
        "format": "png",
        "backgroundColor": "#000000",
        "width": 512,
        "height": 768,
        "scale": 2,
        "messages": [{
            "entities": [],
            "avatar": true,
            "from": {
                "id": 1,
                "name": senderName,
                "photo": { "url": pp }
            },
            "text": text,
            "replyMessage": {}
        }]
    }

    try {
        const json = await axios.post('https://bot.lyo.su/quote/generate', obj, {
            headers: { 'Content-Type': 'application/json' }
        })
        
        if (!json.data || !json.data.result || !json.data.result.image) {
            return m.reply("حدث خطأ أثناء إنشاء الصورة.")
        }

        const buffer = Buffer.from(json.data.result.image, 'base64')
        let stiker = await sticker(buffer, false, global.packname, global.author)

        if (stiker) {
            return conn.sendFile(m.chat, stiker, 'Quotly.webp', '', m)
        } else {
            return m.reply("فشل في إنشاء الملصق.")
        }
    } catch (error) {
        console.error(error)
        return m.reply("حدث خطأ أثناء الاتصال بالخادم.")
    }
}

handler.help = ['qc']
handler.tags = ['sticker']
handler.command = /^(سينا)$/i

export default handler
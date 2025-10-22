import { addExif } from '../lib/sticker.js'
let handler = async (m, { conn, text }) => {
    if (!m.quoted) throw '👀┇لازم ترد على الاستيكر اللي عايز تضيف عليه اسم الباكدج يامعلم!┇😎'
    let stiker = false
    try {
        let [packname, ...author] = text.split('|')
        author = (author || []).join('|')
        let mime = m.quoted.mimetype || ''
        if (!/webp/.test(mime)) throw '👀┇يا نجم، لازم ترد على استيكر عشان نضيف الاسم!┇😅'
        let img = await m.quoted.download()
        if (!img) throw '📥┇فيه حاجة مش مزبوطة.. حاول تنزل الاستيكر تاني!┇🚨'
        stiker = await addExif(img, packname || '', author || '')
    } catch (e) {
        console.error(e)
        if (Buffer.isBuffer(e)) stiker = e
    } finally {
        if (stiker) {
            conn.sendFile(m.chat, stiker, 'wm.webp', '', m, false, { asSticker: true })
        } else {
            throw '😔┇حصلت غلطة! تأكد انك رديت على استيكر وضفت اسم الباكدج ياعم!┇🚨'
        }
    }
}

handler.help = ['wm <packname>|<author>']
handler.tags = ['sticker']
handler.command = /^حقوق|سرقة$/i
export default handler
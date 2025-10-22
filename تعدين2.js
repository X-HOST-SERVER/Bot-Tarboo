let handler = async (m, { conn, isPrems}) => { 
let fkontak = { 
    "key": { 
        "participants": "0@s.whatsapp.net", 
        "remoteJid": "status@broadcast", 
        "fromMe": false, 
        "id": "Halo" 
    }, 
    "message": { 
        "contactMessage": { 
            "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
        }
    }, 
    "participant": "0@s.whatsapp.net" 
}
let minar = `🌟✨ رائع! لقد حصلت على`
let pp = 'https://us.123rf.com/450wm/emojiimage/emojiimage1802/emojiimage180200332/95468325-mont%C3%B3n-de-piedras-preciosas-diamantes-azules-brillantes-concepto-de-joyas-caras-s%C3%ADmbolo-de-riqueza-d.jpg?ver=6'

let d = Math.floor(Math.random() * 20)
global.db.data.users[m.sender].diamond += d * 1  
let time = global.db.data.users[m.sender].lastdiamantes + 600000
if (new Date - global.db.data.users[m.sender].lastdiamantes < 600000) throw `*⏰ يرجى العودة بعد ${msToTime(time - new Date())} لمتابعة التعدين ⛏️*`  

global.db.data.users[m.sender].lastdiamantes = new Date * 1  

conn.reply(m.chat, `*${minar} ${d} ألماس 💎*`, fkontak, m)
//conn.sendFile(m.chat, pp, 'bot.jpg', minar, m, true, { type: 'conversation', ptt: true, sendEphemeral: true, quoted: fkontak })

}
handler.help = ['minar']
handler.tags = ['rg']
handler.command = ['minar3', 'miming3', 'تعدين2', 'minardiamantes', 'minargemas', 'minardiamante'] 
handler.fail = null
handler.exp = 0
export default handler

function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

hours = (hours < 10) ? "0" + hours : hours
minutes = (minutes < 10) ? "0" + minutes : minutes
seconds = (seconds < 10) ? "0" + seconds : seconds

return minutes + " د و " + seconds + " ث " 
}  

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}

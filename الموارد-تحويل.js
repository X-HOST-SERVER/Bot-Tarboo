const items = [
    'limit', 'exp', 'emerald', 'money', 'potion', 'kyubi', 'wood',
    'rock', 'petFood', 'berlian', 'emerald',
    'diamond', 'gold', 'iron', 'fox',
    'string', 'rock', 'trash', 'mana', 'crystal',
]
let confirmation = {}

async function handler(m, { conn, args, usedPrefix, command }) {
    if (confirmation[m.sender]) return m.reply('estas haciendo una transferencia')
    let user = global.db.data.users[m.sender]
    const item = items.filter(v => v in user && typeof user[v] == 'number')
    
    let lol = `
*❐═━━━═╊⊰🔥⊱╉═━━━═❐*
*❮📌↜مــثــال الاســتــخــدام ❯*
*❂━━═━═╊⊰📍⊱╉═━═━━❂*
*✅↜.تــحــويــل جــرعــة 100 @الــشــخــص*
*❂━━═━═╊⊰🔥⊱╉═━═━━❂*
*❮💱↜تــحــويــل الــعــنــاصــر ❯*
*❐═━━━═╊⊰📍⊱╉═━━━═❐*
*❮💎↜الــمــاس ❯*
*❮💰↜نــقــود ❯*
*❮💵↜دولار ❯*
*❮🪵↜خــشــب ❯*
*❮🪙↜ذهــب ❯*
*❮🔮↜كــريــســتــال ❯*
*❮🪄↜الــمــانــا ❯*
*❮🏺↜جــرعــة ❯*
*❮🗑↜قــمــامــة ❯*
*❮🪨↜حــجــر ❯*
*❮🕸↜خــيــط ❯*
*❮⛓️↜حــديــد ❯*
*❮🦴↜حــيــوان ❯*
*❮🍖↜لــحــم ❯*
*❮♦️↜زمــرد ❯*
*❮🀄️↜نـــادر ❯*
*❮🥈↜قــــضــة ❯*
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
> *𝙱𝚈┇Steven & Naruto*
`.trim()
    
    const type = (args[0] || '').toLowerCase()
    
    let adjustedType = (type === 'دولار') ? 'exp' : (type === 'الماس') ? 'limit' : (type === 'نقود') ? 'money' : (type === 'خشب') ? 'wood' : (type === 'ذهب') ? 'gold' : (type === 'كريستال') ? 'crystal' : (type === 'المانا') ? 'mana' : (type === 'جرعة') ? 'potion' : (type === 'قمامة') ? 'trash' : (type === 'حجر') ? 'rock' : (type === 'خيط') ? 'string' : (type === 'حديد') ? 'iron' : (type === 'حيوان') ? 'fox' : (type === 'زمرد') ? 'emerald' : (type === 'نادر') ? 'kyubi' : (type === 'فضة') ? 'berlian' : type;
    
    if (!item.includes(adjustedType)) return m.reply(lol)
    
    const count = Math.min(Number.MAX_SAFE_INTEGER, Math.max(1, (isNumber(args[1]) ? parseInt(args[1]) : 1))) * 1
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : args[2] ? (args[2].replace(/[@ .+-]/g, '') + '@s.whatsapp.net') : ''
    if (!who) return m.reply(`*ســوي مــنــشــن لــي الــي هــتــحــولــه!!*`)
    if (!(who in global.db.data.users)) return m.reply(`*EL USUARIO ${who} NO SE ENCUENTRA EN MI BASE DE DATOS*`)
    if (user[adjustedType] * 1 < count) return m.reply(`*NO TIENE SUFUCIENTE PARA REALIZAR LA TRANSFERENCIA DE ${adjustedType}*`)
    let mentionedJid = [who]
    let username = conn.getName(who)
    
    let confirm = `
*❐═━━━═╊⊰🔥⊱╉═━━━═❐*
*❮🎴↜مــتــئــكــد مــن الــتــحــويــل؟ ❯*
*✦═━═⊰📍⊱═━═✦* 
💹 *${adjustedType} ${count} الــي ↯*
*✦═━═⊰🔥⊱═━═✦*
*❮⛩↜@${(who || '').replace(/@s\.whatsapp\.net/g, '')} ❯*
*✦═━═⊰📍⊱═━═✦*
*❮⏳↜لـــديــك 60 ثــانــيــة لــلــرد ❯*
*✦═━═⊰🔥⊱═━═✦*
*اجــــب بــي ↯*
*❮🕐↜نــعــم┇لا ❯*
*❐═━━━═╊⊰📍⊱╉═━━━═❐*
> *𝙱𝚈┇⌬ ❛╏❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭_*`.trim()
    
    let c = `${wm}\nلــــــــــــــديــــــــــك 60 ثــــــانــيــة!!`
    await conn.reply(m.chat, confirm, m, { mentions: [who] })
    confirmation[m.sender] = {
        sender: m.sender,
        to: who,
        message: m,
        type: adjustedType,  // استخدام النوع المحوَّل هنا
        count,
        timeout: setTimeout(() => (m.reply('*لــقــد انــتــهــى وقــتــك !!*'), delete confirmation[m.sender]), 60 * 1000)
    }
}

handler.before = async m => {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let { timeout, sender, message, to, type, count } = confirmation[m.sender]
    if (m.id === message.id) return
    let user = global.db.data.users[sender]
    let _user = global.db.data.users[to]
    if (/^لا|no$/i.test(m.text) ) { 
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply('*تــم الــغــاء الــعــمــلــيــة بــنــجــاح*')
    }
    if (/^نعم|si$/i.test(m.text) ) { 
        let previous = user[type] * 1
        let _previous = _user[type] * 1
        user[type] -= count * 1
        _user[type] += count * 1
        if (previous > user[type] * 1 && _previous < _user[type] * 1) m.reply(`*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n*❮☑️↜ تــم الــتــحــويــل بــنــجــاح ❯*\n\n*${type} ${count} الــي ↯*\n*✦═━═⊰🦇⊱═━═✦*\n@${(to || '').replace(/@s\.whatsapp\.net/g, '')}\n*❐═━━━═╊⊰🦇⊱╉═━━━═❐*\n> By Steven 🦇`, null, { mentions: [to] })
        else {
            user[type] = previous
            _user[type] = _previous
            m.reply(`*Error al transferir ${count} ${type} para* *@${(to || '').replace(/@s\.whatsapp\.net/g, '')}*`, null, { mentions: [to] })
        }
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}

handler.help = ['transfer'].map(v => v + ' [tipo] [cantidad] [@tag]')
handler.tags = ['xp']
handler.command = ['تحويل', 'transfer', 'darxp', 'dar', 'enviar', 'transferir'] 
handler.group = true

handler.disabled = false

export default handler

function special(type) {
    let b = type.toLowerCase()
    let special = (['`common`', 'uncoommon', 'mythic', 'legendary', 'pet'].includes(b) ? ' Crate' : '')
    return special
}

function isNumber(x) {
    return !isNaN(x)
}

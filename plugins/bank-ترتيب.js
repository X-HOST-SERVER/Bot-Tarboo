import { areJidsSameUser } from '@whiskeysockets/baileys'

let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return {...value, jid: key}
  })
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('diamond')).sort(sort('diamond'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  let len = args[0] && args[0].length > 0 ? Math.min(50, Math.max(parseInt(args[0]), 9)) : Math.min(9, sortedExp.length)
  let text = `
*🌟 ترتيب المتصدرين*
 
*أعلى ${len} XP* 🧬 
أنت : *${usersExp.indexOf(m.sender) + 1}* من *${usersExp.length}*
${sortedExp.slice(0, len).map(({ jid, exp }, i) => `${i + 1}. ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *XP ${exp}*`).join`\n`}

*أعلى ${len} ألماسات 💎*
أنت : *${usersLim.indexOf(m.sender) + 1}* من *${usersLim.length}*
${sortedLim.slice(0, len).map(({ jid, diamond }, i) => `${i + 1}. ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *ألماسات ${diamond}*`).join`\n`}

*أعلى ${len} مستوى* ⬆️
أنت : *${usersLevel.indexOf(m.sender) + 1}* من *${usersLevel.length}*
${sortedLevel.slice(0, len).map(({ jid, level }, i) => `${i + 1}. ${participants.some(p => areJidsSameUser(jid, p.id)) ? `(${conn.getName(jid)}) wa.me/` : '@'}${jid.split`@`[0]} *مستوى ${level}*`).join`\n`}`.trim()
  conn.reply(m.chat, text, m, {
    mentions: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len)].filter(v => !participants.some(p => areJidsSameUser(v, p.id) )) 
})
 
}
handler.help = ['leaderboard']
handler.tags = ['rg']
handler.command = ['leaderboard', 'lb', 'top','ترتيب','المتصدرين'] 
handler.register = true
export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'
import fs from 'fs'
import moment from 'moment-timezone'
import { promises } from 'fs'
import { join } from 'path'

const time = moment.tz('Egypt').format('HH')
let wib = moment.tz('Egypt').format('HH:mm:ss')

let handler = async (m, { conn, usedPrefix, command }) => {
    let d = new Date(Date.now() + 3600000)
    let locale = 'en'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    // تحديد المستخدم
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    if (!(who in global.db.data.users)) throw `✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي`

    let videoUrl = 'https://telegra.ph/file/381cbc23153d4a979300c.mp4'
    let user = global.db.data.users[who]
    let { name, exp, diamond, lastclaim, registered, regTime, age, level, role, warn } = user
    let { min, xp, max } = xpRange(user.level, global.multiplier)
    let username = conn.getName(who)
    let math = max - xp
    let prem = global.prems.includes(who.split`@`[0])
    let sn = createHash('md5').update(who).digest('hex')
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(850)
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]

    let str = `
*⊜━˼🎤˹ ━╃⌬〔قسم الاصوات〕⌬╄━˼🎧˹┏*
*┇≡ ◡̈⃝🧸↜ ⁩ تفضل القائمة يا  :〔${taguser}〕*
*┇≡ ◡̈⃝🥷↜ قبل كتابة اي امر حط〔.〕*
*┇≡ ◡̈⃝⌚↜ وقـت الـتـشـغـيـل〔${uptime}〕*
*┇≡ ◡̈⃝⏳↜ الـتـوقـيـت〔${date}〕*
*┇≡ ◡̈⃝🥷↜ عـدد الـمـسـتـخـدمـيـن〔${rtotalreg}〕*
*┇≡ ◡̈⃝🗿↜ اسـم الـبوت :〔𝑻𝑼𝑹𝑩𝑶〕*
*┇≡ ◡̈⃝⚙️↜ الـمنـصه〔MEGA〕*
*┗━━━━━━━━━━⬣*
┏━━⊜
『 ❐╎◡̈⃝🎧❯ .عميق 』
『 ❐╎◡̈⃝🎧❯ .منفوخ 』
『 ❐╎◡̈⃝🎧❯ .تخين 』
『 ❐╎◡̈⃝🎧❯ .صاخب 』
『 ❐╎◡̈⃝🎧❯ .سريع 』
『 ❐╎◡̈⃝🎧❯ .رفيع 』
『 ❐╎◡̈⃝🎧❯ .روبوت 』
『 ❐╎◡̈⃝🎧❯ .بطئ 』
『 ❐╎◡̈⃝🎧❯ .ناعم 』
『 ❐╎◡̈⃝🎧❯ .سنجاب 』
  ┗━━━━━━━━━━⬣
`.trim()

    m.react('📢')

    conn.sendMessage(m.chat, {
        video: { url: videoUrl }, caption: str,
        mentions: [m.sender, global.conn.user.jid],
        gifPlayback: true, gifAttribution: 0
    }, { quoted: m })
};

handler.help = ['main']
handler.command = ['ق8']

export default handler

// لتحويل الوقت إلى تنسيق hh:mm:ss
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

// لتحديد رسالة الصباح / المساء
function ucapan() {
    const time = moment.tz('Egypt').format('HH')
    let res = "بداية يوم سعيد ☀️"
    if (time >= 4 && time < 10) {
        res = "صباح الخير 🌄"
    } else if (time >= 10 && time < 15) {
        res = "مساء الخير ☀️"
    } else if (time >= 15 && time < 18) {
        res = "مساء الخير 🌇"
    } else if (time >= 18) {
        res = "مساء الخير 🌙"
    }
    return res
}
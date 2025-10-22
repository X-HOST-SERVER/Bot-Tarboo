import { join } from 'path' 
import { promises } from 'fs'

let handler = async (m, { conn, args, usedPrefix, __dirname }) => {

let imgr = flaaa.getRandom() // لم يتم تعريف flaaa
let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
let user = global.db.data.users[m.sender]

if (user.health >= 100) return m.reply(`> *˼❤️‍🩹˹ الــــصــــحــــة╿↶*\n*╮──────────────────⟢ـ*\n*┇❤️‣ صــحــتــك: ${user.health}*\n*┇❤️‍🩹‣ صــحــتــك مــمــتــلــئــة!*\n*╯──────────────────⟢ـ*\n> *الأوامــر المــتــاحــة╿↶*\n> *• ${usedPrefix}م5 — لـلألـعـاب🕹️*\n> *• ${usedPrefix}هــيــل — ❤️‍🩹 للــعــلاج*`)

const heal = 6 + (user.cat * 4) // لم يتم تعريف user.cat
let count = Math.max(1, Math.min(Number.MAX_SAFE_INTEGER, (isNumber(args[0]) && parseInt(args[0]) || Math.round((90 - user.health) / heal)))) * 1

if (user.potion < count) return m.reply(`
*❐═━━━═╊⊰🔥⊱╉═━━━═❐*
${htki} لا تمتلك الكثير من الجرعات\n\nيجب شراء ${count - user.potion} جرعة 🥤 للتمكن من علاجك\n\n*صحتك:*\n» ${user.health} ❤️\n*الجرعات:*\n» ${user.potion} 🥤\n*❐═━━━═╊⊰📍⊱╉═━━━═❐*\n *يمكنك شـراء الـمـزيـد مـن الـجـرعـات عـن طـريـق الأمـر ╿↶*
> [ .شـراء جـرعـة ]  
> By ⌬ ❛╏❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭*`)

    user.potion -= count * 1 //1 potion = count (1) 
    user.health += heal * count

m.reply(`> *˼❤️‍🩹˹ تـم الـعـلاج بـنـجـاح╿↶*\n*╮──────────────────⟢ـ*\n*┇تــم اســتــخدامــك ${count} جــرعــة 🥤*\n*┇لــلــعــلاج وتــحــســيــن صــحــتــك*\n*╯──────────────────⟢ـ*\n> *صــحــتــك الأن: » ${user.health} ❤️*`)

}

handler.help = ['heal','هيل']
handler.tags = ['rpg']
handler.command = /^(هيل|heal)$/i

export default handler

function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}
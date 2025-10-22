//import db from '../lib/database.js'

let handler = async (m, { conn }) => {

  let hasil = Math.floor(Math.random() * 4000)
  let time = global.db.data.users[m.sender].lastmiming + 14400000
  if (new Date - global.db.data.users[m.sender].lastmiming < 14400000) throw `
╮───────────────────⟢ـ
┆🪙↜ لقد حصلت الذهب بالفعل انتظر ↶
┆⏳↜ ${msToTime(time - new Date())}
╯───────────────────⟢ـ`
  global.db.data.users[m.sender].gold += hasil
  m.reply(`مــنــجــم الــذهــب
╮───────────────────⟢ـ
┆🎗↜ تــم تــجــمــيــع ↶
┆🪙↜ ${hasil} ذهــب
╯───────────────────⟢ـ
> لي معرفة عدد الذهب خاصتك ↶
> اسـتـعـمـل امـر ⌊ .ذهبي ⌉
> © ⌬ ❛╏❬ 𝒃𝒐𝒕 𝒆𝒍 𝒕𝒂𝒓𝒃𝒐𝒐 ❭ 2025`)
  global.db.data.users[m.sender].lastmiming = new Date * 1
}
handler.help = ['amlet']
handler.tags = ['econ']
handler.command = ['منجم الذهب'] 

export default handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + "🕰️ساعات |" + minutes + "💠 دقايق| " + seconds + "🛎️ ثواني |" 
      }

const xppercredit = 2;
let handler = async (m, { conn, command, args }) => {
  let done = '🧬';
  m.react(done)
  let user = global.db.data.users[m.sender]
  let count = command.replace(/^buy|صفقة/i, '')
  count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].gold / xpperexp) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (global.db.data.users[m.sender].gold >= xppercredit * count) {
    global.db.data.users[m.sender].gold -= xppercredit * count
    global.db.data.users[m.sender].exp += count
    conn.reply(m.chat, `
*┌─⊷「▧ مـلاحـظـة الـدفـع 🗒」⊶*
*▢〉🧬‣ الـشـراء : + ${count} خـبـرة*
*▢〉🪙‣ أنـفـق : -${xppercredit * count} ذهــب*
*└──────────────⊷*
*┌───⊷*
*▢〉🧬‣ مـجـمـوع الــخــبــرة الـحـالـي: ${user.exp}*
*▢〉🪙‣ مـجـمـوع الـذهـب الـحـالـي: ${user.gold}*
*└──────────────⊷*`, m)
} else conn.reply(m.chat, `*❎ عـذرًا، لـيـس لـديـك مـا يـكـفـي مـن الــذهــب لـشـراء ${count} 🧬خــبــرة*\n*└──────────────⊷*\n*┌───⊷﹝📜نــصــائــح📜﹞⊷*\n *يـمـكـنـك الـحـصـول عـلـى الــذهــب بـاسـتـخـدام الأوامـر الـمـوجـودة فـي قـائـمـة الألـعـاب والاقـتـصـاد*\n*└──────────────⊷*`, m)
}
handler.help = ['buy', 'buyall']
handler.tags = ['economy']
handler.command = ['صفقة','buy', 'buyall'] 

handler.disabled = false

export default handler
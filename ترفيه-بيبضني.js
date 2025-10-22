let toM = a => '@' + a.split('@')[0]
function handler(m, { groupMetadata }) {
  let ps = groupMetadata.participants.map(v => v.id)
  let a = ps.getRandom()
  let b
  do b = ps.getRandom()
  while (b === a)
  m.reply(`▣──────────────────
│
* 💗✨اكثر واحد هنا بيبيض عليك البيض ده*
▣─❧ ${toM(a)} 
│
▣──────────────────`, null, {
    mentions: [a, b]
  })
}
handler.help = ['بيبضني']
handler.tags = ['fun']
handler.command = ['بضان']
handler.group = true
export default handler

Array.prototype.getRandom = function () {
  return this[Math.floor(Math.random() * this.length)]
}
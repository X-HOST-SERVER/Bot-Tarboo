let handler = async (m, {conn, usedPrefix}) => {
	
let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let user = global.db.data.users[who]
if (!(who in global.db.data.users)) throw `✳️ ᴇʟ ᴜsᴜᴀʀɪᴏ ɴᴏ sᴇ ᴇɴᴄᴜᴇɴᴛʀᴀ ᴇɴ ᴍɪ ʙᴀsᴇ ᴅᴇ ᴅᴀᴛᴏs`
conn.reply(m.chat, `مـرحـبـا بـك يـا ˼@${who.split('@')[0]}˹

> ˼‏🎒˹ مـمـتـلـكـاتـك╿↶  

*┐┈─๋︩︪──๋︩︪─═⊐‹🏦›⊏═─๋︩︪──๋︩︪─┈┌*
*╿الـمـاسـك: ˼${user.limit}˹ 💎*
*╿※┈─๋︩︪──๋︩︪─═─๋︩︪──๋︩︪─┈※*
*╿نـقـاط الـخـبـره: ˼${user.exp}˹ 🔝*
*╿※┈─๋︩︪──๋︩︪─═─๋︩︪──๋︩︪─┈※*
*╿نـقـود مـاي: ˼${user.money}˹ 💵*
*┘┈─๋︩︪──๋︩︪─═⊐‹🏦›⊏═─๋︩︪──๋︩︪─┈└*

> ˼‏🏦˹ الـبـنـك╿↶ 

*┐┈─๋︩︪──๋︩︪─═⊐‹🏦›⊏═─๋︩︪──๋︩︪─┈┌*
*╿لـديـك: ˼${user.banco}˹ الـمـاس 💎*
> داخـل الـبـنـك
*┘┈─๋︩︪──๋︩︪─═⊐‹🏦›⊏═─๋︩︪──๋︩︪─┈└*
> تـسـتـطـيـع شـراء الالـمـاس بـسـتـخـدام
> .شراء (العدد)
${global.gt}`, m, { mentions: [who] })
}
handler.help = ['حسابي']
handler.tags = ['بنك']
handler.command = ['بنك', 'حسابي'] 
handler.register = true

export default handler

let handler = async (m, { conn: natsuki, text }) => {

if (!text) 
  return m.reply('*\`『 هات اسم الجروب الي هعملو 』\`*')
try{
           m.react('⚙️')
m.reply('*\`『 جاري انشاء الجروب... 』\`*')

let natsuki2 = await natsuki.groupCreate(text, [m.sender])
let lik = await natsuki.groupInviteCode(natsuki2.gid)

let invite = 'https://chat.whatsapp.com/' + lik;

m.reply('*\`『 الدعم 』\`* ' + invite)
} catch (e) {

m.reply('*\`『 حدث خطاء 』\`*')
   }
      }
handler.help = ['creargc *<اسم>*']
handler.tags = ['owner']
    handler.command = /^(اعمل جروب|انشاء_جروب|اعمل-جروب)$/
    handler.owner = true
export default handler

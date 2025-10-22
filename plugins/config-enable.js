let handler = async (m, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
const sections = [
{
title: `◥ ツقائمة الخياراتツ ◤`,
rows: [
{title: "✨ | ◥ ツالترحيبツ ◤", description: "تنشيط الترحيب او ايقاف تشغيله", rowId: `${usedPrefix + command} welcome`},
{title: "🌎 | ◥ ツالوضع العامツ ◤", description: "تفعيل البوت ف العام والخاص (الشات - الجروبات) )", rowId: `${usedPrefix + command} public`},
{title: "🥵 | ◥ ツالاباحيةツ ◤", description:" تم حذفها من قبل المطور", rowId: `${usedPrefix + command} modohorny`},
{title: "🔗 | ◥ ツمضاد الروابطツ ◤", description: "مضادات روابط جروبات الواتس", rowId: `${usedPrefix + command} antilink`},   
{title: "🔗 | ◥ ツ2 مضاد الروابطツ ◤", description: "مضادات جميع الروابط", rowId: `${usedPrefix + command} antilink2`},    
{title: "🔎 | ◥ ツتغيراتツ ◤", description: "اشعارات لتغيرات المجموعة", rowId: `${usedPrefix + command} detect`},      
{title: "❗ | ◥ ツتقيدツ ◤", description: "تنشيط او تعطيل الطرد", rowId: `${usedPrefix + command} restrict`},    
{title: "☑️ | ◥ ツالقراءة التلقائيةツ ◤", description: "قراءة النصوص تلقائيا", rowId: `${usedPrefix + command} autoread`},
{title: "🔊 | ◥ ツالصوتツ ◤", description: "اوامر تغير الصوت", rowId: `${usedPrefix + command} audios`},
{title: "👾 | ◥ ツاستيكر تلقائيツ ◤", description: "هتبقي اي حاجه البوت هيبعتها بعد كده استيكر", rowId: `${usedPrefix + command} autosticker`},
{title: "💬 | ◥ ツفقطツ ◤", description: "تنفيذ الاوامر ف الشات الخاص بس", rowId: `${usedPrefix + command} pconly`},
{title: "🏢 | ◥ ツجروبات فقطツ ◤", description: "تنفيذ الاوامر للجروبات بس", rowId: `${usedPrefix + command} gconly`},
{title: "❌ | ◥ ツضد المشاهدةツ ◤", description: "مضاد الرؤيه مره واحده فقط", rowId: `${usedPrefix + command} antiviewonce`},
{title: "📵 | ◥ ツانتي المكالماتツ ◤", description: "مضاد المكالمات", rowId: `${usedPrefix + command} anticall`},
{title: "💬 | ◥ ツمكافحة خاصةツ ◤", description: "البوت هيحظر اي حد هيتكلم معاه ف الخاص", rowId: `${usedPrefix + command} antiprivado`},
{title: "🤬 | ◥ ツانتي توكسيكツ ◤", description: "مضاد التوكسيك", rowId: `${usedPrefix + command} antitoxic`},
{title: "🕸️ | ◥ ツمضاد فيرس تراباツ ◤", description: "تنشيط او تعطيل مضادات الفيروسات", rowId: `${usedPrefix + command} antitraba`},
{title: "👎🏻 | ◥ ツمعاداة الغربツ ◤", description: "طرد الارقام الغربية من الجروب - معطل من قبل المطور", rowId: `${usedPrefix + command} antiarabes`},  
]}, ]
//let name = await conn.getName(m.sender)
const listMessage = {
text: ' ',
footer: `┏━━━━━━━━━━━━━┓









𝑩𝒚 : 尺月乙月ル🧧乃〇丁
┗━━━━━━━━━━━━━┛`,
title: null,
buttonText: "◥ ツاختر من هناツ ◤",
sections }

let isEnable = /true|enable|(turn)?on|تفعيل/i.test(command)
let chat = global.db.data.chats[m.chat]
let user = global.db.data.users[m.sender]
let bot = global.db.data.settings[conn.user.jid] || {}
let type = (args[0] || '').toLowerCase()
let isAll = false, isUser = false
switch (type) {
case 'welcome':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.welcome = isEnable
break
case 'detect':
if (!m.isGroup) {
if (!isOwner) {
global.dfail('group', m, conn)
throw false
}
} else if (!isAdmin) {
global.dfail('admin', m, conn)
throw false
}
chat.detect = isEnable
break
case 'delete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = isEnable
break
case 'antidelete':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.delete = !isEnable
break
case 'public':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['self'] = !isEnable
break
case 'antilink':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink = isEnable
break
case 'antilink2':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiLink2 = isEnable 
break
case 'antiviewonce':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiviewonce = isEnable         
break
case 'autosticker':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.autosticker = isEnable          
break
case 'audios':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.audios = isEnable          
break
case 'restrict':
isAll = true
if (!isOwner) {
global.dfail('owner', m, conn)
throw false
}
bot.restrict = isEnable
break
case 'nyimak':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['nyimak'] = isEnable
break
case 'autoread':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['autoread'] = isEnable
break
case 'pconly':
case 'privateonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['pconly'] = isEnable
break
case 'gconly':
case 'grouponly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['gconly'] = isEnable
break
case 'swonly':
case 'statusonly':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
global.opts['swonly'] = isEnable
break
case 'anticall':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiCall = isEnable
break
case 'antiprivado':
isAll = true
if (!isROwner) {
global.dfail('rowner', m, conn)
throw false
}
bot.antiPrivate = isEnable
break
case 'antitoxic':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiToxic = isEnable
break
case 'antitraba':
if (m.isGroup) {
if (!(isAdmin || isOwner)) {
global.dfail('admin', m, conn)
throw false
}}
chat.antiArab = isEnable  
break
default:
if (!/[01]/.test(command)) return await conn.sendMessage(m.chat, listMessage)
throw false
}
conn.sendButton(m.chat, `🗂️ خيار: ${type} 
🎚️ الحالة: ${isEnable ? 'مفعل' : 'معطل'}
📣 ل: ${isAll ? 'البوت ده' : isUser ? '' : 'الشات ده'}`, author, null, [[`${isEnable ? '✖️ تعطيل ✖️' : '✔️ تنشيط ✔️'}`, `${isEnable ? `#disable ${type}` : `#enable ${type}`}`]], m)}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.command = /^(تفعيل|تعطيل)$/i
export default handler

import { unlinkSync, readFileSync } from 'fs' import { join } from 'path' import { exec } from 'child_process'

let handler = async (m, { conn, args, __dirname, usedPrefix, command }) => { try { m.react("⌛") let q = m.quoted ? m.quoted : m let mime = (q.mimetype || '') let effect

// تحديد التأثيرات الصوتية بناءً على الأمر
if (/bass/.test(command)) effect = '-af equalizer=f=94:width_type=o:width=2:g=30'
if (/blown/.test(command)) effect = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) effect = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) effect = '-af volume=12'
if (/fast/.test(command)) effect = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) effect = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) effect = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) effect = '-filter_complex "areverse"'
if (/robot/.test(command)) effect = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) effect = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) effect = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/squirrel/.test(command)) effect = '-filter:a "atempo=0.5,asetrate=65100"'

if (/audio/.test(mime)) {
  let outputFile = join(__dirname, '../tmp/' + getRandom('.mp3'))
  let inputFile = await q.download(true)

  exec(`ffmpeg -i ${inputFile} ${effect} ${outputFile}`, async (err) => {
    await unlinkSync(inputFile) // حذف الملف الأصلي
    if (err) {
      m.reply("⚠️ حدث خطأ أثناء معالجة الصوت!")
      return
    }
    let buffer = await readFileSync(outputFile)
    conn.sendFile(m.chat, buffer, outputFile, null, m, null, { type: 'audioMessage', ptt: true })
    await unlinkSync(outputFile) // حذف الملف المعدل بعد الإرسال
  })
  m.react("✅")
} else {
  m.reply(`⚡ الرجاء الرد على ملف صوتي أو رسالة صوتية لاستخدام هذا الأمر: *${usedPrefix + command}*`)
}

} catch (e) { m.reply(⚠️ حدث خطأ أثناء تنفيذ الأمر! \n>>> ${e} <<<) console.error(e) } }

handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'squirrel'].map(v => v + ' [audio]') handler.tags = ['effects'] handler.command = /^(bass|blown|deep|earrape|fast|fat|nightcore|reverse|robot|slow|smooth|squirrel)$/i handler.register = true

export default handler

const getRandom = (ext) => ${Math.floor(Math.random() * 10000)}${ext}
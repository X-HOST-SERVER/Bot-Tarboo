const handler = async (m, {conn}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/ar.json`))
  const tradutor = _translate.plugins.fun_reto

  global.bucin = tradutor.texto1;

  conn.reply(m.chat, `*❐┃صيغة غير صالحة┃❗❯*
  *▢* مثال لاستخدام الامر *:*
 *◄ .زخرفه1 abc*

  *▢* الزخرفات المتوفرة *:*
 ◄‏ 1-  𝙰𝙱𝙲
 ◄‏ 2-  𝔸𝔹ℂ
 ◄‏ 3-  𝐀𝐁𝐂
 ◄‏ 4-  𝑨𝑩𝑪
 ◄‏ 5-  𝐴𝐵𝐶
 ◄‏ 6-  𝒜ℬ𝒞
 ◄‏ 7-  𝓐𝓑𝓒
 ◄‏ 8-  ᗩᗷᑕ
 ◄‏ 9-  𝗔𝗕𝗖
 ◄‏ 10-  𝘼𝘽𝘾
 ◄‏ 11- 🇦 🇧 🇨`, m);
};
handler.help = ['reto'];
handler.tags = ['fun'];
handler.command = /^(انواع الزغارف|انواع الزخارف)/i;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
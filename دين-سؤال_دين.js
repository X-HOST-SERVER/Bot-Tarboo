import fs from 'fs';

const timeout = 60000; // مدة اللعبة (60 ثانية)
const poin = 500; // الجائزة

const handler = async (m, { conn, usedPrefix }) => {
  conn.tekateki = conn.tekateki || {}; // التأكد من وجود المتغير
  const id = m.chat;

  // التحقق من وجود لعبة نشطة
  if (id in conn.tekateki) {
    await conn.reply(m.chat, '*❐┃هناك سؤال قيد اللعب بالفعل! انتظر حتى ينتهي.┃❌*', conn.tekateki[id][0]);
    return;
  }

  try {
    // قراءة الأسئلة من الملف
    const tekateki = JSON.parse(fs.readFileSync(`./src/game/dean.json`));
    const json = tekateki[Math.floor(Math.random() * tekateki.length)]; // اختيار سؤال عشوائي

    // إنشاء تلميح الإجابة
    const clue = json.response.replace(/[A-Za-z]/g, '_');

    // صياغة الرسالة
    const caption = `
ⷮ > ˼⚡˹↜ السؤال المطروح↶
> السؤال↜ ˼${json.question}˹ 
╮───────────────────⟢ـ
┆❐↞┇الوقت⏳↞ ⌊${(timeout / 1000).toFixed(2)} ثانية⌉
┆❐↞┇الجائزة💰↞ ⌊${poin} دولار⌉
┆❐↞┇المطورين 🤖↞ ⌊تيربو
╯───────────────────⟢ـ
> تيربو
`.trim();

    // تخزين اللعبة الحالية
    conn.tekateki[id] = [
      await conn.reply(m.chat, caption, m),
      json,
      poin,
      setTimeout(async () => {
        if (conn.tekateki[id]) {
          await conn.reply(
            m.chat,
            `*❮ ⌛ انتهى الوقت ⌛ ❯*\n*❐ الإجابة الصحيحة كانت ✅: ${json.response}*`,
            conn.tekateki[id][0]
          );
          delete conn.tekateki[id]; // حذف البيانات بعد انتهاء اللعبة
        }
      }, timeout),
    ];
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, '*[❗] حدث خطأ أثناء بدء اللعبة. يرجى المحاولة مرة أخرى لاحقًا.*', m);
  }
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(اسلامي|ديني|دين|الاسلام|مسلم)$/i;

export default handler;
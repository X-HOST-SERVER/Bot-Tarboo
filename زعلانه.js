const handler = async (m, { conn, command, text }) => {
  // استخراج اسم الشخص أو منشن الرقم من النص المدخل
  const targetName = text.trim();

  if (!targetName) {
    await conn.sendMessage(m.chat, { text: 'الرجاء كتابة اسم الشخص أو منشن رقمه.' }, { quoted: m });
    return;
  }

  const response = 
    `✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦\n` +
    `${targetName}😂♥️ وينك ياحلوة لساتك زعلانه` +
    `\n✦•━━━━ ∘⊰🔥⊱∘ ━━━━•✦`;

  const hawemod = [
    "⌯ هلا يا رمانه 😹💃",
    "⌯هلا يا رمانه ",
    `⌯ ${targetName} زعلانه`,
    `⌯ ${targetName} زعلانههه`,
    "⌯ مين يراضيها",
    "⌯ هلا مين بيراضيها",
    "⌯ انا براضيها",
    `⌯ ${targetName} الزعلانه`,
    "⌯ ما تزعلي يا حلوه ",
    "⌯ خليكي فرحانه",
    "⌯ بابا اخد عبود",
    "⌯ مشوار وما خدني",
    "⌯ خلي جلبه مسرور ",
    "⌯ وخلاني زعلانه",
    "⌯ وخلاني زعلانهههه",
    `⌯ ${targetName} يا حلوه`,
    "⌯ ليكي هاي الاغنيه",
    "⌯ ما تضلي زعلانه😹💃."
  ];

  const loading = async () => {
    let { key } = await conn.sendMessage(m.chat, { text: `⌯ زعلانه ${targetName}`, mentions: conn.parseMention(response) }, { quoted: m });
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      await conn.sendMessage(m.chat, { text: hawemod[i], edit: key, mentions: conn.parseMention(response) }, { quoted: m });
    }
    await conn.sendMessage(m.chat, { text: response, edit: key, mentions: conn.parseMention(response) }, { quoted: m });
  };

  await loading(); // استخدام await لجعل الدالة تنتظر بشكل صحيح
};

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(زعلانه|زعلانة)$/i;

export default handler;
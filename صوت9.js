let handler = async (m, { conn, usedPrefix, __dirname, text, isPrems }) => {

    const vn = './media/النت خرا.mp3';
    conn.sendPresenceUpdate('recording', m.chat);
    conn.sendMessage(m.chat, {audio: {url: vn}, ptt: true, mimetype: 'audio/mpeg', fileName: `النت خرا.mp3`}, {quoted: m});
};

// دي كلمات المساعدة والأوسمة الخاصة بالأمر
handler.help = ['notification']
handler.tags = ['notification']

// دي الكلمات اللي الكود هيتفاعل معاها
handler.customPrefix = /كسم وي|كسم النت|بيحمل|النت تعبان|النت بطيء|النت مش شغال|النت خرا|النت|الويفاي|we|الداتا|الشبكه/i;
handler.command = new RegExp;

export default handler
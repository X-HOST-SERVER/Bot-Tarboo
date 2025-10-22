import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    usedPrefix,
    command,
    author
}) => {
    await conn.sendMessage(m.chat, {
        react: {
            text: '🔥',
            key: m.key,
        }
    });
    
    let res = await fetch('https://api.waifu.pics/sfw/waifu');
    if (!res.ok) throw await res.text();
    
    let json = await res.json();
    if (!json.url) throw 'Error!';
    
    await conn.sendFile(m.chat, json.url, null, "*𝙱𝙾𝚃 𝚃𝙴𝚁𝙱𝙾 | 🥷🔥)*", m);
    
    // إرسال الزر بعد الصورة
    conn.sendButton(m.chat, `_${command}_`.trim(), author, 'haha', [['〔الي بعدو🐉⚡️〕', `${usedPrefix + command}`]], m);
};

handler.help = ['waifu'];
handler.tags = ['internet'];
handler.command = /^(مراتي)$/i;

export default handler;
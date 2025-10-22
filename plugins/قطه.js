import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    try {
        let res = await fetch('https://cataas.com/cat');
        let img = await res.buffer();
        let caption = `مـيـاووووووووو`;

        await conn.sendMessage(m.chat, {
            image: img,
            caption: caption,
            footer: `${global.gt}`,
            buttons: [
                {
                    buttonId: '.قطه',
                    buttonText: { displayText: '↬⌯الـمــ🔀ــزيـد‹◝' }
                }
            ],
            viewOnce: true
        }, { quoted: m });
    } catch (e) {
        console.log(e);
        throw '*حدث خطأ، حاول مرة أخرى!* ❌';
    }
};

handler.help = ['cat'];
handler.tags = ['fun'];
handler.command = /^قطه|قطة$/i;
handler.fail = null;
handler.money = 25;

export default handler;
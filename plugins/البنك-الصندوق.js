const handler = async (m, { isPrems, conn }) => {
    const time = global.db.data.users[m.sender].lastcofre + 86400000; // 86400000 = 24 ساعة
    if (new Date - global.db.data.users[m.sender].lastcofre < 86400000) 
        throw `🕛 *انت خلاص طلبت الكنز، يرجى الانتظار: *${msToTime(time - new Date())}* عشان تقدر تطلب تاني*`;

    const img = 'https://img.freepik.com/vector-gratis/cofre-monedas-oro-piedras-preciosas-cristales-trofeo_107791-7769.jpg?w=2000';
    const dia = Math.floor(Math.random() * 30);
    const tok = Math.floor(Math.random() * 10);
    const coins = Math.floor(Math.random() * 4000);
    const expp = Math.floor(Math.random() * 5000);

    global.db.data.users[m.sender].limit += dia;
    global.db.data.users[m.sender].money += coins;
    global.db.data.users[m.sender].joincount += tok;
    global.db.data.users[m.sender].exp += expp;

    const texto = `[ 🛒 *انت حصلت على كنز* 🎉 ]

* ${dia} *ألماسات* 💎
* ${tok} *توكنز* 🪙
* ${coins} *عملات* 👾
* ${expp} *تجربة* ⚡`;

    const fkontak = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'remoteJid': 'status@broadcast',
            'fromMe': false,
            'id': 'Halo',
        },
        'message': {
            'contactMessage': {
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
            },
        },
        'participant': '0@s.whatsapp.net',
    };

    await conn.sendButton(m.chat, texto, botname, img, [['🔰 *روح للمنيو* ', `.menu`]], null, null, m);
    global.db.data.users[m.sender].lastcofre = new Date * 1;
};

handler.help = ['daily'];
handler.tags = ['econ'];
handler.command = ['coffer', 'cofre', 'افتح الصندوق', 'cofreabrir'];
handler.level = 9;
handler.register = true;
export default handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function msToTime(duration) {
    const milliseconds = parseInt((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ' *ساعات* ' + minutes + ' *دقائق*';
}
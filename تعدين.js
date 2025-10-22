import axios from 'axios';

function randomGold() {
    let random = Math.random();
    let gold = Math.floor(Math.pow(random, 2) * 10000) + 1000;
    return gold;
}

function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
}

const lastMine = {};
const mineCooldown = 10 * 60 * 1000; // فترة الانتظار للتعدين

let handler = async (m, { conn }) => {
    let userId = m.sender;

    if (lastMine[userId] && Date.now() - lastMine[userId] < mineCooldown) {
        let remainingTime = Math.ceil((lastMine[userId] + mineCooldown - Date.now()) / 1000 / 60);
        return conn.reply(m.chat, `*⏰ يرجى العودة بعد ${msToTime(lastMine[userId] + mineCooldown - Date.now())} لمتابعة التعدين ⛏️*`, m);
    }

    let gold = randomGold();

    let user = global.db.data.users[userId];
    user.credit += gold;

    lastMine[userId] = Date.now();

    let message = `
╭──────┅════┅───────╮
🪙 لقد حصلت على ${gold} من الذهب! 🏞️

رصيدك الحالي هو ${user.credit} من الذهب! 💰

حظًا موفقًا في المرة القادمة! ‹𝟹
    𓆝 𓆟 𓆞 𓆝
╰──────┅════┅─────╯
`;

    const imgUrl = 'https://telegra.ph/file/8d9aa98fc5daef984571a.png';

    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error('فشل تحميل الصورة:', error);
        await conn.reply(m.chat, message, m); // إرسال الرسالة بدون الصورة في حال الفشل
    }

    m.react('⛏️');

    // تحديث بيانات المستخدم
    global.db.data.users[userId].lastMine = Date.now();
    global.db.data.users[userId].credit = user.credit;

    console.log('تم حفظ البيانات بنجاح:', global.db.data);
}

const spacer = '\n'.repeat(10);

const dividingComment = '//'.repeat(20);

const additionalDecoration = `
🌟✨🔮 انا بوت تيم تيربو 🔮✨🌟
`.repeat(3);

const finalDecoration = `
🌟🌟🌟 شكرًا على التعدين معنا 🌟🌟🌟
`.repeat(2);

handler.help = ['تعدين'];
handler.tags = ['اقتصاد'];
handler.command = ['تعدين'];
handler.register = true;
handler.group = true;

export default handler;
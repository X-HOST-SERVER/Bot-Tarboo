import axios from 'axios';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/QeY0qzN.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

const decorLine = '══════════════════════════════════════════';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `🟥 *اختار مبلغ الدهب اللي عاوز تراهن بيه*

*مثال:
${usedPrefix + command} 500*`.trim()
    
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    
    let amount = parseInt(args[0])
    m.react('🎰')
    
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 10000
    
    if (new Date - users.lastslot < 10000) throw `⏳ استنى *${msToTime(time - new Date())}* قبل ما تستخدمها تاني`
    
    if (amount < 500) throw `🟥 *ماينفعش تراهن بأقل من ٥٠٠ دهب*`
    if (amount > 100000) throw `🟥 *ماينفعش تراهن بأكتر من ١٠٠٠٠٠ دهب*`
    if (users.credit < amount) throw `🟥 *معاكش دهب كفاية تراهن بيه*`

    let emojis = ["🕊️", "🦀", "🦎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    
    let end;
    let winMultiplier = 0.5; 

    if (a == b && b == c) {
        let winAmount = amount * winMultiplier; 
        end = `🎊 يا معلم! كسبت ${winAmount} دهب 🎉`
        users.credit += winAmount
    } else if (a == b || a == c || b == c) {
        let winAmount = amount * winMultiplier; 
        end = `🎉 قربت تكسب! جبت ${winAmount} دهب 🎉`
        users.credit += winAmount
    } else {
        end = `خسرت يا نجم! ضاع منك ${amount} دهب 😔`
        users.credit -= amount
    }
    
    users.lastslot = new Date * 1
    
    let str = `
🎰 ┃تـرجـمـونـة┃ 🎰
${decorLine}
${x[0]} : ${y[0]} : ${z[0]}
${x[1]} : ${y[1]} : ${z[1]}
${x[2]} : ${y[2]} : ${z[2]}
${decorLine}
${end}`.trim();
    
    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['slot <amount>']
handler.tags = ['game']
handler.command = ['سلوت'] 
handler.group = true
handler.register = true

export default handler

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60)
    return seconds + " ثانية"
}
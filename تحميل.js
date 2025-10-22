import fetch from 'node-fetch';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    let loadingSticker = '⏳'; 
    let doneSticker = '✅';

    // تحقق من وجود رابط
    if (!args[0]) throw `[⚡]⌯ اســتــخــدام خــاطــئ
⌯ مــثــال :
⌯ .download https://youtube.com/shorts/Jl4ubQ7cqpE?si=0vfaQ5j4uRmprDM4
> ملحوظه » هذا الامر يحمل من جميع مواقع سوشيال ميديا مثل يوتيوب,انستا,تيكتوك,فيسبوك ولخخ`;

    try {
       
        await m.reply(`*⏳ جـارٍ الـعـمـل عـلـى تـنـزيـل الـمـقـطـع... تـمـهـل*`);
        
        const taguser = '@' + m.sender.split("@s.whatsapp.net")[0];
        const apiURL = `https://bk9.fun/download/alldownload?url=${encodeURIComponent(args[0])}`;
        
        const response = await fetch(apiURL);
        const json = await response.json();

       
        if (!json || json.status === false) {
            throw `*❗${json.err || 'حدث خطأ في الاتصال بالـAPI، تحقق من الرابط وأعد المحاولة.'}*`;
        }

        const videoUrl = json.BK9?.high || json.BK9?.low;
        if (!videoUrl) throw `*❗خطاء في الحصول على رابط الفيديو*`;

        
        await conn.sendFile(m.chat, videoUrl, 'video.mp4', `*✅ ها هو طلبك يا ${taguser}*`, m);
        m.react(doneSticker);

    } catch (err) {
        console.error(err);
        m.react('❌');
        await m.reply(`*❗خطأ في التحميل:* ${err.message || 'حدث خطأ غير متوقع، حاول لاحقاً.'}`);
    }
};

handler.command = /^(تحميل)$/i;
export default handler;
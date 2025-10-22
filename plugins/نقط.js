let handler = async (m, { conn }) => {
    let images = [
        'https://telegra.ph/file/0e611ef0f5898f84e06ff.jpg',
        'https://telegra.ph/file/bd87aef51ebbbba4901c8.jpg',
        'https://telegra.ph/file/b9c7242b2ea534c9fea51.jpg',
        'https://telegra.ph/file/9ece2dc7647c5bc552f7a.jpg',
        'https://telegra.ph/file/5a22e9d6a3db8a26c2a8d.jpg',
        'https://telegra.ph/file/5122cb52f3d3e6a15d27d.jpg',
        'https://telegra.ph/file/7d69133c3dae7d2cb988e.jpg',
        'https://telegra.ph/file/7af98c215f23a0c7bfc6a.jpg'
    ];

    let commands = [
        {
            title: "🐉✬⃝╿↫ اوامــر الرومات ↬╿⃝✬🐉",
            content: `> *〚 .الجروب 〛* | *〚 .جروبي 〛*\n> *〚 .معلومات-الجروب 〛* | *〚 .اعدادات 〛*\n> *〚 .لينك 〛* | *〚 .تغير-الاسم 〛*\n> *〚 .تغير-الوصف 〛* | *〚 .تغير-الخلفيه 〛*\n> *〚 .تغيير_اللينك 〛* | *〚 .تغيرالترحيب 〛*\n> *〚 .تغيرالوداع 〛* | *〚 .ضيف 〛*\n> *〚 .دعوه 〛* | *〚 .طرد 〛* | *〚 .شوت 〛*`,
            img: images[0]
        },
        {
            title: "🐉✬⃝╿↫ اوامــر الأﻋـضـاء ↬╿⃝✬🐉",
            content: `> *〚 .ابلاغ 〛* | *〚 .للمطور 〛*\n> *〚 .التفعيل 〛* | *〚 .تعريفي 〛*\n> *〚 .تسجيل 〛* | *〚 .حذف-التسجيل 〛*\n> *〚 .بروفايلي 〛* | *〚 .لينكي 〛*\n> *〚 .اصلح 〛* | *〚 .تصليح 〛* | *〚 .تقييم 〛*`,
            img: images[1]
        },
        {
            title: "🐉✬⃝╿↫ اوامـر الالـعـاب ↬╿⃝✬🐉",
            content: `> *〚 .ألعاب 〛* | *〚 .ثقافة 〛*\n> *〚 .لوجوهات 〛* | *〚 .أحزر 〛*\n> *〚 .ألغاز 〛* | *〚 .إيموجي 〛*\n> *〚 .أنميات 〛* | *〚 .سؤال_أنمي 〛*`,
            img: images[2]
        },
        {
            title: "🐉✬⃝╿↫ اوامــر الـتـسـلـيـة ↬╿⃝✬🐉",
            content: `> *〚 .هل 〛* | *〚 .كومنت 〛*\n> *〚 .تغريده 〛* | *〚 .بايدن 〛*\n> *〚 .جميل 〛* | *〚 .جنس 〛*\n> *〚 .صفع 〛* | *〚 .شاذ 〛* | *〚 .شاذ2 〛*`,
            img: images[3]
        }
    ];

    let buttons = [
        [{ buttonText: { displayText: "❄ ╎الـمــطـور❄" }, urlButton: { displayText: "اتصل بالمطور", url: "https://wa.me/201225655220" } }],
        [{ buttonText: { displayText: "❄ ╎الــقــــناه❄" }, urlButton: { displayText: "قناة البوت", url: "https://whatsapp.com/channel/0029VagKvPX4dTnNxfbTnR45" } }]
    ];

    commands.forEach(async (cmd) => {
        let message = {
            image: { url: cmd.img },
            caption: `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*\n${cmd.title}\n*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*\n${cmd.content}\n*✪┋𝐁𝐘┋❥ 𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓 ┋✪*`,
            footer: "اختر أحد الأوامر من القائمة",
            buttons: buttons,
            headerType: 4
        };
        await conn.sendMessage(m.chat, message);
    });
};

handler.command = ['menu2', 'القائمة'];
export default handler;
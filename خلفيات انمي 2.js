import fetch from 'node-fetch';

const handler = async (m, { conn, command, usedPrefix }) => {
    try {
        // تحقق من وجود مفتاح API
        if (!global.lolkeysapi) {
            throw '❌ يرجى تعيين مفتاح API الخاص بـ lolhuman في `global.lolkeysapi`';
        }

        // تحديد الرابط بناءً على الأمر المستخدم
        const endpoints = {
            'فانرت': 'art',
            'هوسبو': 'husbu',
            'كانا': 'kanna',
            'ميغومين': 'megumin',
            'نيكو': 'neko',
            'شوتا': 'shota',
            'وايف': 'waifu',
            'الينا': 'elaina'
        };

        let endpoint = endpoints[command];
        if (!endpoint) return;

        const url = `https://api.lolhuman.xyz/api/random/${endpoint}?apikey=${global.lolkeysapi}`;
        
        // إرسال رمز ⏳ للإشارة إلى أن الطلب جارٍ
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // جلب الصورة من API
        const response = await fetch(url);
        if (!response.ok) throw '⚠️ حدث خطأ أثناء جلب الصورة!';

        const json = await response.json();
        if (!json || !json.result) throw '❌ فشل في استرجاع البيانات!';

        const imageUrl = json.result;

        // إرسال الصورة مع تعليق
        await conn.sendMessage(m.chat, { 
            image: { url: imageUrl }, 
            caption: '*𝙱𝙾𝚃 𝙴𝙻 𝚃𝙰𝚁𝙱𝙾𝙾 | 🐼❤️*' 
        }, { quoted: m });

        // إرسال رمز ✅ للإشارة إلى نجاح العملية
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

        // زر "التالي" لإعادة الطلب
        const buttons = [
            { buttonId: `${usedPrefix + command}`, buttonText: { displayText: '🔄 التالي 🔄' }, type: 1 }
        ];

        await conn.sendMessage(m.chat, {
            text: `📸 *طلبك:* ${command}`,
            footer: '🤖 BOT EL TARBOO',
            buttons: buttons,
            headerType: 1
        }, { quoted: m });

    } catch (error) {
        console.error('❌ خطأ أثناء جلب الصورة:', error);

        // إرسال رمز ❌ عند حدوث خطأ
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

        // إرسال رسالة خطأ للمستخدم
        await conn.sendMessage(m.chat, { 
            text: '⚠️ حدث خطأ أثناء محاولة جلب الصورة. يرجى المحاولة مرة أخرى لاحقًا.', 
            quoted: m 
        });
    }
};

// تعريف الأوامر التي يستجيب لها هذا المعالج
handler.command = /^(فانرت|هوسبو|كانا|ميغومين|نيكو|شوتا|وايف|الينا)$/i;
handler.tags = ['anime'];
handler.help = ['فانرت', 'هوسبو', 'كانا', 'ميغومين', 'نيكو', 'شوتا', 'وايف', 'الينا'];
handler.limit = true;

export default handler;
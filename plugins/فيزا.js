import fetch from 'node-fetch';

let handler = async function (m, { text }) {
    if (!text) {
        return m.reply('❌ يرجى إدخال رقم BIN للتحقق.');
    }

    const apiUrl = `https://bin-api.vercel.app/api/${text}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            return m.reply('⚠️ عذرًا، لا يمكن الوصول إلى الخدمة حاليًا.');
        }

        const data = await response.json();

        if (!data.valid) {
            return m.reply('❌ رقم BIN غير صالح أو غير متوفر في قاعدة البيانات.');
        }

        const resultMessage = `
📇| رقم BIN: ${text}
💳| نوع البطاقة: ${data.scheme || 'غير متوفر'}
🏧| التصنيف: ${data.type || 'غير متوفر'}
🌍| الدولة: ${data.country?.name || 'غير متوفر'}
🏁| العلم: ${data.country?.emoji || '🚩'}
🏦| البنك: ${data.bank?.name || 'غير متوفر'}
        `.trim();

        m.reply(resultMessage);
    } catch (error) {
        console.error('خطأ:', error);
        m.reply('❌ حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.');
    }
};

handler.command = /^(فيزا|بطاقة|card)$/i;

export default handler;
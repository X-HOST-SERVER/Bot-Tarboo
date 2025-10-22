/*
بيرستر البوت https://whatsapp.com/channel/0029VaJxI9uJkK7BedTH0D11
*/
import { exec } from 'child_process';

let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return conn.reply(m.chat, '⚠️ هذا الأمر متاح فقط للمطور.', m);
    
    conn.reply(m.chat, '♻️ *جارٍ إعادة تشغيل السيرفر...*', m).then(() => {
        exec('kill 1', (err) => {
            if (err) {
                conn.reply(m.chat, '❌ فشل إعادة التشغيل.', m);
                console.error(err);
            }
        });
    });
};

handler.command = ['ريستارت', 'restart'];
handler.owner = true;

export default handler;
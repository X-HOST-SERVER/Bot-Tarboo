import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) {
        conn.reply(m.chat, '`🚩 هذا الأمر مخصص للمالك فقط`', m);
        return;
    }

    let botFolder = './jadibts;

    if (fs.existsSync(botFolder)) {
        // قراءة جميع المجلدات الفرعية داخل `GataJadiBot`
        let subBots = fs.readdirSync(botFolder);
        
        if (subBots.length === 0) {
            conn.reply(m.chat, '*❕ لا يوجد أي بوت فرعي ليتم حذفه*', m);
            return;
        }

        for (let folder of subBots) {
            let folderPath = path.join(botFolder, folder);
            try {
                fs.rmSync(folderPath, { recursive: true, force: true });
            } catch (err) {
                console.error(`❌ خطأ في حذف المجلد: ${folderPath}`, err);
            }
        }
    }

    if (global.conns && global.conns.length > 0) {
        for (let connBot of global.conns) {
            try {
                connBot.ws.close();
                connBot.ev.removeAllListeners();
            } catch (err) {
                console.error('❌ خطأ في إيقاف بوت فرعي:', err);
            }
        }
        global.conns = [];
    }

    conn.reply(m.chat, '`✅ تم حذف جميع البوتات الفرعية وإيقاف تشغيلها بنجاح`', m);
};

handler.command = ['وقف البوتات']; 
export default handler;
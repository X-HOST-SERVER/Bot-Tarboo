let handler = async (m, { conn, args, isOwner, isROwner }) => {
    if (!isOwner && !isROwner) {
        conn.reply(m.chat, '🚩 هذا الأمر مخصص للمالك فقط.', m);
        return;
    }

    let chatId = conn.user.jid; 
    if (!global.db.data.settings[chatId]) global.db.data.settings[chatId] = {};

    if (args[0] === "تفعيل") {
        global.db.data.settings[chatId].jadibotmd = true;
        conn.reply(m.chat, '✅ تم *تفعيل* تنصيب البوت الفرعي.', m);
    } else if (args[0] === "توقف") {
        global.db.data.settings[chatId].jadibotmd = false;
        conn.reply(m.chat, '🚫 تم *تعطيل* تنصيب البوت الفرعي.', m);
    } else {
        conn.reply(m.chat, '❕ استخدم الأمر بهذه الطريقة:\n\n✅ *تشغيل:* `.التنصيب on`\n🚫 *إيقاف:* `.التنصيب off`', m);
    }
};

handler.command = ['التنصيب']; 
export default handler;
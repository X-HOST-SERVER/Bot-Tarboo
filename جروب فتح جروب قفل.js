let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = {
        'فتح': 'not_announcement',
        'قفل': 'announcement',
    }[args[0] || ''];

    if (isClose === undefined) {
        return conn.sendMessage(m.chat, {
            text: '‹🔓◝ اختر خياراً لفتح أو قفل الجروب ↬🔒⌯',
            footer: wm,
            buttons: [
                {
                    buttonId: `${usedPrefix + command} فتح`,
                    buttonText: { displayText: '‹◝ فتح الجروب ↬⌯' },
                    type: 1
                },
                {
                    buttonId: `${usedPrefix + command} قفل`,
                    buttonText: { displayText: '‹◝ قفل الجروب ↬⌯' },
                    type: 1
                }
            ],
            viewOnce: true,
            headerType: 1,
        }, { quoted: m });
    }

    // التأكد أن الأمر يستخدم في مجموعة
    if (!m.isGroup) return conn.reply(m.chat, '❌ هذا الأمر يعمل فقط في المجموعات!', m);

    // التأكد أن البوت مشرف قبل تنفيذ العملية
    let groupMetadata = await conn.groupMetadata(m.chat);
    let botNumber = conn.user.jid;
    let botAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;
    
    if (!botAdmin) return conn.reply(m.chat, '❌ يجب أن يكون البوت مشرفًا لتنفيذ هذا الأمر!', m);

    // تنفيذ الأمر لتحديث إعدادات الجروب
    await conn.groupSettingUpdate(m.chat, isClose);
    conn.reply(m.chat, `✅ تم ${args[0] === 'فتح' ? 'فتح' : 'قفل'} الجروب بنجاح!`, m);
}

handler.command = ['جروب', 'group'];
handler.register = true
export default handler;
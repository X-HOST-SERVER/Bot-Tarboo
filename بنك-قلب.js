let handler = async (m, { conn, args }) => {
    let targetId = args[0] ? args[0] + "@s.whatsapp.net" : null;
    let sender = m.sender;

    if (!targetId) return m.reply("❌ *يجب عليك تحديد الشخص!* مثال: .قلب 20123456789");

    if (targetId === sender) return m.reply("*˼❌˹ لـا يـمـكـنـك اعـطـاء قـلـب لـنـفـسـك.*");

    let user = global.db.data.users[targetId];
    let senderUser = global.db.data.users[sender];

    if (!user) return m.reply("❌ *هذا المستخدم غير مسجل!*");

    user.receivedHearts = user.receivedHearts || {};
    
    if (user.receivedHearts[sender]) return m.reply("*˼☑️˹لـقـد وضـعـت قـلـب لـهـذا الـشـخـص مـن قـبـل.*");

    user.hearts = (user.hearts || 0) + 1;
    user.receivedHearts[sender] = true;

    conn.sendMessage(m.chat, { text: `❤️ *${conn.getName(sender)} أرسل قلبًا إلى ${conn.getName(targetId)}!*` }, { quoted: m });
};

handler.command = ['قلب'];
export default handler;
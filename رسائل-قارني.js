let handler = async (m, { conn }) => {
    if (!global.groupData) global.groupData = {};
    const chatId = m.chat;
    if (!global.groupData[chatId]) global.groupData[chatId] = {};

    const groupUsers = global.groupData[chatId];

    let user1 = m.sender; // الشخص الذي استخدم الأمر
    let user2 = m.mentionedJid[0] || (m.quoted ? m.quoted.sender : null); // الشخص الذي تم منشنه أو الرد عليه

    if (!user2) {
        return m.reply('❌ *الرجاء منشن شخص للمقارنة معه أو الرد على رسالته.*');
    }

    // تسجيل الأشخاص في قاعدة البيانات إذا لم يكونوا مسجلين
    if (!groupUsers[user1]) groupUsers[user1] = { messagesSent: 0 };
    if (!groupUsers[user2]) groupUsers[user2] = { messagesSent: 0 };

    let name1 = await conn.getName(user1);
    let name2 = await conn.getName(user2);

    let msgCount1 = groupUsers[user1].messagesSent;
    let msgCount2 = groupUsers[user2].messagesSent;

    let diff = Math.abs(msgCount1 - msgCount2);
    let moreActive = msgCount1 > msgCount2 ? name1 : name2;
    let lessActive = msgCount1 > msgCount2 ? name2 : name1;

    let result = `📊 *مـقـارنـة بـيـن الـرسـائـل* 📊\n\n`;
    result += `📝 *${name1}:* ${msgCount1} رسـالـة\n`;
    result += `📝 *${name2}:* ${msgCount2} رسـالـة\n\n`;

    if (msgCount1 !== msgCount2) {
        result += `📈 *الـاكـثـر ${moreActive} بـفـارق${diff} رسـالـة!* 🎉`;
    } else {
        result += `⚖️ *الـتـعـادل بـيـنـكـمـا!* 🤝`;
    }

    await conn.sendMessage(m.chat, { text: result, mentions: [user1, user2] });
};

// تحديث عدد الرسائل لكل شخص عند إرسال رسالة
handler.all = async (m) => {
    const chatId = m.chat;
    if (!global.groupData) global.groupData = {};
    if (!global.groupData[chatId]) global.groupData[chatId] = {};

    const groupUsers = global.groupData[chatId];

    if (!groupUsers[m.sender]) groupUsers[m.sender] = { messagesSent: 0 };
    if (m.text) groupUsers[m.sender].messagesSent += 1;
};

handler.help = ['مقارنة'];
handler.tags = ['fun'];
handler.command = ['مقارنة', 'قارني'];

export default handler;
let handler = async (m, { conn, text, participants, isAdmin, isOwner, groupMetadata, args, command }) => {
    if (!isAdmin && !isOwner) {
        global.dfail('admin', m, conn);
        throw false;
    }

    let admins = participants.filter(u => u.admin !== null).map(u => u.id);
    let members = participants.filter(u => u.admin === null && !admins.includes(u.id)).map(u => u.id);

    let groupLang = groupMetadata.lang || 'ar';
    let translations = {
        en: {
            mention: "📣 Group Mention",
            adminsTitle: "👑 Admins",
            membersTitle: "👥 Members",
            ownersTitle: "👑 Owners",
            totalMembers: "Total Members",
            triggeredBy: "Triggered by",
            date: "Date & Time",
            message: "Message",
        },
        ar: {
            mention: "📣 منشن جماعي",
            adminsTitle: "👑 المشرفين",
            membersTitle: "👥 الأعضاء",
            ownersTitle: "👑 المالكين",
            totalMembers: "📊 إجمالي الأعضاء",
            triggeredBy: "🚀 منشن بواسطة",
            date: "📅 التاريخ والوقت",
            message: "✉️ الرسالة",
        }
    };

    let t = translations[groupLang] || translations.en;

    let customMessage = `✉️ الرسالة: ${args.slice(1).join(' ') || 'اجتماع لكل الاعضاء د'}`;
    let now = new Date();

    let datePart = now.toLocaleDateString(groupLang === 'ar' ? 'ar-EG' : 'en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    let timePart = now.toLocaleTimeString(groupLang === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: true
    });

    // منشن الأعضاء فقط
    let targetParticipants = members;

    if (!global.lastMentionTime) global.lastMentionTime = {};
    if (global.lastMentionTime[m.chat] && (new Date() - global.lastMentionTime[m.chat]) < 10000) {
        conn.reply(m.chat, `🕑 *انتظر قليلًا قبل إرسال منشن جماعي آخر.*`, m);
        return;
    }
    global.lastMentionTime[m.chat] = new Date();

    let mentionPrefix = `❏ ${t.mention} : *${groupMetadata.subject}*`;
    let mentionSuffix = `*✦━━─━━⌠❄️⌡━━─━━✦*-\n*『❄┇𝚃𝙰𝚁𝙱𝙾𝙾-𝙱𝙾𝚃』*`;

    let message = `
${mentionPrefix}
❏ ${t.totalMembers}: *${participants.length}*
❏ 📅 التاريخ: *${datePart}*
❏ 🕰️ الوقت: *${timePart}*
❏ ${customMessage}

*✦━━─━━⌠❄️⌡━━─━━✦*
*⤹✥ ${t.triggeredBy} ✥⤸* @${m.sender.replace(/@.+/, '')}

*✦━━【${t.membersTitle}】━━✦*
${members.map((v, i) => `  ${i + 1}. @${v.replace(/@.+/, '')} │•❈↲`).join('\n')}

${mentionSuffix}`;

    await conn.sendMessage(m.chat, { text: message, mentions: targetParticipants.concat([m.sender]) });

    console.log(`📣 Mentioned ${targetParticipants.length} members by ${m.sender} in group ${groupMetadata.subject} at ${datePart} ${timePart}`);
};

handler.help = ['mentionall <message>'];
handler.tags = ['group'];
handler.command = /^(mentionall|الاعضاء|invocar|tagall|todos)$/i;
handler.admin = true;
handler.group = true;

export default handler;
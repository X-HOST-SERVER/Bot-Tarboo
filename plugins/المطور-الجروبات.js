import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const GROUP_OWNER_ID = '201119857886@s.whatsapp.net';
const GROUP_DEVELOPERS = ['@s.whatsapp.net', '@s.whatsapp.net'];
const imgUrl = 'https://tinyurl.com/29ejlvff';
const handler = async (m, { text, conn, participants, usedPrefix, command }) => {
  if (!text) {
    const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
    const totalGroups = groups.length;

    const rows = await Promise.all(groups.map(async ([jid]) => {
      const groupMetadata = (conn.chats[jid]?.metadata || await conn.groupMetadata(jid).catch(() => ({}))) || {};
      const participants = groupMetadata.participants || [];
      const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
      const isBotAdmin = bot?.admin || false;
      const totalParticipants = participants.length;

      return createGroupRows(conn, jid, isBotAdmin, totalParticipants, usedPrefix, command);
    }));

    const msg = await createInteractiveMessage(m, conn, totalGroups, rows, imgUrl);
    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } else if (text.startsWith('سحب') || text.startsWith('تصفيه') || text.startsWith('مغادرة')) {
    const [action, idgru] = text.split('-');

    let groupMetadata;
    try {
      groupMetadata = await conn.groupMetadata(idgru);
    } catch (e) {
      return conn.sendMessage(m.chat, { text: '⚠️ خطأ في جلب بيانات المجموعة.' }, { quoted: m });
    }

    const owner = groupMetadata.owner;
    const botDevelopers = GROUP_DEVELOPERS;

    if (action === 'اسحب') {
      const participantsToDemote = participants.filter(participant =>
        participant.admin &&
        participant.id !== owner &&
        participant.id !== conn.user.jid &&
        !botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      const developersToPromote = participants.filter(participant =>
        botDevelopers.includes(participant.id) &&
        !participant.admin
      ).map(participant => participant.id);

      if (participantsToDemote.length > 0) {
        await conn.groupParticipantsUpdate(idgru, participantsToDemote, 'demote');
      }

      if (developersToPromote.length > 0) {
        await conn.groupParticipantsUpdate(idgru, developersToPromote, 'promote');
      }

      const cap2 = `تسجيل سحب المجموعة بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى ردها مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap2, mentions: [m.sender] }, { quoted: m });
      await conn.sendMessage(m.chat, { text: '*تم سحب المجموعة بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });

    } else if (action === 'تصفيه') {
      const participantsToKick = participants.filter(participant =>
        participant.id !== owner &&
        participant.id !== conn.user.jid &&
        !botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      const developersToPromote = participants.filter(participant =>
        botDevelopers.includes(participant.id)
      ).map(participant => participant.id);

      await conn.groupParticipantsUpdate(idgru, participantsToKick, 'remove');
      await conn.groupParticipantsUpdate(idgru, developersToPromote, 'promote');

      const cap3 = `تسجيل تصفية المجموعة بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى ردها مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap3, mentions: [m.sender] }, { quoted: m });
      await conn.sendMessage(m.chat, { text: '*تم تصفية المجموعة بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });

    } else if (action === 'مغادرة') {
      const cap2 = `تسجيل خروجي بواسطه مطورى 😪👊🏻\nمطورى : @${m.sender.split('@')[0]} 💡❤️\nشكرا لاستضافتكم لي 🍿❤️\n\n> اطلب من مطورى اضافتي مجددا اذا كنت تريد 😉❤️.`;
      await conn.sendMessage(idgru, { text: cap2, mentions: [m.sender] }, { quoted: m });
      await conn.groupLeave(idgru);
      await conn.sendMessage(m.chat, { text: '*تمت العملية بنجاح ي مطورى 😉❤️*', mentions: [m.sender] }, { quoted: m });
    }
  }
};

handler.help = ['groups', 'grouplist'];
handler.tags = ['info'];
handler.command = ['المجموعات', 'الجروبات'];
handler.owner = true;

export default handler;

const createGroupRows = async (conn, jid, isBotAdmin, totalParticipants, usedPrefix, command) => {
  const groupName = await conn.getName(jid);
  return {
    header: `مجموعة: ${groupName}`,
    title: `البوت ادمن: ${isBotAdmin ? 'نعم' : 'لا'} - المشاركين: ${totalParticipants}`,
    description: 'قائمة خيارات المجموعة',
    id: `${usedPrefix + command} ${jid}`
  };
};

const createInteractiveMessage = async (m, conn, totalGroups, rows, imgUrl) => {
  const mediaMessage = await prepareWAMessageMedia({ image: { url: imgUrl } }, { upload: conn.waUploadToServer });
  const caption = `قائمة المجموعات المشارك بها البوت\nالعدد: ${totalGroups}`;

  return generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: caption },
          footer: { text: wm },
          header: {
            hasMediaAttachment: true,
            imageMessage: mediaMessage.imageMessage
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'قــائــمــة المجـموعـات',
                  sections: [
                    {
                      title: '「 المجـموعـات 」',
                      highlight_label: '🗃️',
                      rows: rows
                    }
                  ]
                })
              }
            ]
          }
        }
      }
    }
  }, { userJid: conn.user.jid, quoted: m });
};
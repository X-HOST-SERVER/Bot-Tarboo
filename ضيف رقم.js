const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';
const { getBinaryNodeChild, getBinaryNodeChildren } = (await import('@whiskeysockets/baileys')).default;

const handler = async (m, { conn, text, participants, args }) => {
  if (!global.db?.data?.settings?.[conn.user.jid]?.restrict) 
    throw "إيه ده؟ إنت عايز تعمل حاجات من غير إذن؟ مش هينفع كده!";
  
  if (!args[0]) throw "يا نجم، لازم تكتبلي الرقم اللي عايز تضيفه، مش ساحر أنا!";

  try {
    const _participants = participants.map(user => user.id);
    
    const users = (await Promise.all(
      text.split(',')
        .map(v => v.replace(/[^0-9]/g, ''))
        .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
        .map(async v => {
          const exists = await conn.onWhatsApp(v + '@s.whatsapp.net');
          return exists[0]?.exists ? v + '@s.whatsapp.net' : null;
        })
    )).filter(Boolean); // إزالة القيم الفارغة

    if (users.length === 0) throw "ولا رقم من اللي بعتتهم متاح على واتساب يا نجم!";

    const response = await conn.query({
      tag: 'iq',
      attrs: { type: 'set', xmlns: 'w:g2', to: m.chat },
      content: users.map(jid => ({
        tag: 'add',
        attrs: {},
        content: [{ tag: 'participant', attrs: { jid } }]
      }))
    });

    const pp = await conn.profilePictureUrl(m.chat).catch(() => null);
    const jpegThumbnail = pp ? await (await fetch(pp)).buffer() : Buffer.alloc(0);
    
    const add = getBinaryNodeChild(response, 'add');
    const participant = getBinaryNodeChildren(add, 'participant');

    for (const user of participant.filter(item => item.attrs.error == 403)) {
      const jid = user.attrs.jid;
      const content = getBinaryNodeChild(user, 'add_request');
      if (!content) continue;

      const invite_code = content.attrs.code;
      const invite_code_exp = content.attrs.expiration;
      const teks = `حاولت أضيف @${jid.split('@')[0]} بس واضح إنه عامل فيها مهم ورافض الانضمام 😂`;
      m.reply(teks, null, { mentions: conn.parseMention(teks) });

      const caption = "اتفضل يا باشا، ده لينك الدعوة، اتمنى تعجبك الضيافة 😄";
      const mediaMessage = await prepareWAMessageMedia({ image: jpegThumbnail }, { upload: conn.waUploadToServer });

      const groupInvite = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
        groupInviteMessage: {
          groupJid: m.chat,
          inviteCode: invite_code,
          inviteExpiration: invite_code_exp,
          groupName: await conn.getName(m.chat),
          caption,
          jpegThumbnail
        }
      }), { userJid: jid });

      await conn.relayMessage(jid, groupInvite.message, { messageId: groupInvite.key.id });
    }
  } catch (e) {
    console.error(e);
    throw "العملية فشلت يا بطل، معلش حاول تاني يمكن الحظ يكون معاك المرة دي! 😅";
  }
};

handler.help = ['add', '+'].map(v => v + ' رقم');
handler.tags = ['group'];
handler.command = /^(اضافة|دخل|هات|ضيف رقم)$/i;
handler.admin = handler.group = handler.botAdmin = true;

export default handler;
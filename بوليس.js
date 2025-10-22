const handler = async (m, {conn}) => {
  const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/lolice', {
    avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/d1e32c48ec245ba4e8943.jpg'),
  }), 'error.png', '*🚔👮🏻‍♂️الان انت محقق*', m);
};
handler.help = ['lolice'];
handler.tags = ['maker'];
handler.command = /^(بوليس)$/i;
export default handler;

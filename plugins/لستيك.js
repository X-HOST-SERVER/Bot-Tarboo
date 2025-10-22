const handler = async (m, {conn, usedPrefix, command}) => {

  if (!m.quoted) throw '*⌗ قـم بـي الـرد عـلـي فـيـديـو لـتـحـويـ♻️ـلـه لـجـيـف*';
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';
  if (!/(mp4)/.test(mime)) throw '*‹⌗ ‹خـطــأ› ⌗›*';
  m.reply(global.wait);
  const media = await q.download();
  conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '⧼☑️┊ تـم تـنـفـيـذ طـلـبـك ┊☑️⧽'}, {quoted: m});
};

handler.command = ['togif', 'غيف', 'لجيف' , 'gif'];
export default handler;
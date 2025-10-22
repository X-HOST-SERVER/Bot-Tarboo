const handler = async (m, {conn, usedPrefix, command}) => {

  if (!m.quoted) throw '*❗الرجاء الرد على فيديو*';
  const q = m.quoted || m;
  const mime = (q.msg || q).mimetype || '';
  if (!/(mp4)/.test(mime)) throw '*⚠️ خطأ*';
  m.reply(global.wait);
  const media = await q.download();
  conn.sendMessage(m.chat, {video: media, gifPlayback: true, caption: '_تم طلبك_'}, {quoted: m});
};

handler.command = ['togif', 'غيف', 'جيف' , 'gif'];
export default handler;
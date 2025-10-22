let handler = async (m, { conn, args }) => {
  if (!args[0]) throw 'نسيت النص الذي تبي تصممه *✦━━━━━━ ✓ ━━━━━━━✦*';

  let response = args.join(' ').split('|');
  let res = `https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=${encodeURIComponent(response[0])}`;

  m.reply('_يرجى الانتظار..._');

  await conn.sendFile(m.chat, res, 'flaming_logo.jpg', `✦┃مفيش شكرا كده ولا حاجه✓┃\n*✦━━━━━━ ✓ ━━━━━━━✦*`, m);
};

handler.help = ['flaming1'].map(v => v + ' <text>');
handler.tags = ['maker', 'logo'];
handler.command = /^(صمم صوره|تصميم1)$/i;

export default handler;
const handler = async (m, { conn, command, text }) => {
  // تأكد إن الرسالة اللي جاية مش من البوت نفسه
  if (m.key.fromMe) return;

  const lovePercentage = Math.floor(Math.random() * 100);
  const isHighLove = lovePercentage >= 50;
  
  const loveMessages = [
    "💝 الحب جواك مليان بزيادة! 😍"
  ];
  
  const notSoHighLoveMessages = [
    "❤️‍🔥 الحب عندك محتاج شوية شحن! 🔋"
  ];

  const loveDescription = isHighLove ? "🔝 حبك طاير في السما! 🚀" : "⚡ حبك محتاج دفعة! 💥";
  
  const getRandomMessage = (messages) => messages[Math.floor(Math.random() * messages.length)];
  
  const loveMessage = isHighLove ? getRandomMessage(loveMessages) : getRandomMessage(notSoHighLoveMessages);
  
  const response = `> *بـحــ❤️ـبك يـمجنـون*`;
  
  async function loading() {
    var hawemod = [
      "اسمع بقى",
      "بصراحة كده...",
      "أنت بتمثللي",
      "أحلى وأجمل",
      "واحد في الكون",
      "مطور بوت التربو",
      "بكل بساطة",
      "بيموت فيك",
      "💜 أنت قمر",
      "🖤 وشكلك كرباج",
      "🤍 وحلوة الدنيا فيك",
      "🤎 وروحي فيك",
      "❤ وبحبك حب الجنون",
      "❤️‍🔥 وقلبي عليك مولع",
      "💖 يا أجمل حب",
      "💓 بحبك حب متين",
      "💘 ربنا يزيدك حلاوة",
      "💝 وتفضل دايما معايا",
      "💞 بحبك بجد يا عمري",
      "*بـحــ❤️ـبك يـمجنـون*"
    ];

    let { key } = await conn.sendMessage(m.chat, {text: `*❮ 🥰 ┇ امـوت فيك ياعـسل انـت*`, mentions: conn.parseMention(response)}, {quoted: m});
    
    for (let i = 0; i < hawemod.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await conn.sendMessage(m.chat, {text: hawemod[i], edit: key, mentions: conn.parseMention(response)}, {quoted: m});
    }
    
    await conn.sendMessage(m.chat, {text: response, edit: key, mentions: conn.parseMention(response)}, {quoted: m});
  }
  
  loading();
};

handler.help = ['love'];
handler.tags = ['fun'];
handler.command = /^(قلب|hrt)$/i;

export default handler;

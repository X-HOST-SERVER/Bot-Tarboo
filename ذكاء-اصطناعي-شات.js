import fetch from 'node-fetch';

let handler = async (m, { text }) => {
  if (!text && !m.quoted?.text) {
    throw 'مـرحـبـا انـا `جـي بـي تـي` مـسـاعـدك الـذكـي، \nانـا هـنـا لـي مـسـاعـدتـك. \n\n> اكـتـب نـص مـعـا اسـتـخـدام الـامـر مـثـال\n> .شات صلي على النبي محمد';
  }
  const prompt = encodeURIComponent(text || m.quoted.text);
  const apiUrl = `https://zeref-gpt.vercel.app/api/chat?gpt=${prompt}`;
  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    let result = data.ZeReF; 
    if (!result) {
      throw 'لـم يـتـم اجـاد اسـتـجـابـه مـن ChatGPT.';
    }
    m.reply(result); 
  } catch (error) {
    console.error('خـطـأ:', error);
    throw 'حـدث خـطـأ أثـنـاء الاتـصـال بـالـ API!';
  }
};
handler.help = ['gpt'];
handler.tags = ['AI'];
handler.command = ['شات', 'بوت', 'ai'];

export default handler;
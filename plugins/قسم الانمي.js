let handler = async (m, { conn, args, usedPrefix, command }) => {
  const tagUser = '@' + m.sender.split("@s.whatsapp.net")[0];

  let uptime = process.uptime(); // وقت التشغيل بالثواني
  let date = new Date().toLocaleDateString('en-US'); // التاريخ الحالي
  let registeredUsersCount = 100; // مثال: تحتاج لجلب العدد من قاعدة بيانات إذا كان لديك نظام تسجيل

  conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: `┏━━⊜ *◡̈⃝˼‏👨🏻‍💻˹ ━━| قسم الأنمي │━━˼👨🏻‍💻˹◡̈⃝*
┇≡ *◡̈⃝🧸📌 تفضل القائمة يا* : *${tagUser}*
┇≡ *◡̈⃝⌚📌 وقت التشغيل:* ${Math.floor(uptime / 60)} دقيقة
┇≡ *◡̈⃝⏳📌 التاريخ:* ${date}
┇≡ *◡̈⃝🕊📌 عدد المستخدمين:* ${registeredUsersCount}
┇≡ *◡̈⃝🧚🏻‍♀️📌 اسم البوت:* 𝑻𝑼𝑹𝑩𝑶🤺🔥
┇≡ *◡̈⃝⚙️📌 المنصة:* replit
┗━━━━━━━━━━⬣`
     },
     body: {
      text: ''
     },
     nativeFlowMessage: {
      buttons: [
       {
        name: 'single_select',
        buttonParamsJson: JSON.stringify({
         title: 'الانمي',
         sections: [
          {
           title: 'الانمي',
           highlight_label: '𝐓𝐀𝐑𝐁𝐎𝐎☞𝐁𝐎𝐓',
           rows: [
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏فانرت', description: '', id: '.فانرت' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏هوسبو', description: '', id: '.هوسبو' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كانا', description: '', id: '.كانا' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ميغومين', description: '', id: '.ميغومين' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏نيكو', description: '', id: '.نيكو' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏شوتا', description: '', id: '.شوتا' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏وايف', description: '', id: '.وايف' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏الينا', description: '', id: '.الينا' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏مراتي', description: '', id: '.مراتي' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏بنت', description: '', id: '.خلفية-بنات' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏وايفو', description: '', id: '.وايفو' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏لولي', description: '', id: '.nsfwloli' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛ولد', description: '', id: '.خلفية-ولاد' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كوسبلاي', description: '', id: '.كوسبلاي' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ساكورا', description: '', id: '.sakura' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ساسكي', description: '', id: '.sasuke' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ساجيري', description: '', id: '.sagiri' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏نيزوكو', description: '', id: '.nezuko' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ناروتو', description: '', id: '.naruto' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ميناتو', description: '', id: '.minato' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ميكو', description: '', id: '.miku' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ميكاسا', description: '', id: '.mikasa' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏مادارا', description: '', id: '.madara' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏جوزو', description: '', id: '.جوزو' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كوترو', description: '', id: '.kotori' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كانيكي', description: '', id: '.keneki' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كاوري', description: '', id: '.kaori' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كاجيرو', description: '', id: '.kagura' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏كاجا', description: '', id: '.kaga' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايتوري', description: '', id: '.itori' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايتاتشي', description: '', id: '.itachi' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايسوزي', description: '', id: '.isuzu' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏اينوري', description: '', id: '.inori' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏هيناتا', description: '', id: '.hinata' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏هيستيا', description: '', id: '.hestia' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايميليا', description: '', id: '.emilia' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايبا', description: '', id: '.eba' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ايرزا', description: '', id: '.erza' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏ديدارا', description: '', id: '.deidara' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏شيتوجي', description: '', id: '.chitoge' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏تشيهو', description: '', id: '.chiho' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏بوروتو', description: '', id: '.brouto' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏أيوزاوا', description: '', id: '.ayuzawa' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏اسونا', description: '', id: '.asuna' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏اناا', description: '', id: '.anna' },
            { header: 'الاديـت و الـصـوره', title: '⌬ ❛╏اكياما', description: '', id: '.akiyama' }
           ]
          }
         ]
        }),
        messageParamsJson: ''
       }
      ]
     }
    }
   }
  }
 }, {})
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['الانمي']

export default handler
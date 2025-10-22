/*
.ارقام-وهمي لعرض الارقام
.الرقم لاختيار رقم مثال .الرقم 2
.تحديث لتحديث الرسائل 
.الغاء-طلب لالغاء طلب الرقم 
*/
import axios from "axios";
import cheerio from "cheerio";

const webUrl = 'https://receive-smss.com/';
const userProgress = {};

const getVirtualNumbers = async () => {
  try {
    const response = await axios.get(webUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const numbers = [];
    
    $('.number-boxes-item').each((index, element) => {
      const number = $(element).find('.number-boxes-itemm-number').text().trim();
      const country = $(element).find('.number-boxes-item-country').text().trim();
      const link = webUrl + $(element).find('a').attr('href');
      numbers.push({ index: index + 1, number, country, link });
    });
    return numbers;
  } catch (error) {
    return [];
  }
};

const getMessages = async (numberUrl) => {
  try {
    const response = await axios.get(numberUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    const messages = [];
    
    $('.row.message_details').each((index, element) => {
      let code = $(element).find('.btn22cp1').attr('data-clipboard-text')?.trim() || $(element).find('.msgg span b').text().trim();
      let messageText = $(element).find('.msgg span').text().trim();
      if (code) messageText = messageText.replace(code, '').trim();
      
      const sender = $(element).find('.senderr a').text().trim();
      const time = $(element).find('.time').text().trim();
      messages.push({ sender, messageText, code, time });
    });
    return messages;
  } catch (error) {
    return [];
  }
};

const handler = async (m, { conn, text, command }) => {
  const chatId = m.chat;
  
  if (command === 'ارقام-وهمي') {
    if (userProgress[chatId]?.selectedNumber) return await m.reply("⚠️ لديك رقم محدد بالفعل، استخدم 'الغاء-طلب' لإلغاء الرقم الحالي.");
    
    await m.reply("⏳ *جاري جلب الأرقام...* 🔄");
    
    try {
      const numbers = await getVirtualNumbers();
      if (!numbers.length) return await m.reply("❌ لم يتم العثور على أرقام وهمية.");
      
      let message = "📱 *الأرقام الوهمية المتاحة:*\n";
      numbers.forEach(num => {
        message += "╭─━──≪📞≫──━─╮\n";
        message += `📞 *رقم:* ${num.number}\n`;
        message += `🌎 *الدولة:* ${num.country}\n`;
        message += `🔗 *الرابط:* ${num.link}\n`;
        message += "╰─━──≪🌍≫──━─╯\n\n";
      });
      message += "💬 *أرسل .الرقم + رقم الاختيار لاختيار رقم معين.*";
      
      userProgress[chatId] = { numbers, selectedNumber: null };
      await m.reply(message);
    } catch (error) {
      await m.reply("⚠️ حدث خطأ أثناء جلب الأرقام.");
    }
    return;
  }
  
  if (command === 'الرقم') {
    if (!text || isNaN(text)) return await m.reply("⚠️ اختر رقمًا صحيحًا من القائمة.");
    let num = parseInt(text);
    let numberData = userProgress[chatId]?.numbers?.find(a => a.index === num);
    if (!numberData) return await m.reply("❌ لم يتم العثور على الرقم المطلوب.");
    
    userProgress[chatId].selectedNumber = numberData;
    await m.reply(`✅ *تم اختيار الرقم:* ${numberData.number}\n📬 *جاري جلب الرسائل...* 🔄`);
    
    const messages = await getMessages(numberData.link);
    if (!messages.length) return await m.reply("📭 لا توجد رسائل لهذا الرقم حتى الآن.");
    
    let replyMsg = `📨 *الرسائل المستلمة لرقم ${numberData.number}:*\n`;
    messages.forEach(msg => {
      replyMsg += "╭─━──≪📩≫──━─╮\n";
      replyMsg += `✉️ *من:* ${msg.sender}\n`;
      replyMsg += `📩 *الرسالة:* ${msg.messageText}\n`;
      replyMsg += `🔢 *الكود:* ${msg.code}\n`;
      replyMsg += `⏳ *الوقت:* ${msg.time}\n`;
      replyMsg += "╰─━──≪📜≫──━─╯\n\n";
    });
    
    await m.reply(replyMsg);
    return;
  }
  
  if (command === 'تحديث') {
    let selectedNumber = userProgress[chatId]?.selectedNumber;
    if (!selectedNumber) return await m.reply("⚠️ لم يتم اختيار رقم بعد. استخدم 'ارقام-وهمي' لاختيار رقم.");
    
    await m.reply("⏳ *جارٍ تحديث الرسائل...* 🔄");
    const messages = await getMessages(selectedNumber.link);
    if (!messages.length) return await m.reply("📭 لا توجد رسائل جديدة لهذا الرقم.");
    
    let replyMsg = `📨 *تم تحديث الرسائل لرقم ${selectedNumber.number}:*\n`;
    messages.forEach(msg => {
      replyMsg += "╭─━──≪📩≫──━─╮\n";
      replyMsg += `✉️ *من:* ${msg.sender}\n`;
      replyMsg += `📩 *الرسالة:* ${msg.messageText}\n`;
      replyMsg += `🔢 *الكود:* ${msg.code}\n`;
      replyMsg += `⏳ *الوقت:* ${msg.time}\n`;
      replyMsg += "╰─━──≪📜≫──━─╯\n\n";
    });
    
    await m.reply(replyMsg);
    return;
  }
  
  if (command === 'الغاء-طلب') {
    if (!userProgress[chatId]?.selectedNumber) return await m.reply("⚠️ لا يوجد رقم محفوظ لإلغائه.");
    
    delete userProgress[chatId].selectedNumber;
    await m.reply("✅ تم إلغاء تحديد الرقم، يمكنك اختيار رقم جديد الآن.");
    return;
  }
};

handler.help = ['ارقام-وهمي', 'الرقم', 'تحديث', 'الغاء-طلب'];
handler.tags = ['tools'];
handler.command = /^(ارقام-وهمي|الرقم|تحديث|الغاء-طلب)$/i;

export default handler;
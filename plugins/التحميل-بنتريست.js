import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys")).default;

let handler = async (message, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(message.chat, "[❗] *فين النص اللي هتبحث عنو ي حوب*", message);
  }

  try {
    // استدعاء واجهة Pinterest API
    let { data } = await axios.get(`https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(text)}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${encodeURIComponent(text)}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`);

    // استخراج روابط الصور
    let imageUrls = data.resource_response.data.results.map(result => result.images.orig.url);
    shuffleArray(imageUrls);

    // اختيار أول 10 صور فقط
    let selectedImages = imageUrls.slice(0, 10);

    let results = [];
    for (let i = 0; i < selectedImages.length; i++) {
      let imageUrl = selectedImages[i];
      let imageMessage = await generateImageMessage(imageUrl);

      results.push({
        body: proto.Message.InteractiveMessage.Body.fromObject({
          text: `★ 🧁╿ الـصـوره ـــ ˼${i + 1}˹`
        }),
        footer: proto.Message.InteractiveMessage.Footer.fromObject({
          text: "ان تـحـمـل كـل ذنـوبـك\n𝙼𝙰𝙸 𝙰𝙸 ²⁰²⁵"
        }),
        header: proto.Message.InteractiveMessage.Header.fromObject({
          title: '',
          hasMediaAttachment: true,
          imageMessage
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          buttons: [
          {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "ღقـنـاتـنـا",                   
                                    url: "https://whatsapp.com/channel/0029VauZzgL9Gv7X7LxtC73R",
                                    merchant_url: "https://whatsapp.com/channel/0029VauZzgL9Gv7X7LxtC73R"
              })
            }
          ]
        })
      });
    }

    const messageContent = generateWAMessageFromContent(message.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage: proto.Message.InteractiveMessage.fromObject({
            body: proto.Message.InteractiveMessage.Body.create({
              text: `*⚝  💭 ┊ نـتـائـج الـبـحـث ↯*\n*⚝┈─๋︩︪──๋︩︪─═⊐‹🧁›⊏═─๋︩︪──๋︩︪─┈⚝*\n*⚝ 🧐 ┊لـ ${text}*`
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: ""
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              hasMediaAttachment: false
            }),
            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              cards: results
            })
          })
        }
      }
    }, {
      quoted: message
    });

    await conn.relayMessage(message.chat, messageContent.message, { messageId: messageContent.key.id });

  } catch (error) {
    console.error(error);
    conn.reply(message.chat, "[❗] حدث خطأ أثناء البحث. حاول مرة أخرى لاحقًا.", message);
  }
};

// إعادة تعريف المساعدات والتعليمات
handler.help = ["pinterest"];
handler.tags = ["downloader"];
handler.command = /^(بين|بنتريست|بينتريست)$/i;

export default handler;

// وظيفة عشوائية لتبديل ترتيب العناصر في المصفوفة
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// وظيفة لتوليد رسالة صورة
async function generateImageMessage(url) {
  const { imageMessage } = await generateWAMessageContent({ image: { url } }, { upload: conn.waUploadToServer });
  return imageMessage;
}

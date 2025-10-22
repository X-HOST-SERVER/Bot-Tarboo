import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

var handler = async (m, { conn, usedPrefix }) => {
  const gameQuestions = [
    "مدينة بحرف ⤌ ر",
    "مدينة بحرف ⤌ ع",
    "حيوان ونبات بحرف ⤌ خ",
    "اسم بحرف ⤌ ح",
    "اسم ونبات بحرف ⤌ م",
    "دولة عربية بحرف ⤌ ق",
    "جماد بحرف ⤌ ي",
    "نبات بحرف ⤌ ج",
    "اسم بنت بحرف ⤌ ع",
    "اسم ولد بحرف ⤌ ع",
    "اسم بنت وولد بحرف ⤌ ث",
    "جماد بحرف ⤌ ج",
    "حيوان بحرف ⤌ ص",
    "دولة بحرف ⤌ س",
    "نبات بحرف ⤌ ج",
    "مدينة بحرف ⤌ ب",
    "نبات بحرف ⤌ ر",
    "اسم بحرف ⤌ ك",
    "حيوان بحرف ⤌ ظ",
    "جماد بحرف ⤌ ذ",
    "مدينة بحرف ⤌ و",
    "اسم بحرف ⤌ م",
    "اسم بنت بحرف ⤌ خ",
    "اسم و نبات بحرف ⤌ ر",
    "نبات بحرف ⤌ و",
    "حيوان بحرف ⤌ س",
    "مدينة بحرف ⤌ ك",
    "اسم بنت بحرف ⤌ ص",
    "اسم ولد بحرف ⤌ ق",
    "نبات بحرف ⤌ ز",
    "جماد بحرف ⤌ ز",
    "مدينة بحرف ⤌ ط",
    "جماد بحرف ⤌ ن",
    "مدينة بحرف ⤌ ف",
    "حيوان بحرف ⤌ ض",
    "اسم بحرف ⤌ ك",
    "نبات و حيوان و مدينة بحرف ⤌ س",
    "اسم بنت بحرف ⤌ ج",
    "مدينة بحرف ⤌ ت",
    "جماد بحرف ⤌ ه",
    "اسم بنت بحرف ⤌ ر",
    "اسم ولد بحرف ⤌ خ",
    "جماد بحرف ⤌ ع",
    "حيوان بحرف ⤌ ح",
    "نبات بحرف ⤌ ف",
    "اسم بنت بحرف ⤌ غ",
    "اسم ولد بحرف ⤌ و",
    "نبات بحرف ⤌ ل",
    "مدينة بحرف ⤌ ع",
    "دولة واسم بحرف ⤌ ب"
  ];

  const randomQuestion = gameQuestions[Math.floor(Math.random() * gameQuestions.length)];

  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*${randomQuestion}*\n*⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "尺月乙月ル🧧乃〇丁"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "*⊱⪨༻𓆩〘حروف〙𓆪༺⪩⊰*",
            subtitle: "",
            hasMediaAttachment: false, // لا يوجد وسائط الآن
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"الي بعدو🎀✨️\",\"id\":\".حروف\"}"
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"الدعم\",\"id\":\".المطور\"}"
              }
            ]
          })
        })
      }
    }
  }, {});

  await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
}

handler.tags = ['frasss'];
handler.command = ['حروف'];

export default handler;
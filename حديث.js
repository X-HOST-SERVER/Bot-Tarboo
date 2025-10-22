import pkg from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;

var handler = async (m, { conn, usedPrefix }) => {
  const ahadith = [
    // أحاديث عن النبي صلى الله عليه وسلم
    'قال رسول الله صلى الله عليه وسلم: "من لا يشكر الناس لا يشكر الله."',
    'قال رسول الله صلى الله عليه وسلم: "الدين النصيحة."',
    'قال رسول الله صلى الله عليه وسلم: "إنما الأعمال بالنيات."',
    'قال رسول الله صلى الله عليه وسلم: "أحب الأعمال إلى الله أدومها وإن قل."',
    'قال رسول الله صلى الله عليه وسلم: "من يرد الله به خيرًا يفقهه في الدين."',
    'قال رسول الله صلى الله عليه وسلم: "من صام رمضان إيمانًا واحتسابًا غفر له ما تقدم من ذنبه."',
    'قال رسول الله صلى الله عليه وسلم: "من لا يُؤثِرْ الناس لم يُؤثَرْه الله."',
    'قال رسول الله صلى الله عليه وسلم: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه."',
    'قال رسول الله صلى الله عليه وسلم: "من دعا إلى هدى كان له من الأجر مثل أجور من تبعه."',
    'قال رسول الله صلى الله عليه وسلم: "الطهور شطر الإيمان."',
    
    // أحاديث عن الصحابة رضوان الله عليهم
    'قال عمر بن الخطاب رضي الله عنه: "إنا كنا أذل قوم فرفعنا الله بالإسلام."',
    'قال علي بن أبي طالب رضي الله عنه: "الناس أعداء ما جهلوا."',
    'قال أبو هريرة رضي الله عنه: "ما من شيء أثقل في الميزان من حسن الخلق."',
    'قال عبد الله بن مسعود رضي الله عنه: "والذي لا إله غيره، ما منكم من أحد إلا وقد كتب مقعده من الجنة أو من النار."',
    'قال عبد الله بن عباس رضي الله عنه: "أنزل القرآن على سبعة أحرف فاقرؤوا ما تيسر منه."',
    'قال أبو بكر الصديق رضي الله عنه: "لو أنني سُئلت عن شيء في أمر الله، لقلت نعم، ولو سُئلت عن شيء في أمر الناس، لقلت لا."',
    'قال عثمان بن عفان رضي الله عنه: "لو أن قلوبنا طهرت لما شبعنا من كلام ربنا."',
    'قال معاذ بن جبل رضي الله عنه: "أول ما يُسأل عنه العبد يوم القيامة الصلاة."',
    'قال سلمان الفارسي رضي الله عنه: "أهل الجنة لا يندمون على شيء إلا على ساعة مرت بهم لم يذكروا الله فيها."',
    'قال طلحة بن عبيد الله رضي الله عنه: "النجاح في الدنيا هو الذي يتحقق بالصبر على الابتلاءات."'
  ];

  const randomHadith = ahadith[Math.floor(Math.random() * ahadith.length)];

  let msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*${randomHadith}*\n*⊱─═⪨༻𓆩⚡𓆪༺⪩═─⊰*`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: "尺月乙月ル🧧乃〇丁"
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            title: "*⊱⪨༻𓆩〘حديث〙𓆪༺⪩⊰*",
            subtitle: "",
            hasMediaAttachment: false, // لا يوجد وسائط الآن
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"التالي\",\"id\":\".حديث\"}"
              },
              {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"الدعم\",\"id\":\".الدعم\"}"
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
handler.command = ['حديث', 'احاديث'];

export default handler;
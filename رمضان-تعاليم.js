import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);
    
    const fkontak2 = {
        key: {
            participants: '0@s.whatsapp.net',
            remoteJid: 'status@broadcast',
            fromMe: false,
            id: 'Halo'
        },
        message: {
            contactMessage: {
                displayName: `${m.pushName}`,
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        participant: '0@s.whatsapp.net'
    };

    if (device !== 'desktop' && device !== 'web') {
        var moon = await prepareWAMessageMedia({ image: { url: 'https://telegra.ph/file/966a90fa69a6d83525120.png' }}, { upload: conn.waUploadToServer });
        
        const interactiveMessage = {
            body: { text: `*مرحبا بك في قسم التعليم الديني، للتعرف على المزيد اضغط الزر اسفله :*`.trim() },
            footer: { text: ``.trim() },  
            header: {
                title: `> *فَاسْأَلُواْ أَهْلَ الذِّكْرِ إِن كُنتُمْ لاَ تَعْلَمُونَ*`,
                subtitle: `\n\n`,
                hasMediaAttachment: true,
                imageMessage: moon.imageMessage,
            },
            nativeFlowMessage: {
                    buttons: [
            {
            name: 'single_select',
              buttonParamsJson: JSON.stringify({
                title: 'الــتــعــالــيــم',
                sections: [
                  {
                    title: '↓ التعاليم ↓',
                    highlight_label: '',
                    rows: [
                    {
                        header: '⌗ - مـاهـي أركـان الإسـلام',
                        title: '',
                        description: '',
                        id: '#شات ماهي أركان الاسلام؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة الـوضـوء',
                        title: '',
                        description: '',
                        id: '#شات تت كيف اتوضأ توضأً صحيحا؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة الـصـلاة',
                        title: '',
                        description: '',
                        id: '#شات تت كيف اصلي صلاة صحيحة؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة الـطـهـارة مـن الـجـنـابـة 🚹',
                        title: '',
                        description: '',
                        id: '#شات تت كيف اتطهر من الجنابة؟' 
                      }, 
                      {
                        header: '⌗ - كـيـفـيـة الـطـهـارة مـن دم الـحـيـض 🚺',
                        title: '',
                        description: '',
                        id: '#شات تت اتطهر من دم الحيض؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة صـلاة صـلاة الـجـنـازة؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيف اصلي صلاة الجنازة؟' 
                      },
                      {
                        header: '⌗ - أذكــار مـابعد الـصـلاة؟',
                        title: '',
                        description: '',
                        id: '#شات تت ماهي اذكار التي نقولها بعد الصلاة؟' 
                      }, 
                      {
                        header: '⌗ - مـاذا نـقـول عـنـد سـمـاع الاذان؟',
                        title: '',
                        description: '',
                        id: '#شات تت ما الذي نقوله عند سماع اذان الصلاة؟' 
                      },
                       {
                        header: '⌗ - فـضـل الـصـلاة؟',
                        title: '',
                        description: '',
                        id: '#شات تت فضل الصلاة على المؤمن؟' 
                      },
                      {
                        header: '⌗ - كـيـف اداوم عـلـى صـلاة الـفـجـر؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيفية المداومة على صلاة الفجر؟' 
                      },
                      {
                        header: '⌗ - لـمـاذا ديـن الإسـلام هـو الـصـح؟',
                        title: '',
                        description: '',
                        id: '#شات تت ليه دين الإسلام هو الدين الصحيح لاتباعه؟' 
                      },
                       {
                        header: '⌗ - مـامـعـنـى الآذان؟',
                        title: '',
                        description: '',
                        id: '#شات تت مامعنى اذان الصلاة؟' 
                      },
                       {
                        header: '⌗ - كـيـفـيـة أداء الآذان؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيفية الاذان؟' 
                      },
                      {
                        header: '⌗ - مـاهـي الـسـنـن الـمـؤكـدة قـبـل الـصـلاة؟',
                        title: '',
                        description: '',
                        id: '#شات تت ماهي السنن المؤكدة قبل الصلاة؟' 
                      },
                      {
                        header: '⌗ - مـاهـي الأدعـيـة الـتـي يـجـب قـولـهـا بـيـن الـسـجـدتـيـن؟',
                        title: '',
                        description: '',
                        id: '#شات تت ماهي الأدعية التي قولها بين السجدتين؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة الـصـوم فـي رمـضـان؟',
                        title: '',
                        description: '',
                        id: '#تت كيف أصوم في رمضان؟' 
                      },
                       {
                        header: '⌗ - فـضـل الـصـوم؟',
                        title: '',
                        description: '',
                        id: '#شات تت فضل الصوم للانسان جسدا و دينا؟' 
                      },
                      {
                        header: '⌗ - الأيـام الـمسـتـحـب صـومـهـا؟',
                        title: '',
                        description: '',
                        id: '#شات تت الايام المستحب صومها لنيل الأجر؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة اداء صـلاة الإسـتـسـقـاء؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيفية أداء صلاة الاستسقاء؟' 
                      },
                      {
                        header: '⌗ - فـضـل صـلاة الإسـتـسـقـاء؟',
                        title: '',
                        description: '',
                        id: '#شات تت فضل صلاة الاستسقاء؟' 
                      },
                       {
                        header: '⌗ - صـلاة الإسـتـخـارة؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيفية أداء صلاة الاستخارة؟' 
                      },
                      {
                        header: '⌗ - الـصـلاة للـمـسـافـر؟',
                        title: '',
                        description: '',
                        id: '#شات تت صلاة المسافر؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة اداء صـلاة الـعـيـد؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيفية أداء صلاة العيد؟' 
                      },
                      {
                        header: '⌗ - الـتـسـبـيـح؟',
                        title: '',
                        description: '',
                        id: '#شات تت التسبيح و كيف اسبح و فضله؟' 
                      },
                       {
                        header: '⌗ - الـصـلاة الـضـائـعـة؟',
                        title: '',
                        description: '',
                        id: '#تت كيف اصلي صلاة او صلوات فات وقتهم؟' 
                      },
                      {
                        header: '⌗ - كـيـفـيـة الـتـيـمـم؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيف اتيمم و متى؟' 
                      },
                      {
                        header: '⌗ - ادعـيـة لـقـرائـتـها فـي الـسـجـدتـيـن؟',
                        title: '',
                        description: '',
                        id: '#شات تت أدعية اقولها في سجدتي الصلاة؟' 
                      },
                      {
                        header: '⌗ - الـقِـبـلـة؟',
                        title: '',
                        description: '',
                        id: '#شات تت كيف احدد القبلة للصلاة؟' 
                      }
                            ]
                        }
                    ]
                }),
                messageParamsJson: ''
            },
              {
               name: "cta_url",
               buttonParamsJson: '{"display_text":"　ِ ҉  قناتي","url":"https://whatsapp.com/channel/0029VauZzgL9Gv7X7LxtC73R","merchant_url":""}'
            }
          ],
        messageParamsJson: ''
    }
};
 let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: fkontak2 });
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        conn.sendFile(m.chat, 'moon.jpg', m, { quoted: fkontak2 });      
    }    
};

handler.help = ['tips'];
handler.tags = ['🌙'];
handler.command = /^(تعليم|التعاليم)$/i;

export default handler;
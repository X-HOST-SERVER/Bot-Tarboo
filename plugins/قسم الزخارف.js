let  handler = async (m, { conn, args, usedPrefix, command }) => {
  conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: `*┏━━━━━━━━━━━━━━━━⬣*
*┇↞ مـنـور يـا قـلـب تيربو『🧞‍♂️』*
*❐⊹━━━━━『𝑻𝑼𝑹𝑩𝑶』━━━━━⊹❐*
*┇↞ رمــضـان كــريــم『🌙』*
*❐⊹━━━━━『𝑻𝑼𝑹𝑩𝑶』━━━━━⊹❐*
*┇↞ المنيو الخاص بالزغارف لم يكتمل بعد وضعت الاوامر الحاليه『🧚‍♀️』*
*❐⊹━━━━━『𝑻𝑼𝑹𝑩𝑶』━━━━━⊹❐*
*┇↞ اوامــر الــبــوت『🧸』╿↶*
*┗━━━━━━━━━━━━━━━━⬣*
 ┏━╼━━━╃⌬〔⚡️〕⌬╄━━━╾━┓
 ┇≡ ◡̈⃝⚡↜『اشكال الزخارف』
 ┇≡ ◡̈⃝⚡↜『زخرفه1』
 ┇≡ ◡̈⃝⚡↜『زخرفه2』
 ┇≡ ◡̈⃝⚡↜『زخرفه3』
 ┇≡ ◡̈⃝⚡↜『زخرفه4』
 ┇≡ ◡̈⃝⚡↜『زخرفه5』
 ┇≡ ◡̈⃝⚡↜『زخرفه6』
 ┇≡ ◡̈⃝⚡↜『زخرفه7』
 ┇≡ ◡̈⃝⚡↜『زخرفه8』
 ┇≡ ◡̈⃝⚡↜『زخرفه9』
 ┇≡ ◡̈⃝⚡↜『زخرفه10』
 ┇≡ ◡̈⃝⚡↜『زخرفه11』
 ┇≡ ◡̈⃝⚡↜『كيب』
 ┗━╼━━━╃⌬〔⚡️〕⌬╄━━━╾━┛
> © 『BY TERBO 2025🥷🔥』*`
          },
          body: {
            text: '> استمتع بالبوت'
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: '⋄┄┄〘 الاوامر🥷🔥 〙┄┄⋄',
                  sections: [
                    {
                      title: '〘 قسم الزغارف🧚‍♀️ 〙',
                      highlight_label: 'new',
                      rows: [
                        {
                          header: 'info',
                          title: '*〘 الأشكال🧞‍♂️ 〙*',
                          description: '',
                          id: '.انواع الزخارف'
                        }, 
                        {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title:' ◄‏ 1-  𝙰𝙱𝙲', 
                              description: '', 
                              id: '.زخرفه1', 
                       }, 
                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 2-  𝔸𝔹ℂ', 
                              description: '', 
                              id: '.زخرفه2', 
                       }, 
                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 3-  𝐀𝐁𝐂', 
                              description: '', 
                              id: '.زخرفه3', 
                       }, 

                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 4-  𝑨𝑩𝑪', 
                              description: '', 
                              id: '.زخرفه4', 
                       }, 

                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 5-  𝐴𝐵𝐶', 
                              description: '', 
                              id: '.زخرفه5', 
                       }, 

                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 6-  𝒜ℬ𝒞', 
                              description: '', 
                              id: '.زخرفه6', 
                       }, 

                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 7-  𝓐𝓑𝓒', 
                              description: '', 
                              id: '.زخرفه7', 
                       }, 

                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 8-  ᗩᗷᑕ', 
                              description: '', 
                              id: '.زخرفه8', 
                       }, 
                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 9-  𝗔𝗕𝗖', 
                              description: '', 
                              id: '.زخرفه9', 
                       }, 
                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 10-  𝘼𝘽𝘾', 
                              description: '', 
                              id: '.زخرفه10', 
                       }, 
                          {
                              header: '*〘 الزغارف🎀✨️ 〙*', 
                              title: ' ◄‏ 11- 🇦 🇧 🇨', 
                              description: '', 
                              id: '.زخرفه11', 
                       }, 


                      ]
                    }
                  ]
                }),
                messageParamsJson:''
              }
            ]
          }
        }
      }
    }
  },{})

}
handler.help = ['info']
handler.tags = ['main']
handler.command = ['قسم الزخارف']

export default handler
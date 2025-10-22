let handler = async (m, { conn, args, usedPrefix, command }) => {
  const taguser = '@' + m.sender.split("@s.whatsapp.net")[0];

  conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: {
            title: `*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
*🐉✬⃝╿↵ مرحــبـا ➻${m.pushName}*
*⟣┈┈┈┈┈⟢┈┈┈⟣┈┈┈┈┈⟢*
🌄│المتعة│🎲│الأسئلة│❓│النكات│😜`
          },
          body: {
            text: ''
          },
          nativeFlowMessage: {
            buttons: [
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'اختياراتك',
                  sections: [
                    {
                      title: 'المتعة',
                      highlight_label: 'fun',
                      rows: [
                        { header: 'تهكير', title: '🎮 العاب', description: '', id: '.تهكير' },
                        { header: 'تفجير', title: '🎥 مقاطع مضحكة', description: '', id: '.تفجير' },
                        { header: 'تفجير', title: '🎵 موسيقى', description: '', id: '.تفجير' }
                      ]
                    }
                  ]
                }),
                messageParamsJson: ''
              },
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'اختياراتك',
                  sections: [
                    {
                      title: 'الأسئلة',
                      highlight_label: 'quiz',
                      rows: [
                        { header: 'اسئلني', title: '❓ سؤال اليوم', description: '', id: '.اسئلني' },
                        { header: 'اسئلة', title: '📚 معلومات عامة', description: '', id: '.اسئلة' },
                        { header: 'أختبرني', title: '🧠 الغاز', description: '', id: '.أختبرني' },
                        { header: 'احرجني', title: '📚 احرجني', description: '', id: '.احرجني' },
                        { header: 'تحدانى', title: '📚 تحدانى', description: '', id: '.تحدانى' },
                        { header: 'الصراحه', title: '📚 الصراحه', description: '', id: '.الصراحه' },
                        { header: 'لو خيروك', title: '📚 لو خيروك', description: '', id: '.لوخيروك' },
                        { header: 'اقتباس', title: '📚 اقتباس', description: '', id: '.اقتباس' },
                        { header: 'اقتباس2', title: '📚 اقتباس 2', description: '', id: '.اقتباس2' },
                        { header: 'شعر', title: '📚 شعر', description: '', id: '.شعر' },
                        { header: 'حكمة', title: '📚 حكمة', description: '', id: '.حكمة' },
                        { header: 'نصيحة', title: '📚 نصيحة', description: '', id: '.نصيحة' },
                        { header: 'بوستات', title: '📚 بوستات', description: '', id: '.بوستات' },
                        { header: 'غزل', title: '📚 غزل', description: '', id: '.غزل' },
                        { header: 'هبد', title: '📚 هبد', description: '', id: '.هبد' },
                        { header: 'تجرؤ', title: '📚 تجرؤ', description: '', id: '.تجرؤ' }, 
                        { header: 'العدوان', title: '📚 العدوان', description: '', id: '.العدوان' },
                        { header: 'فلسطين', title: '📚 فلسطين', description: '', id: '.فلسطين' },
                      ]
                    }
                  ]
                }),
                messageParamsJson: ''
              },
              {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                  title: 'اختياراتك',
                  sections: [
                    {
                      title: 'النكات',
                      highlight_label: 'jokes',
                      rows: [
                        { header: 'اصحاب', title: '😂 اصحاب', description: '', id: '.اصحاب' },
                        { header: 'الحب', title: '💘 الحب', description: '', id: '.الحب' },
                        { header: 'قلب', title: '💓 قلب', description: '', id: '.قلب' },
                        { header: 'بيحبني', title: '❤️ بيحبني', description: '', id: '.بيحبني' },
                        { header: 'خطوبه', title: '💍 خطوبه', description: '', id: '.خطوبه' },
                        { header: 'زواج', title: '💒 زواج', description: '', id: '.زواج' },
                        { header: 'طلاق', title: '💔 طلاق', description: '', id: '.طلاق' },
                        { header: 'بيكرهني', title: '😠 بيكرهني', description: '', id: '.بيكرهني' },
                        { header: 'بيبضني', title: '🤍 بيبضني', description: '', id: '.بيبضني' },
                        { header: 'قتل', title: '🔪 قتل', description: '', id: '.قتل' },
                        { header: 'جريمه', title: '🚔 جريمه', description: '', id: '.جريمه' },
                        { header: 'اعدام', title: '⚖️ اعدام', description: '', id: '.اعدام' },
                        { header: 'حياه', title: '🌱 حياه', description: '', id: '.حياه' },
                        { header: 'وفاتي', title: '⚰️ وفاتي', description: '', id: '.وفاتي' }
                      ]
                    }
                  ]
                }),
                messageParamsJson: ''
              },
              {
                name: 'quick_reply',
                buttonParamsJson: JSON.stringify({
                  display_text: '『』اوامر المرح النصية《',
                  id: '.اوامرالمرح'
                }),
                messageParamsJson: ''
              }
            ]
          }
        }
      }
    }
  }, {});
}

handler.help = ['info'];
handler.tags = ['main'];
handler.command = ['مرح'];

export default handler;
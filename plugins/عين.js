import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const timeout = 60000;

let handler = async (m, { conn, command }) => {
    if (command.startsWith('answer_')) {
        let id = m.chat;
        let shanks = conn.shanks[id];

        if (!shanks) {
            return conn.reply(m.chat, '❌ لا يوجد اختبار نشط في الوقت الحالي.', m);
        }

        let selectedAnswerIndex = parseInt(command.split('_')[1]);
        if (isNaN(selectedAnswerIndex) || selectedAnswerIndex < 1 || selectedAnswerIndex > 4) {
            return conn.reply(m.chat, '❌ اختيار غير صالح.', m);
        }

        let selectedAnswer = shanks.options[selectedAnswerIndex - 1];
        let isCorrect = shanks.correctAnswer === selectedAnswer;

        if (isCorrect) {
            await conn.reply(m.chat, `✅ إجابة صحيحة! ربحت 500 XP!`, m);
            global.db.data.users[m.sender].exp += 500;
            clearTimeout(shanks.timer);
            delete conn.shanks[id];
        } else {
            shanks.attempts -= 1;
            if (shanks.attempts > 0) {
                await conn.reply(m.chat, `❌ إجابة خاطئة. تبقى ${shanks.attempts} محاولات.`, m);
            } else {
                await conn.reply(m.chat, `❌ انتهت المحاولات. الإجابة الصحيحة هي: ${shanks.correctAnswer}`, m);
                clearTimeout(shanks.timer);
                delete conn.shanks[id];
            }
        }
    } else {
        try {
            conn.shanks = conn.shanks || {};
            let id = m.chat;

            if (conn.shanks[id]) {
                return conn.reply(m.chat, '⌛ لا يمكنك بدء اختبار جديد حتى تنتهي من الاختبار الحالي.', m);
            }

            const response = await fetch('https://gist.githubusercontent.com/Kyutaka101/4e01c190b7d67225ad7a86d388eeedf6/raw/67f0de059cea4b965a3f3bf211c12fc9c48043e5/gistfile1.txt');
            const shanksData = await response.json();

            if (!shanksData) {
                throw new Error('فشل في الحصول على بيانات الاختبار.');
            }

            const shanksItem = shanksData[Math.floor(Math.random() * shanksData.length)];
            const { img, name } = shanksItem;

            let options = [name];
            while (options.length < 4) {
                let randomItem = shanksData[Math.floor(Math.random() * shanksData.length)].name;
                if (!options.includes(randomItem)) {
                    options.push(randomItem);
                }
            }
            options.sort(() => Math.random() - 0.5);

            const media = await prepareWAMessageMedia({ image: { url: img } }, { upload: conn.waUploadToServer });

            const interactiveMessage = {
                body: {
                    text: `🖼️ تعرف على الشخصية من الصورة 🖼️\n\n🎮 معرفة الشخصيات\n⚡ الوقت: ${(timeout / 1000).toFixed(2)} ثانية\n💰 الجائزة: 500 XP`,
                },
                footer: { text: 'اختر الإجابة الصحيحة:' },
                header: {
                    title: 'مرحبا',
                    subtitle: 'اختر أحد الخيارات أدناه:',
                    hasMediaAttachment: true,
                    imageMessage: media.imageMessage,
                },
                nativeFlowMessage: {
                    buttons: options.map((option, index) => ({
                        name: 'quick_reply',
                        buttonParamsJson: JSON.stringify({
                            display_text: `『${index + 1}┇${option}┇』`,
                            id: `.answer_${index + 1}`
                        })
                    })),
                },
            };

            let msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: { interactiveMessage },
                },
            }, { userJid: conn.user.jid, quoted: m });

            conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

            conn.shanks[id] = {
                correctAnswer: name,
                options: options,
                timer: setTimeout(async () => {
                    if (conn.shanks[id]) {
                        await conn.reply(m.chat, `⌛ انتهى الوقت. الإجابة الصحيحة هي: ${name}`, m);
                        delete conn.shanks[id];
                    }
                }, timeout),
                attempts: 2
            };

        } catch (e) {
            console.error(e);
            conn.reply(m.chat, 'حدث خطأ في إرسال الرسالة.', m);
        }
    }
};

handler.help = ['شخصية'];
handler.tags = ['game'];
handler.command = /^(شخصية|عين|answer_\d+)$/i;

export default handler;

// تم الانشاء بواسطه ميليودس 

//قناه الكود https://whatsapp.com/channel/0029VaTnpSDJpe8YtqXg0u2d

import { canLevelUp, xpRange } from '../lib/levelling.js';
import { levelup } from '../lib/canvas.js';

let handler = async (m, { conn, command, text }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        global.db.data.users[m.sender] = { exp: 1000, level: 0 }; // افتراض أن المستخدم يبدأ بـ 1000 XP ومستوى 0
        user = global.db.data.users[m.sender];
    }

    const startGame = async (amount) => {
        let direction = Math.random() < 0.5 ? 'up' : 'down';
        user.game = {
            amount: amount,
            direction: direction,
            started: true
        };

        const buttonMessage = {
            viewOnceMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            hasMediaAttachment: false,
                            mediaType: 1,  // 1 للإشارة إلى نص فقط
                        },
                        body: {
                            text: 'توقع: هل السهم سيرتفع (🔼) أم سينخفض (🔽)؟',
                            subtitle: "لعبة التداول"
                        },
                        contextInfo: {
                            mentionedJid: [m.sender],
                            isForwarded: true
                        },
                        nativeFlowMessage: {
                            buttons: [
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔼","id":".توقع 🔼"}`
                                },
                                {
                                    name: 'quick_reply',
                                    buttonParamsJson: `{"display_text":"🔽","id":".توقع 🔽"}`
                                }
                            ]
                        }
                    }
                }
            }
        };

        await conn.relayMessage(m.chat, buttonMessage, {});
        return;
    };

    const endGame = async (guess) => {
        let game = user.game;
        if (!game || !game.started) {
            return conn.reply(m.chat, 'لا يوجد لعبة جارية حاليا. ابدأ لعبة جديدة باستخدام الأمر: "تداول [كمية]"', m);
        }

        let win = (guess === 'up' && game.direction === 'up') || (guess === 'down' && game.direction === 'down');
        if (win) {
            user.exp += game.amount * 2;
            await conn.reply(m.chat, `توقعك كان صحيح! لقد ربحت ${game.amount * 2} XP. رصيدك الحالي: ${user.exp} XP`, m);
        } else {
            user.exp -= game.amount;
            await conn.reply(m.chat, `توقعك كان خاطئ. لقد خسرت ${game.amount} XP. رصيدك الحالي: ${user.exp} XP`, m);
        }
        user.game = {};

        // تحقق من ترقية المستوى
        let before = user.level * 1;
        while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++;
        if (before !== user.level) {
            let name = conn.getName(m.sender);
            let teks = `🎊 عاش يحب ${name}    المستوي:`;
            let str = `
*╭━⊰ ${name} ⊱━დ*
*┃ المستوى السابق:* *${before}*
*┃ المستوى الحالي:* *${user.level}*
*┃ نطاق:* *${user.role}*
*┃ تاريخ: 30/8/2023, 11.41.51*
*╰━⊰ 🎖️ مستوى جديد 🎖️ ⊱━━დ*


*_كلما تفاعلت مع البوت ارتفع مستواك_*
`.trim();
            try {
                const img = await levelup(teks, user.level);
                await conn.sendFile(m.chat, img, 'levelup.jpg', str, m);
            } catch (e) {
                await conn.reply(m.chat, str, m);
            }
        }
    };

    if (command === 'تداول') {
        let amount = parseInt(text);
        if (isNaN(amount) || amount <= 0) {
            return conn.reply(m.chat, 'يرجى إدخال كمية صحيحة من الـ XP للمراهنة.', m);
        }
        if (user.exp < amount) {
            return conn.reply(m.chat, `ليس لديك ما يكفي من الـ XP. رصيدك الحالي: ${user.exp} XP`, m);
        }
        await startGame(amount);
    }

    if (command === 'توقع') {
        let guess = text.trim().toLowerCase();
        if (guess !== '🔼' && guess !== '🔽') {
            return conn.reply(m.chat, 'يرجى التوقع باستخدام 🔼 للسهم للأعلى أو 🔽 للسهم للأسفل.', m);
        }
        guess = guess === '🔼' ? 'up' : 'down';
        await endGame(guess);
    }
};

handler.help = ['تداول [كمية]', 'توقع 🔼/🔽'];
handler.tags = ['game'];
handler.command = ['تداول', 'توقع'];
handler.group = true;

export default handler;
let handler = async (m, { conn, command, text }) => {
    let user = global.db.data.users[m.sender];
    if (!user) {
        user = global.db.data.users[m.sender] = {};  // تعيين المستخدم إذا لم يكن موجودًا
    }

    const startGame = async () => {
        let secretNumber = Math.floor(Math.random() * 100) + 1;
        user.guessGame = {
            secretNumber: secretNumber,
            attempts: 0,
            maxAttempts: 10,
            started: true
        };

        await conn.reply(m.chat, 'تم بدء لعبة تخمين الرقم! حاول تخمين الرقم بين 1 و100. لديك 10 محاولات.', m);
    };

    const endGame = async (guess) => {
        let game = user.guessGame;
        if (!game || !game.started) {
            return conn.reply(m.chat, 'لا توجد لعبة جارية حالياً. ابدأ لعبة جديدة باستخدام الأمر: "رقم_سري"', m);
        }

        guess = parseInt(guess);
        if (isNaN(guess) || guess < 1 || guess > 100) {
            return conn.reply(m.chat, 'يرجى إدخال رقم صحيح بين 1 و100.', m);
        }

        game.attempts++;

        if (guess === game.secretNumber) {
            user.exp = (user.exp || 0) + 100;
            await conn.reply(m.chat, `تهانينا! لقد خمنت الرقم الصحيح وهو ${game.secretNumber}. لقد ربحت 100 XP.`, m);
            user.guessGame = {}; 
        } else if (game.attempts >= game.maxAttempts) {
            await conn.reply(m.chat, `لقد انتهت محاولاتك! الرقم الصحيح كان ${game.secretNumber}. حاول مرة أخرى!`, m);
            user.guessGame = {}; 
        } else {
            let hint = guess < game.secretNumber ? 'أعلى' : 'أقل';
            await conn.reply(m.chat, `تخمينك غير صحيح! حاول رقم ${hint}.`, m);
        }
    };

    const showHelp = async () => {
        const helpMessage = `
🌟 *شرح لعبة تخمين الرقم* 🌟

1. *بدء اللعبة*: 
 - استخدم الأمر *رقم_سري* لبدء اللعبة.
 - سيتم توليد رقم سري عشوائي بين 1 و100.

2. *التخمين*:
 - استخدم الأمر *تخمين [رقم]* لإدخال تخمينك.
 - ستتلقى تلميحًا إذا كان الرقم المطلوب أعلى أو أقل.

3. *الفوز والخسارة*:
 - لديك 10 محاولات لتخمين الرقم الصحيح.
 - إذا خمنت الرقم بشكل صحيح، ستحصل على 100 نقطة خبرة (XP).
 - إذا انتهت محاولاتك دون الوصول للرقم الصحيح، حاول مجددًا!

🔎 *نصائح*:
- حاول استخدام التلميحات بذكاء للوصل للرقم بأقل محاولات.
- استمتع باللعبة وشاركها مع أصدقائك!

أوامر اللعبة:
- *رقم_سري*: لبدء اللعبة.
- *تخمين [رقم]*: لإدخال تخمينك.
- *شرح*: لعرض هذا الشرح مجددًا.

*BY -ZEREF*
`;
        await conn.reply(m.chat, helpMessage, m);
    };

    // التحقق من الأوامر المستخدمة
    if (command === 'رقم_سري') {
        await startGame();
    } else if (command === 'تخمين') {
        await endGame(text.trim());
    } else if (command === 'شرح') {
        await showHelp();
    }
};

handler.help = ['رقم_سري', 'تخمين [رقم]', 'شرح'];
handler.tags = ['game'];
handler.command = ['رقم_سري', 'تخمين', 'شرح'];

export default handler;
import similarity from 'similarity';

const threshold = 0.72;

let handler = m => m;

handler.before = async function (m) {
    let id = m.chat;

    if (!m.quoted || !m.quoted.fromMe || !m.quoted.text) return true;
    
    this.tekateki = this.tekateki || {};

    if (!(id in this.tekateki)) return true;

    let gameData = this.tekateki[id];

    if (m.quoted.id === gameData[0].id) {
        let json = JSON.parse(JSON.stringify(gameData[1]));
        let correctAnswer = json.response.toLowerCase().trim();
        let userAnswer = m.text.toLowerCase().trim();

        if (userAnswer === correctAnswer) {
            global.db.data.users[m.sender].exp += gameData[2];

            m.reply(`*⊱─═⪨༻𓆩〘⚡〙𓆪༺⪩═─⊰*\n\n*⌬ ❛╏ إجابة صحيحة! شطور! جرّب مرة أخرى!*\n\n*الـجـائـزة💰↞ ${gameData[2]} نــقـطـة*\n\n*⊱─═⪨༻𓆩〘⚡〙𓆪༺⪩═─⊰*`);

            clearTimeout(gameData[3]);
            delete this.tekateki[id];

        } else if (similarity(userAnswer, correctAnswer) >= threshold) {
            m.reply(`*⌬ ❛╏ قريب جدًا! جرب مرة أخرى!*`);
        } else {
            m.reply(`*⊱─═⪨༻𓆩〘⚡〙𓆪༺⪩═─⊰*\n\n*⌬ ❛╏ إجابة خاطئة! حاول مرة أخرى!*\n\n*⊱─═⪨༻𓆩〘⚡〙𓆪༺⪩═─⊰*`);
        }
    }

    return true;
};

handler.exp = 0;

export default handler;
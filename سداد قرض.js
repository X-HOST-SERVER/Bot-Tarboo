import axios from 'axios';

const sendMessageWithImage = async (conn, m, message) => {
    const imgUrl = 'https://i.imgur.com/QeY0qzN.png';
    try {
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", message, m);
    } catch (error) {
        console.error(error);
        await conn.reply(m.chat, message, m);
    }
}

let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let loan = user.loan;

    if (!loan) {
        throw 'ليس لديك أي قرض معلق.';
    }

    let goldAmount = loan.amount;
    let repaymentDate = loan.repaymentDate; 

    if (!args[0] || isNaN(args[0]) || args[0] < 1) {
        throw 'من فضلك أدخل كمية صالحة من الذهب للسداد المسبق.';
    }

    let advancePayment = parseInt(args[0]);

    if (advancePayment >= goldAmount) {
        throw 'يجب أن تكون كمية الدفع المسبق أقل من إجمالي القرض.';
    }

    if (advancePayment > user.credit) {
        throw 'ليس لديك كمية كافية من الذهب لإجراء هذا الدفع المسبق.';
    }

    let newRepaymentDate = Date.now() + Math.floor((repaymentDate - Date.now()) * (advancePayment / goldAmount));
    user.credit -= advancePayment;
    loan.repaymentDate = newRepaymentDate;

    let str = `
🌟 تم السداد المسبق لقرض الذهب! 🌟

💰 *الكمية المسددة مسبقًا*: ${advancePayment} ذهب
⏰ *تاريخ السداد الجديد*: ${new Date(newRepaymentDate).toLocaleString()}

شكرًا على السداد المسبق لقرض الذهب الخاص بك.
`.trim();

    try {
        await sendMessageWithImage(conn, m, str);
    } catch (e) {
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['الدفعالمسبق'];
handler.tags = ['اقتصاد'];
handler.command = ['الدفعالمسبق', 'سداد قرض', 'سداد-قرض'];
handler.register = true;
handler.group = true;

export default handler;
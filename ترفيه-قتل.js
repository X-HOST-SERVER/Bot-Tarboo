import fetch from 'node-fetch';

let toM = a => '@' + a.split('@')[0];

async function handler(m, { groupMetadata }) {
    // لن يتم التحقق من الجواهر ولن يتم خصم أي شيء

    // قم بإرسال رسالة تأكيد الجريمة
    let ps = groupMetadata.participants.map(v => v.id);
    let a = ps[Math.floor(Math.random() * ps.length)];
    let b;
    do {
        b = ps[Math.floor(Math.random() * ps.length)];
    } while (b === a);

    // رابط الصورة الذي تريده
    const fgytSrdf = 'https://telegra.ph/file/52f42ec6cb7ef556c2491.jpg';

    m.reply(`*⋄┄┄〘 مسرح الجريمه🧞‍♂️ 〙┄┄⋄*
*『 القاتل🗡』 : ${toM(a)}*
*『لمقتول🩸』:  ${toM(b)}*
> الأمر للمزاح فقط`, null, {
        mentions: [a, b],
        url: 'https://telegra.ph/file/52f42ec6cb7ef556c2491.jpg' // تغيير imageUrl إلى fgytSrdf
    });
}

handler.help = ['formarpareja'];
handler.tags = ['main', 'fun'];
handler.command = ['قتل'];
handler.group = true;

export default handler;
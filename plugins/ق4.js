import { createHash } from 'crypto';
import PhoneNumber from 'awesome-phonenumber';
import { canLevelUp, xpRange } from '../lib/levelling.js';
import fetch from 'node-fetch';
import fs from 'fs/promises';
import moment from 'moment-timezone';

const timezone = 'Africa/Cairo';

let handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // إعدادات التاريخ والوقت
        const currentDate = moment.tz(timezone).format('DD MMMM YYYY');
        const uptimeMs = process.uptime() * 1000;
        const uptime = formatDuration(uptimeMs);

        // التحقق من المستخدم
        const who = m.quoted ? m.quoted.sender : m.mentionedJid?.[0] || m.sender;

        if (!global.db?.data?.users || !(who in global.db.data.users)) {
            throw new Error("✳️ لم يتم العثور على المستخدم في قاعدة البيانات الخاصة بي");
        }

        const user = global.db.data.users[who];
        const registeredUsersCount = Object.values(global.db.data.users).filter(u => u.registered).length;

        const tagUser = `@${m.sender.split('@s.whatsapp.net')[0]}`;
        const videoUrl = 'https://telegra.ph/file/381cbc23153d4a979300c.mp4';

        // رسالة الاستجابة
        const message = `
*⊜━˼🕋˹ ━╃⌬〔قسم الدين〕⌬╄━˼📿˹┏*
*┇≡ ◡̈⃝🧸↜ ⁩ تفضل القائمة يا  :〔${taguser}〕*
*┇≡ ◡̈⃝🥷↜ قبل كتابة اي امر حط〔.〕*
*┇≡ ◡̈⃝⌚↜ وقـت الـتـشـغـيـل〔${uptime}〕*
*┇≡ ◡̈⃝⏳↜ الـتـوقـيـت〔${date}〕*
*┇≡ ◡̈⃝🥷↜ عـدد الـمـسـتـخـدمـيـن〔${rtotalreg}〕*
*┇≡ ◡̈⃝🗿↜ اسـم الـبوت :〔𝑻𝑼𝑹𝑩𝑶〕*
*┇≡ ◡̈⃝⚙️↜ الـمنـصه〔MEGA〕*
*┗━━━━━━━━━━⬣*

┏━━⊜
- ❐╎🕌❯ *`『.الصلاه 』`*
> بيجبلك وقت الصلاه في كل بلد
- ❐╎📿❯ *`『.قران فيد 』`*
> يجيب لك البوت مقطع قرآن
- ❐╎🤲🏻❯ *`『.احاديث 』`*
> يجيب لك البوت احاديث حلوه
- ❐╎🕋❯ *`『.تعليم 』`*
> يعلمك كل ما تحتاجه عن الدين
- ❐╎🤲🏻❯ *`『.ايات 』`*
> يجيب لك البوت ايات
- ❐╎🙏🏻❯ *`『.حديث 』`*
> يجيب لك البوت حديث
- ❐╎☪️❯ *`『.تحدي دين 』`*
> يجيب لك تحديات اسلاميه
- ❐╎📿❯ *`『.اذكار الصباح 』`*
> يجيب لك قائمة الاذكار الصباحية 
 ❐╎🌹❯ *`『.اذكار المساء 』`*
> يجيب لك قائمة الاذكار المسائيه
- ❐╎💌❯ *`『.ايه 』`*
> يجيب لك اية صوتية من سورة ما
- ❐╎🕋❯ *`『.اسماء-الله 』`*
> يجيب لك شرح اسماء الله الحسنى
- ❐╎📿❯ *`『.قصص 』`*
> قصص نبوية و غيرها
- ❐╎🤍❯ *`『.نسيبة 』`*
> محتوى ديني جميل
- ❐╎🎥❯ *`『.بودكاست 』`*
> فيديوات بودكاست مفيدة
- ❐╎⌚❯ *`*`『.الصلاه 』`*
> بيجبلك موعيد الصلاه
- ❐╎🤍❯ *`『.استغفار 』`*
> بيجبلك بوستات استغفار
┗━━━━━━━━━━⬣
`.trim();

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl }, 
            caption: message,
            mentions: [m.sender, conn.user.jid],
            gifPlayback: true,
            gifAttribution: 0,
        }, { quoted: m });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, `⚠️ حدث خطأ: ${error.message}`, m);
    }
};

handler.help = ['main'];
handler.command = ['ق4'];
export default handler;

// دالة لتنسيق الوقت
function formatDuration(ms) {
    const h = Math.floor(ms / 3600000) || '--';
    const m = Math.floor(ms / 60000) % 60 || '--';
    const s = Math.floor(ms / 1000) % 60 || '--';
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

import fetch from 'node-fetch';

var handler = async (m, { conn, text }) => {
    if (!text) throw `⚠️ *الرجاء إدخال عنوان المانجا التي تريد البحث عنها!*`;

    conn.reply(m.chat, '🔍 *جارٍ البحث عن المانجا... الرجاء الانتظار*', m);

    let res = await fetch('https://api.jikan.moe/v4/manga?q=' + text);
    if (!res.ok) throw '❌ *عذرًا، لم يتم العثور على المانجا المطلوبة!*';

    let json = await res.json();

    // ✅ التحقق مما إذا كانت هناك بيانات متاحة قبل محاولة استخدامها
    if (!json.data || json.data.length === 0) {
        throw '❌ *عذرًا، لم يتم العثور على أي نتائج لهذه المانجا. حاول البحث باسم مختلف!*';
    }

    let manga = json.data[0]; // أول نتيجة من البحث
    let { chapters, url, type, score, scored, scored_by, rank, popularity, members, background, status, volumes, synopsis, favorites } = manga;

    let العنوان = manga.titles.map(jud => `${jud.title} [${jud.type}]`).join('\n');
    let المؤلف = manga.authors.map(author => `${author.name} (${author.url})`).join('\n');
    let النوع = manga.genres.map(genre => `${genre.name}`).join(', ');

    let معلومات_المانجا = `📚 *العنوان:* ${العنوان}
📑 *عدد الفصول:* ${chapters || 'غير متوفر'}
📖 *عدد المجلدات:* ${volumes || 'غير متوفر'}
🔖 *التصنيف:* ${النوع || 'غير محدد'}
📌 *الحالة:* ${status || 'غير متوفر'}
⭐ *التقييم:* ${score || 'غير متوفر'} (${scored || 'غير متوفر'} من ${scored_by || 'غير متوفر'} مستخدم)
🏆 *الترتيب:* ${rank || 'غير متوفر'}
🔥 *الشعبية:* ${popularity || 'غير متوفر'}
👥 *عدد الأعضاء:* ${members || 'غير متوفر'}
💖 *المفضلة:* ${favorites || 'غير متوفر'}
✍️ *المؤلف:* ${المؤلف || 'غير متوفر'}
🌍 *الرابط:* [اضغط هنا](${url})
📜 *الوصف:* ${synopsis || 'لا يوجد ملخص متاح'}
`;

    // ✅ إرسال صورة المانجا مع المعلومات
    conn.sendFile(m.chat, manga.images.jpg.image_url, 'manga.jpg', `📖 *معلومات المانجا:*\n` + معلومات_المانجا, m);
    
    // ✅ إرسال رسالة دعم للمطور
    conn.reply(m.chat, '💡 *لا تنسَ دعم مطور البوت!*\n👤 *Xnuvers007*\n🔗 [ادعم المطور هنا](https://saweria.co/xnuvers007)', m);
};

handler.help = ['معلومات_المانجا <اسم المانجا>', 'مانجا <اسم المانجا>'];
handler.tags = ['anime'];
handler.command = /^(mangainfo|manga|infomanga|مانجا)$/i;

export default handler;
export async function before(m) {
    // تعريف التعابير العادية لاكتشاف الروابط
    const fbRegex = /^https?:\/\/(?:www\.)?facebook\.com\/?.*$/;
    const igRegex = /(https?:\/\/(?:www\.)?instagram\.[a-z\.]{2,6}\/[\w\-\.]+(\/[^\s]*)?)/g;
    const twitRegex = /https:\/\/twitter\.com\/[^/]+\/status\/(\d+)/;

    let user = db.data.users[m.sender];
    let chat = db.data.chats[m.chat];

    // التحقق مما إذا كان النص يحتوي على رابط من أي من المواقع المحددة
    const containsLink = (text) => fbRegex.test(text) || igRegex.test(text) || twitRegex.test(text);

    // الكود الآن يعمل تلقائيًا، ولا يعتمد على `chat.autodl`
    if (containsLink(m.text)) {
        if (!user.limit || user.limit === 0) {
            await m.reply("لقد نفدت حدودك.");
            return;
        }

        try {
            // معالجة رابط فيسبوك
            if (fbRegex.test(m.text.trim())) {
                user.limit -= 1;
                const fbUrl = m.text.trim().match(fbRegex)[0];
                const { description, urls } = await facebook(fbUrl);
                await conn.sendFile(m.chat, urls[0].url, '', description, m);

            // معالجة رابط إنستغرام
            } else if (igRegex.test(m.text.trim())) {
                user.limit -= 1;
                const igUrl = m.text.match(igRegex)[0];
                const { data } = await axios.get("https://api.tioxy.my.id/api/igdl?url=" + igUrl);
                for (let i of data.data.media) {
                    await conn.sendFile(m.chat, i, '', "تم التحميل", m);
                }

            // معالجة رابط تويتر
            } else if (twitRegex.test(m.text.trim())) {
                user.limit -= 1;
                const twitUrl = m.text.trim().match(twitRegex)[0];
                const { data: ress } = await twitter(twitUrl);
                await conn.sendFile(m.chat, ress[0].url, '', "تم التحميل", m);
            }

        } catch (error) {
            console.error(error);
            await m.reply("حدث خطأ أثناء معالجة الرابط.");
        }
    }
}
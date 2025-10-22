
import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let options = [
        "اية",
        "سورة"
    ];

    let [choice, input1, input2] = text.split("|");
    if (!options.includes(choice)) {
        return m.reply(`*مثال الاستخدام:*\n.اية|رقم الاية|رقم الإصدار\n.سورة|رقم السورة|رقم الإصدار\n\n*الخيارات المتاحة:*\n\n` + options.map((v, index) => `  ○ ${v}`).join("\n"));
    }

    if (options.includes(choice)) {
        if (choice === "اية") {
            if (!input1) return m.reply("يرجى إدخال رقم الآية ورقم الإصدار.\nمثال: .اية|1|3");
            await m.reply("جاري جلب البيانات...");
            try {
                if (isNaN(input1) || isNaN(input2)) return m.reply("يجب أن تكون المدخلات أرقامًا.");
                let data = await fetchEditions();
                let editions = data.data.map((item, index) => {
                    return `🔍 *[ الإصدار ${index + 1} ]*

🌐 *الاسم الإنجليزي:* ${item.englishName}
📛 *الاسم:* ${item.name}`;
                }).join("\n\n________________________\n\n");

                if (!input2) return m.reply("اختر رقم الإصدار الذي تريده:\n" + editions);

                if (input2 >= 1 && input2 <= data.data.length) {
                    const index = input2 - 1;
                    let edition = data.data[index];
                    let result = await fetchAyah(input1, edition.identifier);
                    if (result.code !== 200) return m.reply(result.data);
                    let image = getImageUrl(result.data.surah.number, result.data.number);
                    let message = `🔍 *[ الإصدار ${result.data.edition.englishName} ]*

🌐 *الاسم:* ${result.data.surah.name}
📢 *رقم السورة:* ${result.data.surah.number}
📖 *النص:* ${result.data.text}`;

                    await conn.sendFile(m.chat, image || "DefaultImage.png", "", message, m);
                    await conn.sendMessage(m.chat, {
                        audio: { url: result.data.audio },
                        ptt: true,
                        mimetype: "audio/mpeg",
                        fileName: "ayah.mp3"
                    }, { quoted: m });
                } else {
                    return m.reply("رقم الإصدار المطلوب غير متوفر.");
                }
            } catch (e) {
                await m.reply("حدث خطأ أثناء معالجة الطلب.");
            }
        }

        if (choice === "سورة") {
            if (!input1) return m.reply("يرجى إدخال رقم السورة ورقم الإصدار.\nمثال: .سورة|1|3");
            if (input1 > 114) return m.reply("رقم السورة يجب أن يكون أقل من أو يساوي 114.");
            await m.reply("جاري جلب البيانات...");
            try {
                if (isNaN(input1) || isNaN(input2)) return m.reply("يجب أن تكون المدخلات أرقامًا.");
                let data = await fetchSurahEditions();
                let editions = data.map((item, index) => {
                    return `🔍 *[ الإصدار ${index + 1} ]*

🌐 *الاسم الإنجليزي:* ${item.englishName}
📛 *الاسم:* ${item.name}`;
                }).join("\n\n________________________\n\n");

                if (!input2) return m.reply("اختر رقم الإصدار الذي تريده:\n" + editions);

                if (input2 >= 1 && input2 <= data.length) {
                    const index = input2 - 1;
                    let edition = data[index];
                    let result = await fetchSurah(input1, edition.identifier);
                    if (result.code !== 200) return m.reply(result.data);
                    let image = getImageUrl(result.data.number, result.data.numberOfAyahs);
                    let audio = getAudioUrl(edition.identifier, result.data.number);
                    let message = `🌐 *الاسم:* ${result.data.name}

📢 *رقم السورة:* ${result.data.number}`;

                    await conn.sendFile(m.chat, image || "DefaultImage.png", "", message, m);
                    await conn.sendMessage(m.chat, {
                        audio: { url: audio },
                        ptt: true,
                        mimetype: "audio/mpeg",
                        fileName: "surah.mp3"
                    }, { quoted: m });
                } else {
                    return m.reply("رقم الإصدار المطلوب غير متوفر.");
                }
            } catch (e) {
                await m.reply("حدث خطأ أثناء معالجة الطلب.");
            }
        }
    }
};

handler.help = ["اية", "سورة"];
handler.tags = ["إسلامي"];
handler.command = /^(اية|سورة)$/i;
export default handler;

/* Helper Functions */
async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

async function fetchEditions() {
    const url = 'https://api.alquran.cloud/v1/edition/format/audio';
    return await fetchJson(url);
}

async function fetchSurahEditions() {
    const url = 'https://raw.githubusercontent.com/islamic-network/cdn/master/info/cdn_surah_audio.json';
    return await fetchJson(url);
}

async function fetchAyah(ayahNumber, edition) {
    const url = `https://api.alquran.cloud/v1/ayah/${ayahNumber}/${edition}`;
    return await fetchJson(url);
}

async function fetchSurah(surahNumber, edition) {
    const url = `https://api.alquran.cloud/v1/surah/${surahNumber}/${edition}`;
    return await fetchJson(url);
}

function getImageUrl(surahNumber, ayahNumber) {
    return `https://cdn.islamic.network/quran/images/high-resolution/${surahNumber}_${ayahNumber}.png`;
}

function getAudioUrl(edition, surahNumber) {
    return `https://cdn.islamic.network/quran/audio-surah/128/${edition}/${surahNumber}.mp3`;
}
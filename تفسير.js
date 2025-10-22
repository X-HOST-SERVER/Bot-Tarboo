import fetch from "node-fetch"; import pkg from '@whiskeysockets/baileys'; const { prepareWAMessageMedia } = pkg;

const handler = async (m, { conn, text }) => { if (!text) return m.reply(`*╮┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
❌ يُرجى كتابة اسم أو رقم السورة! 
*╯┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅*
*مــثــال :*
\`تفسير 1\`
*❐═━━━═╊⊰🏯⊱╉═━━━═❐*
> By Terbo.Bot`);

let z4ck = "https://whatsapp.com/channel/0029Vazqdf8CnA81ELXDcq2c";
let imageUrl = 'https://files.catbox.moe/e6qogi.jpg';

try {
    let surahNumber = isNaN(text) ? await getSurahNumber(text) : text;
    if (!surahNumber) return m.reply("❌ *لم يتم العثور على السورة، تأكد من الاسم!*");

    let apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/ar.muyassar`;
    let response = await fetch(apiUrl);
    let data = await response.json();

    if (!data || !data.data || !data.data.ayahs) {
        return m.reply("❌ *عذرًا، لا يوجد تفسير متاح لهذه السورة!*");
    }

    let tafsirText = data.data.ayahs.map(ayah => `📖 *[${ayah.numberInSurah}]* ${ayah.text}`).join("\n\n");
    let message = `📖 *تــفــســيــر ســورة ${data.data.englishName}*\n\n${tafsirText.substring(0, 2000)}`;

    let media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });
    let Mori = '🕋';
    m.react(Mori);

    conn.relayMessage(m.chat, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: { text: message },
                    footer: { text: '*〔اشترك في القناه🧞‍♂️〕*' },
                    header: { hasMediaAttachment: true, ...media },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "cta_url",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "『قناه البوت🥷🔥』",
                                    url: z4ck
                                })
                            }
                        ]
                    }
                }
            }
        }
    }, {});

} catch (error) {
    console.error(error);
    m.reply("❌ *حدث خطأ أثناء جلب التفسير، حاول مجددًا لاحقًا!*");
}

};

const getSurahNumber = async (surahName) => { try { let response = await fetch("https://api.alquran.cloud/v1/surah"); let data = await response.json(); let surah = data.data.find(s => s.englishName.toLowerCase() === surahName.toLowerCase() || s.name.includes(surahName)); return surah ? surah.number : null; } catch (error) { console.error(error); return null; } };

handler.command = /^تفسير$/i;

export default handler;
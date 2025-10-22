import axios from 'axios';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';
import cheerio from 'cheerio';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "بحث",
        "فصل",
        "تحميل"
    ]

    let [feature, inputs] = text.split(" ")
    if (!lister.includes(feature)) return m.reply("هذا الامر خاص بتحميل قصص المانغا على شكل مانجا مثال نكتب هكذا\n\n```.مانجا بحث <اسم المانجا>```\n\n\n*الأوامر التي سوف تستعلمها في هذا الأمر*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "بحث") {
            if (!inputs) return m.reply("\n```مثال: .مانجا بحث اسم المانجا```")
            await m.reply(wait)
            try {
                let res = await search3asq(inputs)
                let teks = res.map((item, index) => {
                    return `- *العنوان:* ${item.name}\n- *الرابط:* ${item.link}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('error')
            }
        }

        if (feature == "فصل") {
            if (!inputs) return m.reply("```مثال: .مانجا فصل الرابط```")
            await m.reply(wait)
            try {
                let res = await getAllChapters(inputs)
                let teks = res.map((item, index) => {
                    return `- *العنوان:* ${item.title}\n- *الرابط:* ${item.link}`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply('error')
            }
        }

        if (feature == "تحميل") {
            if (!inputs) return m.reply("```مثال: .مانجا تحميل الرابط```")
            await m.reply(wait)
            try {
                let data = await getChapterPdf(inputs)
                const [, mangaTitle, chapterNumber] = inputs.match(/manga\/([^/]+)\/(\d+)\/$/);
                const pdfTitle = `${mangaTitle.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())} : ${chapterNumber}`;

                await conn.sendFile(m.chat, data, pdfTitle, "DONE"+ mangaTitle, m, null, {
  mimetype: 'application/pdf',
  contextInfo: {
    mentionedJid: [m.sender]
  }
})
            } catch (e) {
                await m.reply('error')
            }
        }


    }
}
handler.help = ["مانجا"]
handler.tags = ["anime"]
handler.command = /^(مانجا)$/i
export default handler

/* New Line */
async function search3asq(q) {
  try {
    const { data } = await axios.get(`https://3asq.org/?s=${q}&post_type=wp-manga`);
    const $ = cheerio.load(data);

    return $('.tab-summary').map((index, element) => ({
      name: $(element).find('.post-title h3 a').text().trim(),
      link: $(element).find('.post-title h3 a').attr('href'),
      alternativeNames: $(element).find('.mg_alternative .summary-content').text().trim(),
      genres: $(element).find('.mg_genres .summary-content a').map((i, el) => $(el).text()).get().join(', ')
    })).get();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function getAllChapters(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    return $('.wp-manga-chapter').map((index, element) => ({
      title: $(element).text().trim(),
      link: $(element).find('a').attr('href'),
      releaseDate: $(element).find('.chapter-release-date i').text().trim(),
      views: $(element).find('.view').text().trim(),
    })).get();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

async function getChapterPdf(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const buffers = [];
    const pdfDoc = new PDFDocument();
    const pdfStream = new PassThrough();
    pdfDoc.pipe(pdfStream);

    const imageLinks = $('.wp-manga-chapter-img').map((index, element) =>
      $(element).attr('src').trim()).get();

    if (imageLinks.length === 0) {
      console.log('No images found.');
      return null;
    }

    for (const [index, imageLink] of imageLinks.entries()) {
      try {
        const imageResponse = await axios.get(imageLink, { responseType: 'arraybuffer' });
        await pdfDoc.addPage().image(Buffer.from(imageResponse.data), { fit: [pdfDoc.page.width, pdfDoc.page.height] });
      } catch (error) {
        console.error(`Error processing image ${index + 1}:`, error);
      }
    }

    pdfDoc.end();

    pdfStream.on('data', (chunk) => buffers.push(chunk));

    return new Promise((resolve) => pdfStream.on('end', () => resolve(Buffer.concat(buffers))));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
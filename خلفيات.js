/*
*كـــود خـــــــلفـيات صـوࢪ*

*تــغـــــيࢪ الــمـصدࢪ دليل فشلك*

*[𝐹𝛩𝑋 𝑊𝛩𝑅𝐿𝐷✰]*

https://whatsapp.com/channel/0029VaoUBmSKmCPIIiEatx1H
*/

import axios from 'axios';
import cheerio from 'cheerio';

async function swallpapercraft(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://wallpaperscraft.com/search/?query=' + query)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const result = [];
                $('span.wallpapers__canvas').each(function (a, b) {
                    let img = $(b).find('img').attr('src');
                    if (img) result.push(img);
                });
                resolve(result);
            })
            .catch(reject);
    });
}

let handler = async (m, { text, conn }) => {
    if (!text) return m.reply('‏ ┈─── • ◞☆◜ • ───┈ ⋅\n> انت لم تكتب نوع الخلفيات اللتي تريدها بالغه الانجليزيه وعدد الصور اللتي تريدها \n> مـــــثال : .خلفيات Anime | 5 \n‏ ┈─── • ◞☆◜ • ───┈ ⋅');

    let [query, jumlah] = text.split('|').map(v => v.trim());
    jumlah = parseInt(jumlah) || 10;

    if (jumlah > 20) return m.reply('الـحد الاقـصي 20 صــوࢪه.');
    
    try {
        let images = await swallpapercraft(query);
        if (images.length === 0) return m.reply('لـم يــتـم الـعـثور عــلي الخـلفـيه المـطلوبـه.');
        
        let count = Math.min(jumlah, images.length);
        for (let i = 0; i < count; i++) {
            await conn.sendMessage(m.chat, { image: { url: images[i] } }, { quoted: m });
        }
    } catch (e) {
        m.reply('حدث خطا حاول مجددا.');
    }
};

handler.help = ['FOX-WA-BOT'];
handler.command = ['خلفيات'];
handler.tags = ['wallcraft']
handler.limit = false;

export default handler;
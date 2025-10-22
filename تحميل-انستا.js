import fetch from 'node-fetch';
import axios from 'axios';
//import instagramGetUrl from 'instagram-url-direct';
//import {instagram} from '@xct007/frieren-scraper';
//import {instagramdl} from '@bochilteam/scraper';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) throw `${lenguajeGB['smsAvisoMG']()}${mid.smsInsta}\n*${usedPrefix + command} https://www.instagram.com/reel/DGmCzaWo-2i/?igsh=MWtra3BibXA3ZWIzNg==*`;

    const { key } = await conn.sendMessage(m.chat, { text: "⏳ جاري المعالجة..." }, { quoted: fkontak });

    // إرسال تحديثات الحالة للمستخدم
    await conn.sendMessage(m.chat, { text: "⌛ *`جاري التحميل...`*\n*✦✦✦✦✦✦⊹⊹⊹⊹✪* `[60%]`", edit: key });
    await conn.sendMessage(m.chat, { text: "⏳ *`جاري التحميل....`*\n*✦✦✦✦✦✦✦✦⊹⊹✪* `[80%]`", edit: key });
    await conn.sendMessage(m.chat, { text: "⌛ *`صلي علي النبي🫠...`*\n*✦✦✦✦✦✦✦✦✦✦✪* `[100%]`", edit: key });

    try {
        const res = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${args}`);
        const data = await res.json();
        const fileType = data.data[0].url.includes('.webp') ? 'image' : 'video';
        const downloadUrl = data.data[0].url;

        if (fileType === 'image') {
            await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', `〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕`, m, null, fake);
            await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
        } else if (fileType === 'video') {
            await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', `〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕`, m, null, fake);
            await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
        }
    } catch {
        try {
            const apiUrl = `${apis}/download/instagram?url=${encodeURIComponent(args[0])}`;
            const apiResponse = await fetch(apiUrl);
            const delius = await apiResponse.json();

            if (!delius || !delius.data || delius.data.length === 0) return m.react("❌");
            
            const downloadUrl = delius.data[0].url;
            const fileType = delius.data[0].type;

            if (!downloadUrl) return m.react("❌");

            if (fileType === 'image') {
                await conn.sendFile(m.chat, downloadUrl, 'ig.jpg', `〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕`, m, null, fake);
                await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
            } else if (fileType === 'video') {
                await conn.sendFile(m.chat, downloadUrl, 'ig.mp4', `〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕`, m, null, fake);
                await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
            } else {
                return m.react("❌");
            }
        } catch {
            try {
                const apiUrll = `https://api.betabotz.org/api/download/igdowloader?url=${encodeURIComponent(args[0])}&apikey=bot-secx3`;
                const responsel = await axios.get(apiUrll);
                const resultl = responsel.data;

                for (const item of resultl.message) {
                    const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${item.thumbnail}`)).text();
                    let tXXxt = `*〔الرابط🧞‍♂️〕:* ${shortUrRRl}\n\n〔طلبك تحت اهو🧞‍♂️〕`.trim();
                    
                    conn.sendFile(m.chat, item._url, null, tXXxt, m);
                    await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
                    await new Promise((resolve) => setTimeout(resolve, 10000));
                }
            } catch {
                try {
                    const datTa = await instagram.v1(args[0]);
                    for (const urRRl of datTa) {
                        const shortUrRRl = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                        const tXXxt = `*〔الرابط🧞‍♂️〕:* ${shortUrRRl}\n\n〔طلبك تحت اهو🧞‍♂️〕`.trim();
                        
                        conn.sendFile(m.chat, urRRl.url, 'error.mp4', tXXxt, m);
                        await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
                        await new Promise((resolve) => setTimeout(resolve, 10000));
                    }
                } catch {
                    try {
                        const resultss = await instagramGetUrl(args[0]).url_list[0];
                        const shortUrl2 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                        const txt2 = `*〔الرابط🧞‍♂️〕:* ${shortUrl2}\n\n〔طلبك تحت اهو🧞‍♂️〕`.trim();
                        
                        await conn.sendFile(m.chat, resultss, 'error.mp4', txt2, m);
                        await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕", edit: key });
                    } catch {
                        try {
                            const resultssss = await instagramdl(args[0]);
                            const shortUrl3 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                            const txt4 = `*〔الرابط🧞‍♂️〕:* ${shortUrl3}\n\n〔طلبك تحت اهو🧞‍♂️〕`.trim();
                            
                            for (const { url } of resultssss) await conn.sendFile(m.chat, url, 'error.mp4', txt4, m);
                            await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايديك🧞‍♂️〕 ", edit: key });
                        } catch {
                            try {
                                const human = await fetch(`https://api.lolhuman.xyz/api/instagram?apikey=${lolkeysapi}&url=${args[0]}`);
                                const json = await human.json();
                                const videoig = json.result;
                                const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
                                const txt1 = `*〔الرابط🧞‍♂️〕:* ${shortUrl1}\n\n〔طلبك تحت اهو🧞‍♂️〕`.trim();
                                
                                await conn.sendFile(m.chat, videoig, 'error.mp4', txt1, m);
                                await conn.sendMessage(m.chat, { text: "〔شوبيك لوبيك طلبك بين ايدك🧞‍♂️〕", edit: key });
                            } catch (e) {
                                conn.sendMessage(m.chat, {
                                    text: `*❲ ❗ ❳ يرجى إدخال رابط فيديو إنستجرام.*
➤ مثال:
.انستا https://www.instagram.com/reel/DGmCzaWo-2i/?igsh=MWtra3BibXA3ZWIzNg==`,
                                    edit: key
                                });
                                console.log(`❗❗ خطأ أثناء تنزيل المحتوى باستخدام الأمر: ${usedPrefix + command} ❗❗`);
                                console.log(e);
                            }
                        }
                    }
                }
            }
        }
    }
};

handler.help = ['instagram <رابط انستغرام>'];
handler.tags = ['تحميل'];
handler.command = /^(انستا|ig(dl)?)$/i;
handler.limit = 2;
handler.register = true;

export default handler;
import fg from 'api-dylux';
import fetch from 'node-fetch';
import { savefrom, facebookdl, facebookdlv2 } from '@bochilteam/scraper';
import fbDownloader from 'fb-downloader-scrapper';
import { facebook } from '@xct007/frieren-scraper';
import axios from 'axios';

const handler = async (m, { conn, args, command, usedPrefix }) => {
    if (!args[0]) {
        return conn.reply(
            m.chat,
            `⚠️ إكتب رابط فيسبوك لتحميل الفيديو\n• *مثال:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`,
            m,
            {
                contextInfo: {
                    externalAdReply: {
                        mediaUrl: null,
                        mediaType: 1,
                        description: null,
                        title: 'فيديو فيسبوك',
                        body: '',
                        previewType: 0,
                        thumbnail: 'thumbnail.jpg', // استبدل thumbnail.jpg بالمسار الفعلي للصورة المصغرة
                        sourceUrl: 'random_url' // استبدل random_url برابط فعلي
                    }
                }
            }
        );
    }

    if (!args[0].match(/www.facebook.com|fb.watch/g)) {
        return m.reply(
            `⚠️ إكتب رابط فيسبوك لتحميل الفيديو\n• *مثال:* ${usedPrefix + command} https://www.facebook.com/watch?v=636541475139`
        );
    }

    m.react('⌛');

    try {
        const data = await facebook.v1(args[0]);
        let videoUrl = '';
        if (data.urls && data.urls.length > 0) {
            videoUrl = data.urls[0]?.hd || data.urls[1]?.sd || '';
        }
        await conn.sendFile(m.chat, videoUrl, 'video.mp4', `✅ هنا الفيديو بتاعك من فيسبوك\n\n`, m, null, fake);
        m.react('✅');
    } catch (err1) {
        try {
            const req = await igeh(args[0]);
            await conn.sendMessage(m.chat, { video: { url: req.url_list } }, m);
        } catch (err1_2) {
            try {
                const res = await fetch(`https://api.lolhuman.xyz/api/facebook?apikey=${lolkeysapi}&url=${args[0]}`);
                const json = await res.json();
                let videoUrl = json.result[0];
                if (!videoUrl) videoUrl = json.result[1];
                await conn.sendFile(m.chat, videoUrl, 'video.mp4', `✅ هنا الفيديو بتاعك من فيسبوك\n\n`, m, null, fake);
                m.react('✅');
            } catch (err2) {
                try {
                    const res = await fg.fbdl(args[0]);
                    const videoUrl = res.data[0].url;
                    await conn.sendFile(m.chat, videoUrl, 'video.mp4', '✅ هنا الفيديو بتاعك من فيسبوك\n\n', m);
                    m.react('✅');
                } catch (err3) {
                    try {
                        const res = await fbDownloader(args[0]);
                        for (const result of res.download) {
                            const videoUrl = result.url;
                            await conn.sendFile(m.chat, videoUrl, 'video.mp4', '✅ هنا الفيديو بتاعك من فيسبوك\n\n', m, null, fake);
                            m.react('✅');
                        }
                    } catch (err4) {
                        try {
                            const res = await fetch(`https://latam-api.vercel.app/api/facebookdl?apikey=nekosmic&q=${args[0]}`);
                            const json = await res.json();
                            const videoUrl = json.video;
                            await conn.sendFile(m.chat, videoUrl, 'video.mp4', '✅ هنا الفيديو بتاعك من فيسبوك\n\n', m, null, fake);
                            m.react('✅');
                        } catch (err5) {
                            try {
                                const { result } = await facebookdl(args[0])
                                    .catch(async () => await facebookdlv2(args[0]))
                                    .catch(async () => await savefrom(args[0]));
                                for (const { url, isVideo } of result.reverse()) {
                                    await conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, '✅ هنا الفيديو بتاعك من فيسبوك', m, null, fake);
                                }
                                m.react('✅');
                            } catch (err6) {
                                m.react('❌');
                                console.log(err6);
                            }
                        }
                    }
                }
            }
        }
    }
};

handler.help = ['fb', 'facebook', 'fbdl'];
handler.tags = ['downloader'];
handler.command = /^(facebook|fb|facebookdl|fbdl|facebook2|fb2|facebookdl2|fbdl2|facebook3|fb3|facebookdl3|fbdl3|facebook4|fb4|facebookdl4|fbdl4|facebook5|fb5|facebookdl5|fbdl5)$/i;
handler.limit = 3;
handler.register = true;
export default handler;

async function igeh(url_media) {
    return new Promise(async (resolve, reject) => {
        const BASE_URL = 'https://instasupersave.com/';
        try {
            const resp = await axios(BASE_URL);
            const cookie = resp.headers['set-cookie'];
            const session = cookie[0].split(';')[0].replace('XSRF-TOKEN=', '').replace('%3D', '');
            const config = {
                method: 'post',
                url: `${BASE_URL}api/convert`,
                headers: {
                    'origin': 'https://instasupersave.com',
                    'referer': 'https://instasupersave.com/pt/',
                    'sec-fetch-dest': 'empty',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-site': 'same-origin',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, مثل Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52',
                    'x-xsrf-token': session,
                    'Content-Type': 'application/json',
                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`
                },
                data: { url: url_media }
            };
            axios(config).then(function (response) {
                const ig = [];
                if (Array.isArray(response.data)) {
                    response.data.forEach((post) => {
                        ig.push(post.sd === undefined ? post.thumb : post.sd.url);
                    });
                } else {
                    ig.push(response.data.url[0].url);
                }
                resolve({ results_number: ig.length, url_list: ig });
            }).catch(function (error) {
                reject(error.message);
            });
        } catch (e) {
            reject(e.message);
        }
    });
                      }

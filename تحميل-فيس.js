import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {

    let videoUrl = args[0];

    if (!videoUrl) return m.reply(`لـتـحـمـيـل مـن فـيـس بـوك يـجـب ادخـال الـرابـط. 

> مـثـال:  ${usedPrefix}${command} https://www.facebook.com/watch/?v=322884916560598`);

    const apiUrl = `https://api-streamline.vercel.app/dlfacebook?url=${encodeURIComponent(videoUrl)}`;

    try {

        const response = await fetch(apiUrl);

        if (!response.ok) {

            throw new Error(`HTTP error! status: ${response.status}`);

        }

        const data = await response.json();

        if (!data || !data.video) {

            return m.reply('لم يتم العثور على الفيديو 😔');

        }

        let { thumbnail, duration, video } = data;

        let video720p = video.find(v => v.quality.includes('720p'));

        let video360p = video.find(v => v.quality.includes('360p'));

        if (!video720p && !video360p) {

            return m.reply('لم يتم العثور على رابط تنزيل الفيديو بجودة مدعومة.');

        }

        await conn.sendMessage(m.chat, {

            image: { url: thumbnail }, // صورة مصغرة للفيديو

            caption: `˼📥˹┊تـحـمـيـل فـيـسـبـوك┊˼📥˹\n⏳ *الـمـدة:* ${duration}\n\n📥 *اخـتـر الـجـودة لـتـحـمـيـل الـفـيـديـو:*`,

            footer: `${global.gt}`,

            buttons: [

                {

                    buttonId: video360p ? `.تحميل_فيديو ${video360p.url}` : 'unavailable',

                    buttonText: {

                        displayText: '📥 ˼360p˹ تـحـمـيـل بـجـودة'

                    }

                },

                {

                    buttonId: video720p ? `.تحميل_فيديو ${video720p.url}` : 'unavailable',

                    buttonText: {

                        displayText: '📥 ˼720p˹ تـحـمـيـل بـجـودة'

                    }

                }

            ],

            viewOnce: true,

            headerType: 1,

        }, { quoted: m });

    } catch (error) {

        console.error('Error fetching data:', error);

        m.reply('حدث خطأ أثناء جلب بيانات الفيديو. حاول مرة أخرى لاحقًا.');

    }

};

handler.command = ['فيسبوك','فيس'];

export default handler;
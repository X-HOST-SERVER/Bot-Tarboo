import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

const handler = async (m, { command, usedPrefix, conn, args, text }) => {
    if (!text) {
        throw `❌ يرجى إدخال اسم الأغنية أو الفيديو!\nمثال:\n${usedPrefix + command} Billie Eilish - Bellyache`;
    }

    try {
        const searchResults = await yts(text);
        if (!searchResults || !searchResults.videos.length) {
            throw '❌ لم يتم العثور على نتائج!';
        }

        const video = searchResults.videos[0];
        const videoUrl = video.url;

        // إرسال إشعار قبل تنزيل الملف
        conn.reply(m.chat, `⏳ جاري تحميل ${command.includes('play.1') ? 'الصوت' : 'الفيديو'}...`, m);

        let downloadUrl;
        try {
            const apiResponse = await fetch(`https://api.siputzx.my.id/api/d/yt${command.includes('play.1') ? 'mp3' : 'mp4'}?url=${videoUrl}`);
            const apiData = await apiResponse.json();
            if (apiData && apiData.data && apiData.data.dl) {
                downloadUrl = apiData.data.dl;
            }
        } catch (e) {
            console.error('❌ فشل في تحميل الملف من API الأول:', e);
        }

        if (!downloadUrl) {
            try {
                const fallbackResponse = await fetch(`https://axeel.my.id/api/download/${command.includes('play.1') ? 'audio' : 'video'}?url=${videoUrl}`);
                const fallbackData = await fallbackResponse.json();
                if (fallbackData && fallbackData.downloads && fallbackData.downloads.url) {
                    downloadUrl = fallbackData.downloads.url;
                }
            } catch (e) {
                console.error('❌ فشل في تحميل الملف من API الثاني:', e);
            }
        }

        if (!downloadUrl) {
            throw '❌ لم يتم العثور على رابط تحميل صالح!';
        }

        if (command.includes('play.1')) {
            await conn.sendMessage(m.chat, { audio: { url: downloadUrl }, mimetype: 'audio/mpeg' }, { quoted: m });
        } else {
            await conn.sendFile(m.chat, downloadUrl, 'video.mp4', '🎬 إليك الفيديو المطلوب!', m);
        }

    } catch (error) {
        console.error('❌ خطأ أثناء تنفيذ الأمر:', error);
        await conn.reply(m.chat, `⚠️ حدث خطأ أثناء جلب البيانات. حاول مجددًا!`, m);
    }
};

handler.help = ['play.1', 'play.2'].map(v => v + ' <اسم الأغنية أو الفيديو>');
handler.tags = ['downloader'];
handler.command = ['play.1', 'play.2'];
handler.limit = 1;

export default handler;
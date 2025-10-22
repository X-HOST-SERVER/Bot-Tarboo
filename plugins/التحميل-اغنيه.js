import fetch from 'node-fetch';
import yts from 'yt-search';
import ytdl from 'ytdl-core';
import axios from 'axios';

const LimitAud = 725 * 1024 * 1024; // 725MB
const LimitVid = 425 * 1024 * 1024; // 425MB
let tempStorage = {};

const handler = async (m, { conn, command, args, text, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `❌ يرجى إدخال اسم الفيديو.\nمثال: *${usedPrefix + command} Billie Eilish - Bellyache*`, m);

    await conn.sendMessage(m.chat, { text: "⌛ جاري البحث عن الأغنية..." }); // إضافة تفاعل الساعة الرملية

    const ytPlay = await searchVideo(args.join(' '));
    if (!ytPlay.length) return conn.reply(m.chat, '❌ لم يتم العثور على نتائج.', m);

    const video = ytPlay[0];
    const infoText = `
🎵 *العنوان:* ${video.title}
📅 *العمر:* ${video.ago}
⏱ *المدة:* ${formatDuration(video.duration.seconds)}
👀 *المشاهدات:* ${formatNumber(video.views)}
🎤 *القناة:* ${video.author.name}
🔗 *الرابط:* ${video.url}
`.trim();

    tempStorage[m.sender] = { url: video.url, title: video.title };

    const buttons = [
        { buttonId: `.ريك ${video.url}`, buttonText: { displayText: "🎶 تحميل صوت" }, type: 1 },
        { buttonId: `.play.2 ${video.url}`, buttonText: { displayText: "📽 تحميل فيديو" }, type: 1 }
    ];

    await conn.sendMessage(m.chat, {
        image: { url: video.thumbnail },
        caption: infoText,
        footer: "📥 اختر نوع التحميل:",
        buttons,
        viewOnce: true
    }, { quoted: m });
};

handler.before = async (m, { conn }) => {
    const text = m.text.trim().toLowerCase();
    if (!['🎶', 'audio', '📽', 'video'].includes(text)) return;

    const userVideoData = tempStorage[m.sender];
    if (!userVideoData || !userVideoData.url) return;

    const isAudio = text === '🎶' || text === 'audio';
    const apiUrls = isAudio ? getAudioApis(userVideoData.url) : getVideoApis(userVideoData.url);

    await conn.sendMessage(m.chat, { text: "⌛ جاري تحميل الملف..." }); // ساعة رملية أثناء التحميل

    const { mediaData, isDirect } = await downloadMedia(apiUrls);
    if (!mediaData) return conn.reply(m.chat, '❌ فشل في التحميل، حاول مرة أخرى.', m);

    const fileSize = await getFileSize(mediaData);
    const fileType = isAudio ? 'audio/mpeg' : 'video/mp4';
    const fileName = `${userVideoData.title}.${isAudio ? 'mp3' : 'mp4'}`;

    if (fileSize > (isAudio ? LimitAud : LimitVid)) {
        await conn.sendMessage(m.chat, { document: { url: mediaData }, mimetype: fileType, fileName }, { quoted: m });
    } else {
        await conn.sendMessage(m.chat, { [isAudio ? 'audio' : 'video']: { url: mediaData }, mimetype: fileType }, { quoted: m });
    }

    delete tempStorage[m.sender];
};

handler.command = /^(اغنيه|اغنية)$/i;
handler.register = true;
export default handler;

// ========================
// وظائف مساعدة
// ========================

async function searchVideo(query) {
    const searchResults = await yts.search({ query, hl: 'ar', gl: 'SA' });
    return searchResults.videos;
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h ? h + " ساعة " : ""}${m ? m + " دقيقة " : ""}${s ? s + " ثانية" : ""}`.trim();
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return parseInt(response.headers.get('content-length') || 0);
    } catch {
        return 0;
    }
}

async function downloadMedia(apiList) {
    for (const api of apiList) {
        try {
            const response = await api.fetch();
            const { url, isDirect } = api.extract(response);
            if (url) return { mediaData: url, isDirect };
        } catch (e) {
            console.log(`❌ خطأ في API: ${e}`);
        }
    }
    return { mediaData: null, isDirect: false };
}

function getAudioApis(url) {
    return [
        { fetch: () => ytdl.getInfo(url), extract: (info) => ({ url: info.formats.find(f => f.mimeType.includes('audio/webm')).url, isDirect: true }) },
        { fetch: () => fetch(`https://api.zenkey.my.id/api/download/ytmp3?apikey=zenkey&url=${url}`).then(res => res.json()), extract: (data) => ({ url: data.result.download.url, isDirect: false }) },
        { fetch: () => fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${url}`).then(res => res.json()), extract: (data) => ({ url: data.dl, isDirect: false }) }
    ];
}

function getVideoApis(url) {
    return [
        { fetch: () => ytdl.getInfo(url), extract: (info) => ({ url: info.formats.find(f => f.mimeType.includes('video/mp4') && f.hasAudio).url, isDirect: true }) },
        { fetch: () => fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${url}`).then(res => res.json()), extract: (data) => ({ url: data.dl, isDirect: false }) },
        { fetch: () => fetch(`https://api.zenkey.my.id/api/download/ytmp4?apikey=zenkey&url=${url}`).then(res => res.json()), extract: (data) => ({ url: data.result.download.url, isDirect: false }) }
    ];
}
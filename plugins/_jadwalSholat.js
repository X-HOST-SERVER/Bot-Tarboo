import axios from 'axios';
import Jimp from 'jimp';
import fs from 'fs';

export async function before(m, { conn, participants }) {
    conn.autosholat = conn.autosholat || {};
    conn.adz = conn.adz || {};

    let lokasi = 'Cairo'; // تم ضبطه على القاهرة - مصر

    let id = m.chat;
    if (id in conn.adz) {
        return false;
    }

    if (!conn.autosholat[id]) {
        let jdwl = await jadwalsholat(lokasi);
        if (jdwl === 'خطأ في جلب بيانات الأذان') return;
        
        conn.autosholat[id] = { send: false, jdwl };
    } else if (!fs.existsSync('./src/jdw.png')) {
        let jdw = await jadwalsholat(lokasi);
        await image(jdw.shubuh, jdw.dhuhur, jdw.ashar, jdw.maghrib, jdw.isya, lokasi);
    } else {
        let result = conn.autosholat[id].jdwl;

        // تعيين توقيت مصر
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

        for (const [sholat, waktu] of Object.entries(result)) {
            if (timeNow === waktu) {
                conn.adz[id] = [
                    conn.sendMessage(m.chat, {
                        audio: { url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ' },
                        mimetype: 'audio/mp4',
                        ptt: true,
                        contextInfo: {
                            externalAdReply: {
                                showAdAttribution: true,
                                mediaType: 1,
                                mediaUrl: '',
                                title: `حان الآن وقت صلاة ${sholat}`,
                                body: `🕑 الوقت: ${waktu}`,
                                sourceUrl: '',
                                thumbnail: await fs.readFileSync('./src/jdw.png'),
                                renderLargerThumbnail: true
                            }
                        }
                    }, { quoted: m, mentions: participants.map(a => a.id) }),
                    setTimeout(() => {
                        delete conn.autosholat[id];
                        delete conn.adz[id];
                    }, 60000),
                    fs.unlinkSync('./src/jdw.png')
                ];
            }
        }
    }
}

export const disabled = false;

async function jadwalsholat(kota) {
    try {
        const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Egypt&method=8`);

        if (!data || !data.data || !data.data.timings) {
            throw new Error('فشل في جلب بيانات الأذان.');
        }

        return {
            shubuh: data.data.timings.Fajr,
            dhuhur: data.data.timings.Dhuhr,
            ashar: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isya: data.data.timings.Isha
        };
    } catch (e) {
        console.error('خطأ في جلب بيانات الأذان:', e);
        return 'خطأ في جلب بيانات الأذان';
    }
}

async function image(sh, dh, as, ma, is, lok) {
    const image = await Jimp.read('https://telegra.ph/file/8e791e4a13e80881584dc.jpg');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const wil = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

    image.print(font, 550, 223, sh);  // الفجر
    image.print(font, 550, 321, dh);  // الظهر
    image.print(font, 550, 392, as);  // العصر
    image.print(font, 550, 481, ma);  // المغرب
    image.print(font, 550, 571, is);  // العشاء

    image.print(wil, 870, 391, lok);  // اسم المدينة

    await image.writeAsync('./src/jdw.png');
}
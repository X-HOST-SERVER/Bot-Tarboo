import { fileURLToPath } from 'url'; 
import { dirname } from 'path';
import { exec } from 'child_process';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handler = async (m, { conn, text }) => {
    const chatId = m.chat;

    if (!conn.videoCreat) conn.videoCreat = {};
    if (!conn.videoCreat[chatId]) {
        conn.videoCreat[chatId] = { images: [], audio: null, step: 1 };
        return m.reply('📸 يرجى إرسال صورة (يمكنك إرسال أكثر من صورة قبل إرسال الصوت).');
    }

    const session = conn.videoCreat[chatId];

    if (m.quoted) {
        const mime = m.quoted.mimetype || '';

        if (mime.startsWith('image/')) {
            if (session.step >= 2) return m.reply('❌ لا يمكنك إضافة صور الآن، يرجى إرسال ملف صوتي.');

            const media = await m.quoted.download();
            const imagePath = `${__dirname}/temp_${Date.now()}.jpg`;
            fs.writeFileSync(imagePath, media);
            session.images.push(imagePath);

            return m.reply(`✅ تم إضافة الصورة (${session.images.length}).\n🎵 يمكنك إرسال المزيد من الصور أو إرسال الصوت للانتقال إلى الخطوة التالية.`);
        }

        if (mime.startsWith('audio/')) {
            if (session.step !== 1) return m.reply('❌ لقد تم تحديد الصوت مسبقًا.');

            const media = await m.quoted.download();
            session.audio = `${__dirname}/temp_audio_${Date.now()}.mp3`;
            fs.writeFileSync(session.audio, media);

            session.step = 2;
            return m.reply('⏳ الآن، أدخل مدة الفيديو بالثواني (مثال: 10).');
        }

        return m.reply('❌ يرجى إرسال صورة أو ملف صوتي فقط.');
    }

    if (session.step === 2) {
        const duration = parseInt(text);
        if (isNaN(duration) || duration <= 0) {
            return m.reply('❌ يجب أن تكون المدة رقمًا صحيحًا أكبر من 0.');
        }

        session.step = 3;
        const outputPath = `${__dirname}/output_${Date.now()}.mp4`;

        const progressMsg = await m.reply('⏳ جاري إنشاء الفيديو...');
        await createVideo(session.images, session.audio, outputPath, duration, async (progress) => {
            await conn.sendMessage(chatId, { text: `📽️ تقدم المعالجة: ${progress}%` }, { quoted: progressMsg });
        });

        await conn.sendMessage(chatId, { video: fs.readFileSync(outputPath), mimetype: 'video/mp4' });

        session.images.forEach(file => fs.unlinkSync(file));
        if (fs.existsSync(session.audio)) fs.unlinkSync(session.audio);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        delete conn.videoCreat[chatId];
    }
};

handler.command = ['منتج'];
export default handler;

const createVideo = async (imagePaths, audioPath, outputPath, duration, progressCallback) => {
    return new Promise((resolve, reject) => {
        const ffmpegCommand = ffmpeg();

        imagePaths.forEach(imagePath => {
            ffmpegCommand.input(imagePath).loop(duration / imagePaths.length);
        });

        ffmpegCommand
            .input(audioPath)
            .outputOptions([
                '-c:v libx264',
                '-tune stillimage',
                '-pix_fmt yuv420p',
                '-c:a aac',
                '-b:a 192k',
                `-t ${duration}`
            ])
            .on('progress', (progress) => {
                if (progress.percent) {
                    progressCallback(Math.round(progress.percent));
                }
            })
            .on('end', resolve)
            .on('error', reject)
            .save(outputPath);
    });
};

/*
وظيفه الكود هي انشاء فيديو من خلال دمج الصور والصوت مع المده التي تحب ❤️.

مش محتاج اضيف حقوق .
*/
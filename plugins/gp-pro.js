import Jimp from 'jimp';

const handler = async (message, { conn, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
    try {
        const chatId = message.chat;
        const quotedMessage = message.quoted ? message.quoted : message;
        if (!message.quoted) throw '*اعمل ريب ع الصوره🧚🏼‍♂️*';

        const mimeType = quotedMessage.mimetype || '';
        const imageBuffer = await quotedMessage.download();
        const targetChatId = await chatId;

        async function processImage(imageBuffer) {
            const image = await Jimp.read(imageBuffer);
            const resizedImage = image.getHeight() > image.getWidth()
                ? image.resize(Jimp.AUTO, 720)
                : image.resize(720, Jimp.AUTO);
            return { img: await resizedImage.getBufferAsync(Jimp.MIME_JPEG) };
        }

        const { img } = await processImage(imageBuffer);
        await conn.query({
            tag: 'iq',
            attrs: { to: targetChatId, type: 'set', xmlns: 'w:profile:picture' },
            content: [{ tag: 'picture', attrs: { type: 'image' }, content: img }],
        });

        message.reply('⚘ *تم تحديث الصورة بنجاح🧚🏼‍♂️*');
    } catch {
        throw '*اعمل ريب ع الصوره الي عيزني احطهالك بروفيل للروم🧚🏼‍♂️*';
    }
};

handler.help = ['setppgc']
handler.tags = ['group']
handler.command = ['بروفايل الروم'];
handler.botAdmin = true;
handler.admin = true;

export default handler;
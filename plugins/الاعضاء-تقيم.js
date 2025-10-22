import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys';

const handler = async (message, { conn, text, usedPrefix }) => {
    const deviceType = await getDevice(message.key.id);

    // Check if the device is mobile (not desktop or web)
    if (deviceType !== "desktop" && deviceType !== "web") {
        // Prepare image media
        const mediaMessage = await prepareWAMessageMedia({
            image: { url: "https://telegra.ph/file/1e09b9a4be53cb8c08ffd.jpg" }
        }, { upload: conn.waUploadToServer });

        // Define interactive message content
        const interactiveContent = {
            body: { text: '' },
            footer: { text: "يمكنك إستخدامه عبر الاختيار من الاسفل\n*─[ BY EL♡TARBOO ]*🌟✨" },
            header: {
                title: "مرحبا يا حب 👋 أتمنى أنك بخير ♥️\nالان يمكنك تقييم البوت لكي يتحسن اكثر",
                subtitle: "خـلــيك صـــادق فــي تــقــيــمـك يا حب ❤️🥹\n\n\n\n.",
                hasMediaAttachment: true,
                imageMessage: mediaMessage.imageMessage
            },
            nativeFlowMessage: {
                buttons: [
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐\",\"id\":\".قيم١\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐\",\"id\":\".قيم ⭐⭐\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐\",\"id\":\".قيم ⭐⭐⭐\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐⭐\",\"id\":\".قيم ⭐⭐⭐⭐\"}" },
                    { name: "quick_reply", buttonParamsJson: "{\"display_text\":\"⭐⭐⭐⭐⭐\",\"id\":\".قيم ⭐⭐⭐⭐⭐\"}" }
                ],
                messageParamsJson: ''
            }
        };

        // Generate the message
        let waMessage = generateWAMessageFromContent(message.chat, {
            viewOnceMessage: { message: { interactiveMessage: interactiveContent } }
        }, {
            userJid: conn.user.jid,
            quoted: message
        });

        // Relay the message
        conn.relayMessage(message.chat, waMessage.message, { messageId: waMessage.key.id });
    } else {
        // Send an error image if the device is desktop or web
        conn.sendFile(message.chat, "JoAnimi•Error.jpg", message);
    }
};

handler.customPrefix = /تقييم|تقيم/i;
handler.command = new RegExp();

export default handler;
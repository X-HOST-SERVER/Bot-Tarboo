import FormData from "form-data";
import Jimp from "jimp";
import { Buffer } from "buffer";

let handler = async (m, { conn, usedPrefix, command, args }) => {
    if (command === "اديت") {
        const subcommands = ["ازاله الضباب", "إعادة_تلوين", "تحسين", "تمويه", "توضيح"];
        const promptMessage = `اختر عملية من القائمة التالية:\n` +
            subcommands.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n') +
            `\n\nاستخدم الأمر بالشكل التالي:\n${usedPrefix}تعديل <رقم_العملية>`;

        if (!args[0]) return m.reply(promptMessage);

        const selectedIndex = parseInt(args[0]) - 1;
        if (isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= subcommands.length) {
            return m.reply(`اختيار غير صالح. ${promptMessage}`);
        }

        const selectedCommand = subcommands[selectedIndex];
        return await handler(m, { conn, usedPrefix, command: selectedCommand, args: args.slice(1) });
    } else {
        await processImage(m, conn, command, "> `𝐓𝐄𝐑𝐁𝐎 |❥!`");
    }
};

handler.help = ["اديت"];
handler.tags = ["أدوات"];
handler.command = ["ايدت", "ازاله الضباب", "إعادة_تلوين", "تحسين", "تمويه", "توضيح"];
export default handler;

const methodMap = {
    "تحسين": "enhance",
    "إعادة_تلوين": "recolor",
    "ازاله الضباب": "dehaze",
    "تمويه": "blur",
    "توضيح": "sharpen"
};

async function processImage(m, conn, methodName, caption) {
    conn[methodName] = conn[methodName] || {};
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || "";

    if (!mime) throw `أين هي الصورة؟`;
    if (!/image\/(jpe?g|png)/.test(mime)) throw `النوع ${mime} غير مدعوم`;

    conn[methodName][m.sender] = true;
    m.reply("جاري المعالجة، الرجاء الانتظار...");

    let img = await q.download?.();
    let error;

    try {
        const method = methodMap[methodName] || "enhance";
        const result = await processing(img, method);
        conn.sendFile(m.chat, result, "", caption, m);
    } catch (er) {
        error = true;
    } finally {
        if (error) m.reply("عملية فشلت :(");
        delete conn[methodName][m.sender];
    }
}

async function processing(bufferedImage, method) {
    return new Promise((resolve, reject) => {
        let Form = new FormData();
        let apiUrl = `https://inferenceengine.vyro.ai/${method}`;

        Form.append("model_version", 1);
        Form.append("image", Buffer.from(bufferedImage), {
            filename: `${method}_image.jpg`,
            contentType: "image/jpeg",
        });

        Form.submit({
            url: apiUrl,
            host: "inferenceengine.vyro.ai",
            path: `/${method}`,
            protocol: "https:",
            headers: {
                "User-Agent": "okhttp/4.9.3",
                Connection: "Keep-Alive",
                "Accept-Encoding": "gzip",
            },
        }, (err, res) => {
            if (err) return reject(err);
            let data = [];

            res.on("data", chunk => data.push(chunk));
            res.on("end", () => resolve(Buffer.concat(data)));
            res.on("error", e => reject(e));
        });
    });
}
import fs from 'fs'; import path from 'path'; import { fileURLToPath } from 'url'; import { dirname } from 'path'; import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url); const __dirname = dirname(__filename);

const handler = async (m, { conn }) => { let initialMessage; const pluginsFolderPath = path.join(__dirname, '../plugins'); const zipFilePath = path.join(__dirname, '../plugins.zip');

try {
    // التحقق من وجود المجلد
    if (!fs.existsSync(pluginsFolderPath)) {
        await conn.sendMessage(m.chat, { text: `⚠️ لم يتم العثور على مجلد plugins.` }, { quoted: m });
        return;
    }

    initialMessage = await conn.sendMessage(m.chat, { text: `📂 جاري قراءة ملفات المجلد plugins...` }, { quoted: m });
    console.log(`Reading files from: ${pluginsFolderPath}`);
    
    const files = fs.readdirSync(pluginsFolderPath);
    
    if (files.length === 0) {
        console.log("No files to zip in plugins folder.");
        await conn.sendMessage(m.chat, { text: `⚠️ لا توجد ملفات في مجلد plugins لضغطها.`, edit: initialMessage.key }, { quoted: m });
        return;
    }

    console.log(`Found ${files.length} files. Proceeding to zip...`);
    let zippingMessage = await conn.sendMessage(m.chat, { text: `🔄 تم العثور على ${files.length} ملفات. جاري إنشاء ملف ZIP...`, edit: initialMessage.key }, { quoted: m });

    // إنشاء ملف ZIP لمجلد plugins فقط
    const zipCommand = `zip -r "${zipFilePath}" .`;
    console.log(`Executing command: ${zipCommand}`);
    let processingMessage = await conn.sendMessage(m.chat, { text: `⏳ يتم الآن ضغط الملفات...`, edit: zippingMessage.key }, { quoted: m });

    exec(zipCommand, { cwd: pluginsFolderPath }, async (error, stdout, stderr) => {
        if (error) {
            console.error(`Error creating zip: ${error.message}`);
            await conn.sendMessage(m.chat, { text: `❌ حدث خطأ أثناء إنشاء ملف ZIP: ${error.message}`, edit: processingMessage.key }, { quoted: m });
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            await conn.sendMessage(m.chat, { text: `⚠️ تحذير: ${stderr}`, edit: processingMessage.key }, { quoted: m });
            return;
        }

        console.log(`stdout: ${stdout}`);
        console.log(`Zip file created at: ${zipFilePath}`);

        if (!fs.existsSync(zipFilePath)) {
            console.error("ZIP file not created.");
            await conn.sendMessage(m.chat, { text: `❌ لم يتم إنشاء ملف ZIP.`, edit: processingMessage.key }, { quoted: m });
            return;
        }

        // إرسال الملف بعد الإنشاء
        console.log(`Sending ZIP file to chat...`);
        let sendingMessage = await conn.sendMessage(m.chat, { text: `✅ تم إنشاء ملف ZIP بنجاح. يتم الآن إرساله...`, edit: processingMessage.key }, { quoted: m });
        await conn.sendMessage(m.chat, {
            document: fs.readFileSync(zipFilePath),
            mimetype: 'application/zip',
            fileName: 'plugins.zip'
        }, { quoted: m });

        // حذف الملف بعد الإرسال
        fs.unlink(zipFilePath, async (err) => {
            if (err) {
                console.error(`Error deleting zip file: ${err.message}`);
                return;
            }
            console.log(`Zip file deleted: ${zipFilePath}`);
            await conn.sendMessage(m.chat, { text: `🗑️ تم حذف ملف ZIP بعد الإرسال.`, edit: sendingMessage.key }, { quoted: m });
        });
    });
} catch (err) {
    console.error(`Failed to process plugins folder: ${err.message}`);
    await conn.sendMessage(m.chat, { text: `❌ فشل في معالجة ملفات المجلد plugins: ${err.message}` }, { quoted: m });
}

};

handler.help = ['getplugin'].map((v) => v + ' <nombre>'); handler.tags = ['owner']; handler.command = /^(سكربتي)$/i; handler.owner = true;

export default handler;
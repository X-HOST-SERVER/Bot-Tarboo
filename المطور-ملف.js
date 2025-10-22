import cp, { exec as _exec } from 'child_process';
import { promisify } from 'util';

let exec = promisify(_exec).bind(cp);

let handler = async (m, { conn, isROwner, usedPrefix, command, text }) => {
    await m.reply(global.wait);
    if (!isROwner) return;

    let pluginsArray = Object.keys(plugins);
    let pluginNames = pluginsArray.map(v => v.replace('.js', ''));

    if (!text) throw `⚠️ أممم... ما البرنامج المساعد الذي تبحث عنه؟\n\n🔍 مثال:\n${usedPrefix + command} pluginName`;

    if (!pluginNames.includes(text)) {
        return m.reply(
            `*🗃️ البرنامج المساعد غير موجود!*\n\n💡 القائمة المتاحة:\n==================================\n\n${pluginNames.map(v => ` - ${v}`).join('\n')}`
        );
    }

    let output;
    try {
        output = await exec(`cat plugins/${text}.js`);
    } catch (error) {
        output = error;
    } finally {
        let { stdout, stderr } = output || {};
        if (stdout?.trim()) m.reply(stdout);
        if (stderr?.trim()) m.reply(stderr);
    }
};

handler.help = ['getplugin'].map(v => v + ' <pluginName>');
handler.tags = ['owner'];
handler.command = /^(ملف)$/i;
handler.rowner = true;

export default handler;
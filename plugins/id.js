import fs from 'fs';
import syntaxError from 'syntax-error';
import { format } from 'util';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);

const handler = async (m, _2) => {
    const { conn, usedPrefix, noPrefix, args, groupMetadata, isROwner } = _2;

    let _return;
    let _syntax = '';
    const _text = (/^=/.test(usedPrefix) ? 'return ' : '') + noPrefix;
    const oldExp = m.exp * 1;

    // تحديد المسارات إلى الملفات الصوتية
    const vn1 = './media/ايوه.mp3';
    const vn2 = './media/ايوه.mp3';

    // رسالة منسوبة لرقم افتراضي
    const fk = {
        'key': {
            'participants': '0@s.whatsapp.net',
            'remoteJid': 'status@broadcast',
            'fromMe': false,
            'id': 'Halo'
        },
        'message': {
            'contactMessage': {
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Bot;;;\nFN:Bot\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        },
        'participant': '0@s.whatsapp.net'
    };

    try {
        let i = 15;
        const f = { exports: {} };
        const exec = new (async function () {}).constructor(
            'print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'groupMetadata', 'module', 'exports', '_args',
            _text
        );

        _return = await exec.call(
            conn,
            (...args) => {
                if (--i < 1) return;
                console.log(...args);
                return conn.sendMessage(m.chat, { text: format(...args) }, { quoted: fk });
            },
            m, handler, require, conn, CustomArray, process, args, groupMetadata, f, f.exports, [conn, _2]
        );

        // الردود التلقائية بناءً على الكلمات المفتاحية
        if (/^بوت|بوتي|البوت$/i.test(m.text)) {
            conn.sendPresenceUpdate('recording', m.chat);
            await conn.sendMessage(m.chat, { text: `*معاك البوت أطلب واتمنى 🧞*` }, { quoted: fk });
            await conn.sendMessage(m.chat, { audio: { url: vn1 }, fileName: 'bot.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: fk });

        } else if (/^تست|اختبار$/i.test(m.text)) {
            conn.sendPresenceUpdate('recording', m.chat);
            await conn.sendMessage(m.chat, { text: `*شغال وعال العال 🧞*` }, { quoted: fk });
            await conn.sendMessage(m.chat, { audio: { url: vn2 }, fileName: 'test.mp3', mimetype: 'audio/mpeg', ptt: true }, { quoted: fk });
        }

    } catch (e) {
        const err = syntaxError(_text, 'Execution Function', {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: 'module'
        });
        if (err) _syntax = '```' + err + '```\n\n';

        _return = e;
    } finally {
        conn.sendMessage(m.chat, { text: _syntax + format(_return) }, { quoted: fk });
        m.exp = oldExp;
    }
};

handler.help = ['> ', '=> '];
handler.tags = ['advanced'];
handler.customPrefix = /=?>|~/;
handler.command = /(?:)/i;

export default handler;

class CustomArray extends Array {
    constructor(...args) {
        if (typeof args[0] == 'number') {
            return super(Math.min(args[0], 10000));
        } else {
            return super(...args);
        }
    }
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}
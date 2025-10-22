import fetch from 'node-fetch';
import fs from 'fs';
let handler = m => m;

handler.all = async function (m, conn) {
    const fakecontact = { 
        'key': { 
            'participants': '0@s.whatsapp.net', 
            'remoteJid': 'status@broadcast', 
            'fromMe': false, 
            'id': '尺月乙月ル🧧乃〇丁' 
        }, 
        'message': { 
            'contactMessage': { 
                'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
            } 
        }, 
        'participant': '0@s.whatsapp.net' 
    };
   
    const vn = './media/الكلب.mp3'; //src sounds
    const vn2 = './media/بحبك.mp3'; 
    const vn3 = 'https://telegra.ph/file/b007da23c721227452f55.mp4';
    const vn4 = 'https://telegra.ph/file/710882610845fb644b99d.mp4';

    const txt = '*مرات مطورى القمر 🧸❤️*';
    const txt1 = `*عاوز اي من مطوري ي @${m.sender.split('@')[0]} 🧞*`;
    const txt2 = `*ايوا ي @${m.sender.split('@')[0]} عاوز أي من مرات مطوري 🧞*`;
    const txt3 = `*ايوا ي @${m.sender.split('@')[0]} عاوز أي 🧞*`;
    const txt4 = '*احمم أنا هنا ي مطوري 🧞❤️*';
    const txt5 = '*احمم أنا هنا ي مرات مطوري 🧸❤️*';
    const txt6 = '*ايوا يعم ولعانه معاك حب براحتك وانا هراقب 🧸❤️*';
 
    let num = "201119857886"; //number owner
    let num2 = "213782262892"; //number bot
    let num3 = "201203037231";
    let sender = m.sender.split('@')[0];
 
    if (m.mentionedJid && m.mentionedJid[0]) {
        let phoneNumber = m.mentionedJid[0].replace(/[^0-9]/g, '');
        
        if (phoneNumber === num) {
            if (sender === num3) {
                this.sendMessage(m.chat, {audio: {url: vn3}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
                this.sendMessage(m.chat, {text: txt}, {quoted: fakecontact});
                return;
            } else {
                this.sendMessage(m.chat, {audio: {url: vn2}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
                this.sendMessage(m.chat, {text: txt1, mentions: [m.sender]}, {quoted: fakecontact});
                return;
            }
        } else if (phoneNumber === num2) {
            if (sender === num) {
                this.sendMessage(m.chat, {text: txt4}, {quoted: fakecontact});
                return;
            } else if (sender === num3) {
                this.sendMessage(m.chat, {text: txt5}, {quoted: fakecontact});
                return;
            } else {
                this.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
                this.sendMessage(m.chat, {text: txt3, mentions: [m.sender]}, {quoted: fakecontact});
                return;
            }
        } else if (phoneNumber === num3) {
            if (sender === num) {
                this.sendMessage(m.chat, {audio: {url: vn4}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
                this.sendMessage(m.chat, {text: txt6}, {quoted: fakecontact});
                return;
            } else {
                this.sendMessage(m.chat, {audio: {url: vn}, fileName: 'error.mp3', mimetype: 'audio/mpeg', ptt: true}, {quoted: fakecontact});
                this.sendMessage(m.chat, {text: txt2, mentions: [m.sender]}, {quoted: fakecontact});
                return;
            }
        } else {
            return;
        }
    }
}

export default handler;

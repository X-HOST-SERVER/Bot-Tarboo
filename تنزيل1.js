let handlerSendHere = async (m, { conn, args }) => {

    let downloadLink = args[0];

    await conn.sendFile(m.chat, downloadLink, 'app.apk', null, m, false, { mimetype: 'application/vnd.android.package-archive' });

};

handlerSendHere.command = ['تحميل_هنا'];

export default handlerSendHere;
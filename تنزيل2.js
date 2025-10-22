let handlerSendPrivate = async (m, { conn, args }) => {

    let downloadLink = args[0];

    await conn.sendFile(m.sender, downloadLink, 'app.apk', null, m, false, { mimetype: 'application/vnd.android.package-archive' });

};

handlerSendPrivate.command = ['تحميل_خاص'];

export default handlerSendPrivate;
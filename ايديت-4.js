let handler = async (m, { conn }) => {
    const videos = [ 
'https://telegra.ph/file/f6587d25d1c266d5d4a72.mp4',
'https://telegra.ph/file/66fabbbb517e48eac138c.mp4',
'https://telegra.ph/file/7ffa65af33fab667639e3.mp4',
'https://telegra.ph/file/f6e01ccefbd403720e25f.mp4',
'https://telegra.ph/file/34d7d176cec88b818def2.mp4',
'https://telegra.ph/file/c78aa1e9382cae760ee61.mp4',
'https://telegra.ph/file/bdfa3b45c3260bf8fdcd0.mp4',
'https://telegra.ph/file/196c1c9a7f0434ae95760.mp4',
'https://telegra.ph/file/4a717e7678443cb885628.mp4',
'https://telegra.ph/file/09e09b9e0376dcff65ccc.mp4',
'https://telegra.ph/file/613d983b735e8ee06ac7c.mp4',
'https://telegra.ph/file/b5143e52a8b7abee1f481.mp4',
'https://telegra.ph/file/3478b51931d6c8938d241.mp4',
'https://telegra.ph/file/2173cd456f260620346ef.mp4', 
'https://telegra.ph/file/cdfa6d154ecb1b8f055ae.mp4',
'https://telegra.ph/file/2368094ba02dc1d3cb8d7.mp4',
'https://telegra.ph/file/68c30831fd772f9cc6613.mp4',
'https://telegra.ph/file/355194c34c969feb6e2fe.mp4',
'https://telegra.ph/file/b6ddd860419d08ce357e7.mp4',
'https://telegra.ph/file/edfe618c6dbb58e43088a.mp4',
'https://telegra.ph/file/674d68b3a763789730696.mp4',
'https://telegra.ph/file/1da99b8207f301c2ebe9a.mp4', 
'https://telegra.ph/file/63bccda6cf75694c80000.mp4',
'https://telegra.ph/file/6f44cb1a1b12d90360fd5.mp4',
'https://telegra.ph/file/69dccaec30b840b82ebe8.mp4',
'https://telegra.ph/file/189737c5c19b7ecd8974a.mp4', 
'https://telegra.ph/file/cdb3fece581ede57f8d13.mp4', 
'https://telegra.ph/file/95e79e3c2447ac8235763.mp4',
'https://telegra.ph/file/311f39d23df1220bac2f1.mp4', 
'https://telegra.ph/file/87aff9a7e17c1b3369676.mp4', 
'https://telegra.ph/file/32aea11a4ae2c4b06a2ca.mp4', 
'https://telegra.ph/file/25fdf39c62d51acb3cd6c.mp4', 
'https://telegra.ph/file/daf8f399c6f29673ee078.mp4', 
'https://telegra.ph/file/6a16833d71bdfde93767e.mp4', 

    ];

    let randomVideo = videos[Math.floor(Math.random() * videos.length)];

    await conn.sendMessage(m.chat, {
        video: { url: randomVideo },
        caption: '⧼🐉┊ ايـديـت دراغـون بـول ┊🐉⧽',
        buttons: [
            {
                buttonId: '.دراجون بول',
                buttonText: {
                    displayText: '↬⌯الـ🔍ـمـزيـد‹◝'
                },
                type: 1
            }
        ],
        footer: `${global.gt}`,
        headerType: 4,
        viewOnce: true
    }, { quoted: m });
}

handler.command = ['دراغون بول', 'دراجون بول'];
handler.tags = ['fun', 'video'];
handler.help = ['فيديو عشوائي'];
handler.limit = 1
handler.register = true
export default handler;
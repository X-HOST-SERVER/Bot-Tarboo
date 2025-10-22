import axios from 'axios'

let handler = async (m, {
    conn,
    usedPrefix,
    args,
    command,
    text
}) => {
    let input = `[!] *wrong input*
	
Ex : ${usedPrefix + command} https://vm.tiktok.com/ZSL7p9jRV/`
    if (!text) return m.reply(input)
    try {
    await m.reply(wait)
    let {
        data
    } = await axios.get("https://api.tioxy.my.id" + '/api/tiktok?url=' + text)

   await conn.sendMessage(m.chat, {
        audio: {
            url: data.data.music_info.play
        },
        mimetype: 'audio/mpeg',
        fileName: `${data.data.music_info.title}.mp3`,
        ptt: false,
        contextInfo: {
            externalAdReply: {
                showAdAttribution: true,
                title: data.data.music_info.play,
                body: data.data.music_info.title,
                mediaType: 1,
                thumbnail: await (await conn.getFile(data.data.cover)).data,
                sourceUrl: text
            }
        }
    }, {
        quoted: m
    })
} catch (e) {
throw e
}
}

handler.help = ['tiktokmp3']
handler.tags = ['downloader']
handler.command = /^(تيك صوت|ttmp3)$/i
handler.limit = true
handler.register = true

export default handler
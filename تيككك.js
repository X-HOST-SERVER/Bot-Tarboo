global.dlTik = async (url) => {
  try {
    const response = await fetch(`https://the-end-api.vercel.app/api/download/tiktok-download?url=${url}`);
    
    if (!response.ok) {
      throw new Error(`فشل الطلب: ${response.statusText}`);
    }

    const json = await response.json();

    if (!json || !json.data) {
      throw new Error("لم يتم العثور على بيانات صالحة في الاستجابة.");
    }

    const { title, nowm, thumbnail, author, audio } = json.data;

    const cap = `
〘 🎵 〙العنوان : ${title}
〘 👤 〙الصانع : ${author}
`;

    await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: cap }, { quoted: m });
    await conn.sendMessage(m.chat, { video: { url: nowm } }, { quoted: m });
    await conn.sendMessage(m.chat, { audio: { url: audio }, mimetype: 'audio/mpeg', ptt: false }, { quoted: m });

  } catch (error) {
    console.error("خطأ أثناء تحميل فيديو تيك توك:", error);
    await conn.sendMessage(m.chat, { text: `❌ حدث خطأ: ${error.message}` }, { quoted: m });
  }
};

// كائن تحميل تيكتوك 
// ⛊  𝚂𝙰𝚈𝙴𝙳-𝚂𝙷𝙰𝚆𝙰𝚉𝙰
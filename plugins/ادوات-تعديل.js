import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";

const IMGBB_API_KEY = "bf0977b12b3fd31bf4cdb5f8ec4d0f11";
const EDIT_API = "https://api.joanimi-world.site/api/photoedit";

async function uploadToImgBB(buffer) {
  const blob = new Blob([buffer], { type: "image/jpeg" });
  const form = new FormData();
  form.append("image", blob, "uploaded-image.jpg");

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: form,
  });

  const result = await res.json();
  if (result.success) {
    return result.data.url;
  } else {
    throw new Error("فشل رفع الصورة إلى ImgBB");
  }
}

let handler = async (m, { conn, args, text, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!text) return m.reply("يرجى إدخال الوصف المطلوب.");
  if (!mime) return m.reply(`أرسل أو رد على صورة مع كتابة *${usedPrefix + command}*`);
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`رد على صوره يحب`);

  try {
    let imgData = await q.download();
    let imageUrl = await uploadToImgBB(imgData);

    let editResponse = `${EDIT_API}?url=${encodeURIComponent(imageUrl)}&prompt=${encodeURIComponent(text)}`;

    await conn.sendMessage(m.chat, { 
      image: { url: editResponse },
      caption: `✅ تم تعديل الصورة بنجاح`
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    m.reply(`خطأ: ${error.message}`);
  }
};

handler.tags = ["ai"];
handler.command = ["تعديل"];

export default handler;
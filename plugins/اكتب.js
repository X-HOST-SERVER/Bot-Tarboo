/*
كود كتابه عالصوره الي هترد عليها حقوق 
> @⁨𝘦𝘮𝘢𝘮 𝘢𝘣𝘰𝘭𝘦𝘭𝘢⁩⁩
> شعوذه
 https://whatsapp.com/channel/0029VaJxI9uJkK7BedTH0D11
*/
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { fileTypeFromBuffer } from 'file-type';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadToCatbox = async (buffer) => {
  const { ext } = await fileTypeFromBuffer(buffer);
  const form = new FormData();
  form.append('fileToUpload', buffer, `file.${ext}`);
  form.append('reqtype', 'fileupload');
  try {
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      body: form,
    });
    const text = await response.text();
    return text.startsWith('https://') ? text : Promise.reject('فشل الرفع');
  } catch (error) {
    throw new Error(`فشل في رفع الملف: ${error.message}`);
  }
};

const downloadFile = async (url, outputPath) => {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
};

const getImageDimensions = (imagePath) => {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(imagePath, (err, metadata) => {
      if (err) reject(err);
      const { width, height } = metadata.streams[0];
      resolve({ width, height });
    });
  });
};

const calculateFontSize = (text, width, height) => {
  const minDimension = Math.min(width, height);
  const baseSize = minDimension * 0.08; // 8% من أصغر بعد
  const avgCharWidth = baseSize * 0.6;
  const maxCharsPerLine = Math.floor((width * 0.9) / avgCharWidth);
  const lines = Math.ceil(text.length / maxCharsPerLine);
  const fontSize = Math.min(baseSize, (height * 0.8) / (lines * 1.5));
  return Math.max(20, Math.round(fontSize));
};

const wrapText = (text, maxCharsPerLine) => {
  const lines = [];
  let currentLine = '';
  
  text.split('\n').forEach(paragraph => {
    paragraph.split(' ').forEach(word => {
      if ((currentLine + word).length > maxCharsPerLine) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
      currentLine += word + ' ';
    });
    lines.push(currentLine.trim());
    currentLine = '';
  });
  
  return lines.filter(line => line);
};

let handler = async (m, { conn, text }) => {
  const fontUrl = 'https://fonts.gstatic.com/ea/lateef/v21/LateefRegOT.ttf';
  const outputDir = path.join(__dirname, '../temp');

  if (!m.quoted?.mimetype?.startsWith('image')) {
    return conn.sendMessage(m.chat, { text: "❗ يرجى الرد على صورة." }, { quoted: m });
  }

  if (!text) {
    return conn.sendMessage(m.chat, { text: "❗ يرجى إرسال النص المراد كتابته." }, { quoted: m });
  }

  !fs.existsSync(outputDir) && fs.mkdirSync(outputDir, { recursive: true });

  const imageBuffer = await m.quoted.download();
  const imagePath = path.join(outputDir, 'input.jpg');
  const fontPath = path.join(outputDir, 'font.ttf');
  const outputPath = path.join(outputDir, 'output.jpg');

  fs.writeFileSync(imagePath, imageBuffer);
  await downloadFile(fontUrl, fontPath);

  try {
    const { width, height } = await getImageDimensions(imagePath);
    const fontSize = calculateFontSize(text, width, height);
    const maxCharsPerLine = Math.floor((width * 0.9) / (fontSize * 0.6));
    const wrappedLines = wrapText(text, maxCharsPerLine);
    const lineSpacing = fontSize * 1.5;

    const drawtextFilters = wrappedLines.map((line, index) => {
      const yPosition = `(h-text_h)/2+${(index - (wrappedLines.length-1)/2) * lineSpacing}`;
      return `drawtext=
        text='${line.replace(/'/g, "'\\\\''")}':
        fontfile='${fontPath}':
        fontcolor=white@0.8:
        fontsize=${fontSize}:
        x=(w-text_w)/2:
        y=${yPosition}:
        bordercolor=black@0.8:
        borderw=2`;
    }).join(',');

    ffmpeg(imagePath)
      .outputOptions(['-vf', drawtextFilters])
      .on('end', async () => {
        const outputBuffer = fs.readFileSync(outputPath);
        const link = await uploadToCatbox(outputBuffer);
        
        await conn.sendMessage(
          m.chat,
          { 
            image: { url: link },
            caption: `✅ *تمت الكتابة بنجاح!*\n${link}`
          },
          { quoted: m }
        );

        [imagePath, fontPath, outputPath].forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
      })
      .on('error', (err) => {
        console.error('FFmpeg Error:', err);
        conn.sendMessage(m.chat, { text: `❌ خطأ فني: ${err.message}` }, { quoted: m });
      })
      .save(outputPath);
  } catch (error) {
    console.error(error);
    conn.sendMessage(m.chat, { text: "❌ فشل في معالجة الصورة" }, { quoted: m });
  }
};

handler.command = ["اكتب"];
export default handler;
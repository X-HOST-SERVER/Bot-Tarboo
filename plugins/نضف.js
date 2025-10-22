import FormData from "form-data";
import Jimp from "jimp";

async function processing(urlPath, method) {
	return new Promise(async (resolve, reject) => {
		let Methods = ["جمل", "لون", "نضف"];
		Methods.includes(method) ? (method = method) : (method = Methods[0]);
		let buffer,
			Form = new FormData(),
			scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
		Form.append("model_version", 1, {
			"Content-Transfer-Encoding": "binary",
			contentType: "multipart/form-data; charset=uttf-8",
		});
		Form.append("image", Buffer.from(urlPath), {
			filename: "enhance_image_body.jpg",
			contentType: "image/jpeg",
		});
		Form.submit(
			{
				url: scheme,
				host: "inferenceengine" + ".vyro" + ".ai",
				path: "/" + method,
				protocol: "https:",
				headers: {
					"User-Agent": "okhttp/4.9.3",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
				},
			},
			function (err, res) {
				if (err) reject();
				let data = [];
				res
					.on("data", function (chunk, resp) {
						data.push(chunk);
					})
					.on("end", () => {
						resolve(Buffer.concat(data));
					});
				res.on("error", (e) => {
					reject();
				});
			}
		);
	});
}

let handler = async (m, { conn, usedPrefix, command }) => {
	switch (command) {
		case "جمل":
			{
				conn.enhancer = conn.enhancer ? conn.enhancer : {};
				if (m.sender in conn.enhancer)
					throw "🔄 عملية تجميل الصورة لسه شغالة، اصبر شوية!";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `📷 فين الصورة؟`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `🚫 نوع الملف ${mime} غير مدعوم!`;
				else conn.enhancer[m.sender] = true;
				m.reply("⏳ جاري التجميل، استنى...");
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "enhance");
					conn.sendFile(m.chat, This, "", "👌 الصورة اتحسنت!", m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("😔 للأسف، فشل التجميل.");
					}
					delete conn.enhancer[m.sender];
				}
			}
			break;
		case "لون":
			{
				conn.recolor = conn.recolor ? conn.recolor : {};
				if (m.sender in conn.recolor)
					throw "🔄 عملية تلوين الصورة لسه شغالة، اصبر شوية!";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `🎨 فين الصورة؟`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `🚫 نوع الملف ${mime} غير مدعوم!`;
				else conn.recolor[m.sender] = true;
				m.reply("⏳ جاري التلوين، استنى...");
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "recolor");
					conn.sendFile(m.chat, This, "", "🎉 الصورة اتلوّنت!", m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("😔 للأسف، فشل التلوين.");
					}
					delete conn.recolor[m.chat];
				}
			}
			break;
		case "نضف":
			{
				conn.hdr = conn.hdr ? conn.hdr : {};
				if (m.sender in conn.hdr)
					throw "🔄 عملية تنظيف الصورة لسه شغالة، اصبر شوية!";
				let q = m.quoted ? m.quoted : m;
				let mime = (q.msg || q).mimetype || q.mediaType || "";
				if (!mime)
					throw `🧹 فين الصورة؟`;
				if (!/image\/(jpe?g|png)/.test(mime))
					throw `🚫 نوع الملف ${mime} غير مدعوم!`;
				else conn.hdr[m.sender] = true;
				m.reply("⏳ جاري التنظيف، استنى...");
				let img = await q.download?.();
				let error;
				try {
					const This = await processing(img, "dehaze");
					conn.sendFile(m.chat, This, "", "✨ الصورة نضفت!", m);
				} catch (er) {
					error = true;
				} finally {
					if (error) {
						m.reply("😔 للأسف، فشل التنظيف.");
					}
					delete conn.hdr[m.sender];
				}
			}
			break;
	}
};

handler.help = ["جمل", "لون", "نضف"];
handler.tags = ["ai"];
handler.limit = true;
handler.command = ["جمل", "لون", "نضف"];
export default handler;
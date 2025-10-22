import fetch from 'node-fetch'

global.AutoInsta = global.config?.AutoInsta ?? true  // تعيين القيمة من الإعدادات أو افتراضيًا إلى true

const instagramRegex = /(?:https?:\/)?(?:www\.)?(?:instagram\.com\/(reel|v|stories)\/|instagr\.am\/)([\w-]+)(?:\?utm_source=ig_web_copy_link)?/i

export async function before(m, { conn }) {
    if (!global.AutoInsta) return

    if (instagramRegex.test(m.text)) {
        try {
            await conn.sendMessage(m.chat, { react: { text: "⏳", key: m.key } })

            const encodedURL = encodeURIComponent(m.text.trim())
            const apiUrl = `https://the-end-api.vercel.app/home/sections/Download/api/Instagram/ajax?url=${encodedURL}`

            const response = await fetch(apiUrl)
            if (!response.ok) throw new Error(`فشل الاتصال بالخادم: ${response.statusText}`)

            const data = await response.json()
            if (!data.status || !data.data?.[1]?.url) throw new Error("لم يتم العثور على رابط التنزيل.")

            const downloadUrl = data.data[1].url

            await conn.sendMessage(m.chat, { video: { url: downloadUrl }, caption: "✅ تم التحميل بنجاح!" })
        } catch (err) {
            await conn.sendMessage(m.chat, { text: `❌ خطأ: ${err.message}` })
        }
    }
}
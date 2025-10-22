import fetch from "node-fetch";

const handler = async (m, { conn }) => {
    try {
        let today = new Date();
        let month = today.getMonth() + 1;
        let day = today.getDate();
        
        let url = `https://ar.wikipedia.org/api/rest_v1/feed/onthisday/events/${month}/${day}`;
        let response = await fetch(url);
        let data = await response.json();

        if (!data.events || data.events.length === 0) {
            throw new Error("⚠️ لا يوجد أحداث مسجلة لهذا اليوم.");
        }

        let event = data.events[Math.floor(Math.random() * data.events.length)];
        let year = event.year;
        let text = event.text;

        let message = `
*⊱⊹•─๋︩︪╾─•┈⧽┊🏮┊⧼┈•─╼─๋︩︪•⊹⊰*
*˼📜┊حادث فـي مـثـل هـذا الـيـوم┊📜˹*
*⊱⊹•─๋︩︪╾─•┈⧽┊🏮┊⧼┈•─╼─๋︩︪•⊹⊰*

*【⌚┇الـسـنـة ⟣ ${year} 】*
*【🗞️┇الـحـدث ⟣ ${text} 】*
*⊱⊹•─๋︩︪╾─•┈⧽┊🏮┊⧼┈•─╼─๋︩︪•⊹⊰*
> ${global.gt}`;

        conn.reply(m.chat, message, m);
    } catch (e) {
        conn.reply(m.chat, "⚠️ حدث خطأ أثناء جلب البيانات. حاول لاحقًا.", m);
    }
};

handler.help = ['حدث'];
handler.tags = ['fun'];
handler.command = /^حدث|تاريخ$/i;

export default handler;
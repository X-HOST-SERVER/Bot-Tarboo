import axios from 'axios';

let handler = async (m, { conn }) => {
    let jokes = [
        "مره واحده حامل ثلاث توائم سألوها إذا بتسمي الأول قالت : سمعت مريم نور بدو يكون اسمو نجم. قالت: ليش ما تسمي التوأم التاني كوكب؟ قالت: إذا جاءنا ولد تالت نسميه كوكب؟",
        "مرة واحد بلديتنا جاب مروحة ونام جنبها، ليش؟ قال علشان يحلم انه عصفور.",
        "مرة واحد اشترى عربيه جديدة، فتح باب الشقه عشان يدخلها.",
        "مرة واحد قال لمراته انا ضيعت المفتاح قالتلو طب افتح بالتاني قالها هو انا بقيت فتاحة علب بيبسي.",
        "مرة واحد صعيدي دخل الجامعة لأول مرة، سألوه انت ايه؟ قالهم: راسب."
    ];

    let randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

    let jokeMessage = `*نكتة اليوم:*\n${randomJoke}`;

    conn.reply(m.chat, jokeMessage, m);
};

handler.help = ['joke'];
handler.tags = ['fun'];
handler.command = /^(نكته)$/i;

export default handler;
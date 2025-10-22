import mongoose from "mongoose";

let uri = "mongodb+srv://itachi3mk:mypassis1199@cluster0.zzyxjo3.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Contacted 💤")).catch(err => console.error("Error :", err));

let madaraSchema = new mongoose.Schema({
    groupId: String,
    userId: String,
    madara: String,
    registeredAt: { type: Date, default: Date.now },
    registeredBy: String,
    customColor: { type: String, default: "" }
});

let madara = mongoose.model("madara", madaraSchema);

let formatTime = (date) => {
    return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
};

let createDecoFrame = (title) => {
    return `❐═━━━═╊⊰🐉⊱╉═━━━═❐
${title}
❐═━━━═╊⊰🐉⊱╉═━━━═❐
❮🥷┇尺月乙月ル🧧乃〇丁┇🩸❯`;
};

let errorMessage = (msg) => createDecoFrame(msg);
let successMessage = (msg) => createDecoFrame(msg);

let handler = async function (msg, { conn, text, command, isAdmin, isROwner, participants, groupMetadata }) {
    try {
        if (command === "حذف الالقاب" && !isROwner) {
            return msg.reply("❮ 🚫 ┇ هـذا الأمـر مـتـاح لـلـمـالـكـين فـقـط ❯");
        }

        let adminCommands = ["سجل", "حذف_لقب", "منشن", "احصاء", "الألقاب"];
        if (adminCommands.includes(command) && !isAdmin && !isROwner) {
            return msg.reply("❮ 🚫 ┇ هـذا الأمـر مـتـاح لـلـمـشـرفـين فـقـط ❯");
        }

        if (command === "حذف القاب الجميع") {
            if (!msg.isGroup) return msg.reply("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯");
            if (!isAdmin) return msg.reply("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً أو مالكاً لـلـتـنـفـيـذ ❯");

            await madara.deleteMany({ groupId: msg.chat });

            return msg.reply(successMessage("❮ ✅ ┇ تـم حـذف جـمـيـع الألـقـاب فـي هـذه الـمـجـمـوعـة ❯"));
        } else if (command === "الألقاب") {
            if (!msg.isGroup) {
                return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            }
            if (!isAdmin) {
                return msg.reply(errorMessage("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً لـلـتـنـفـيـذ ❯"));
            }

            let data = await madara.find({ groupId: msg.chat });
            if (data.length === 0) {
                return msg.reply(errorMessage("❮ ⭕ ┇ لا يـوجـد الـقـاب مـسـجـلـة بـعـد ❯"));
            }

            let list = createDecoFrame("◞ قـائـمـة الألـقـاب الـمـسـجـلـة ┇📜◜") + "\n\n";
            for (let item of data) {
                list += `⋄━──═◞⬪🏯⬪◟═──━⋄
〄╎الـمـنـشـن ⇐ @${item.userId}
〄╎الـلـقـب ⇐ ${item.madara}
〄╎تـاريـخ الـتـسـجـيـل ⇐ ${formatTime(item.registeredAt)}
⋄━──═◞⬪🏯⬪◟═──━⋄\n\n`;
            }
            
            return msg.reply(list, null, { mentions: data.map(d => d.userId + "@s.whatsapp.net") });

        } else if (command === "سجل") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            if (!isAdmin) return msg.reply(errorMessage("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً لـلـتـنـفـيـذ ❯"));
            
            if (!msg.mentionedJid?.[0] || !text?.trim()) {
                return msg.reply(createDecoFrame(`❐┃اسـتـخـدام خـاطـئ┃🛑❯
『حـط الامـر مـع مـنـشـن شـخـص مـع الـلـقب』
↞┇ مـثـال ↞.سجل @العضو رايزل`));
            }

            let mentionedUser = msg.mentionedJid[0].replace("@s.whatsapp.net", "");
            let nicknames = text.trim().split(" ").slice(1).filter(item => item.trim() !== "");
            let nickname = nicknames.join(" ");

            if (nickname.length > 20) {
                return msg.reply(errorMessage("❮ ❌ ┇ الـلـقـب يـجـب أن لا يـتـجـاوز 20 حـرفـاً ❯"));
            }

            let existingNickname = await madara.findOne({
                madara: nickname,
                groupId: msg.chat
            });

            if (existingNickname) {
                let takenBy = await conn.getName(existingNickname.userId + "@s.whatsapp.net");
                return msg.reply(createDecoFrame(`❮ ❌ ┇ الـلـقـب مـسـتـخـدم ❯
❮ 👤 ┇الـمـسـتـخـدم :   ${takenBy}  ❯
❮ 🎭 ┇ الـلـقـب:  ${nickname} ❯`));
            }

            await madara.findOneAndUpdate({
                userId: mentionedUser,
                groupId: msg.chat
            }, {
                madara: nickname,
                registeredBy: msg.sender.split("@")[0],
                registeredAt: new Date(),
                customColor: "🇮🇹"
            }, {
                upsert: true
            });

            return msg.reply(successMessage(`❮ ✅ ┇ تـم تـسـجـيـل الـلـقـب بـنـجاح ❯

❮ 👤 ┇الـعـضـو: @${mentionedUser} ❯
❮ 🎭 ┇الـلـقـب : ${nickname} ❯
❮ 📅 ┇تـاريـخ الـتـسـجـيل : ${formatTime(new Date())} ❯`), null, {
                mentions: [mentionedUser + "@s.whatsapp.net"]
            });
        } else if (command === "حذف الالقاب") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            if (!isAdmin) return msg.reply(errorMessage("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً لـلـتـنـفـيـذ ❯"));

            await madara.deleteMany({});

            return msg.reply(successMessage("❮ ✅ ┇ تـم حـذف جـمـيـع الألـقـاب الـمـسـجـلـة لـكـل الأعـضـاء فـي كـل الـمـجـمـوعـات ❯"));

        } else if (command === "منشن") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            if (!isAdmin) return msg.reply(errorMessage("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً لـلـتـنـفـيـذ ❯"));

            let groupAdmins = participants.filter(p => p.admin);
            let mentionText = createDecoFrame("❮ 🐉 ┇ الـمـنـشـن الـجـمـاعـي ❯") + "\n\n";

            for (let admin of groupAdmins) {
                let adminId = admin.id.split('@')[0];
                let nickname = await madara.findOne({
                    userId: adminId,
                    groupId: msg.chat
                });
                mentionText += `❐═━━━═╊⊰🐉⊱╉═━━━═❐
❮ 👤┇ @${adminId} ❯
❮ 🎭┇${nickname ? ` | ${nickname.madara}` : "(لا يـوجـد لـقـب)"} ❯
❐═━━━═╊⊰🐉⊱╉═━━━═❐\n\n`;
            }

            let regularMembers = participants.filter(p => !p.admin);
            if (regularMembers.length > 0) {
                mentionText += createDecoFrame("【🩸┇الاعضاء┇🥷】") + "\n\n";
                for (let member of regularMembers) {
                    let userId = member.id.split('@')[0];
                    let nickname = await madara.findOne({
                        userId: userId,
                        groupId: msg.chat
                    });
                    mentionText += `⋄━──═◞⬪🔥⬪◟═──━⋄
❮ 👤┇ @${userId} ❯
❮ 🎭┇${nickname ? ` | ${nickname.madara}` : "(لا يـوجـد لـقـب)"} ❯
⋄━──═◞⬪🔥⬪◟═──━⋄\n\n`;
                }
            }

            mentionText += createDecoFrame(`❮ 👨‍💻 ┇تـم الـمـنـشـن بـواسـطـة: @${msg.sender.split('@')[0]} ❯`);
            return msg.reply(mentionText, null, {
                mentions: [...participants.map(a => a.id), msg.sender]
            });
        } else if (command === "لقبي") {
            try {
                let senderId = msg.sender.split("@")[0];
                let userNickname = await madara.findOne({
                    userId: senderId,
                    groupId: msg.chat
                });

                if (userNickname) {
                    return msg.reply(createDecoFrame(`❮ 📍┇ مـعلـومـات لـقـبـك ❯

❮ 👤 ┇مـنـشـنـك : @${senderId} ❯
❮ 🎭 ┇لـقـبـك : ${userNickname.madara} ❯
❮ 📅 ┇سُـجِـل بـتـاريـخ: ${formatTime(userNickname.registeredAt)} ❯
❮ 👑 ┇سُـجِـل بـواسِـطـة : @${userNickname.registeredBy} ❯`), null, {
                        mentions: [msg.sender, userNickname.registeredBy + "@s.whatsapp.net"]
                    });
                }
                
                return msg.reply(errorMessage("❮ ❌ ┇لـم يـتـم تـسـجـيـل لـقـب لـك بـعـد ❯"));
            } catch (error) {
                console.error("Error:", error);
                return msg.reply(errorMessage("❮ ❌ ┇حـدث خـطـأ أثـنـاء جـلـب لـقـبـك ❯"));
            }
        } else if (command === "احصاء") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));

            let totalNicknames = await madara.countDocuments({ groupId: msg.chat });
            let latestNicknames = await madara.find({ groupId: msg.chat })
                .sort({ registeredAt: -1 })
                .limit(3);

            let stats = createDecoFrame("❮ 📊 ┇إحـصـائـيـات الألـقـاب ❯") + "\n\n";
            stats += `⋄━──═◞⬪🏯⬪◟═──━⋄
❮ 👥 ┇عـدد الألـقـاب الـمـسـجـلـة :  ${totalNicknames} ❯
〄╎آخـر الألـقـاب الـمـسـجـلـة:
${latestNicknames.map(n => `❮ 👤 ┇@${n.userId}: ${n.madara} ❯`).join('\n')}
❐═━━━═╊⊰🏯⊱╉═━━━═❐`;

            return msg.reply(stats, null, {
                mentions: latestNicknames.map(n => n.userId + "@s.whatsapp.net")
            });
        } else if (command === "بحث لقب") {
    if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـموح فـقـط فـي الـمـجـمـوعـات ❯"));
    if (!text) return msg.reply(errorMessage(`❐┃اسـتـخـدام خـاطـئ┃🛑❯
『اكـتـب الـحـرف الـذي تـريـد الـبـحـث عـنـه』
↞┇ مـثـال ↞.بحث لقب أ`));

    const searchResults = await madara.find({
        groupId: msg.chat,
        madara: { $regex: `^${text}`, $options: 'i' }
    });

    if (searchResults.length === 0) {
        return msg.reply(errorMessage("❮ 🎭 ┇لا تـوجـد ألـقـاب تـبـدأ بـهـذا الـحـرف ❯"));
    }

    let results = createDecoFrame(`〄╎نـتـائج الـبـحـث عـن الألـقـاب الـتـي تـبـدأ بـ : ${text}`) + "\n\n";
    for (const result of searchResults) {
        results += `⋄━──═◞⬪🏯⬪◟═──━⋄
❮ 👤 ┇صـاحـب الـلـقـب : @${result.userId} ❯
❮ 🎭 ┇الـلـقـب : ${result.madara} ❯
⋄━──═◞⬪🏯⬪◟═──━⋄\n\n`;
    }

    return msg.reply(results, null, {
        mentions: searchResults.map(r => r.userId + "@s.whatsapp.net")
    });
} else if (command === "لقب") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            if (!text) return msg.reply(errorMessage(`❐┃اسـتـخـدام خـاطـئ┃🛑❯
『حـط الـلـقـب الـلـي تـبـي تـعـرف إذا مـتـوفـر او مـأخـوذ』
↞┇ مـثـال ↞.لـقـب زاك`));

            const searchResults = await madara.find({
                groupId: msg.chat,
                madara: { $regex: text, $options: 'i' }
            });

            if (searchResults.length === 0) {
                return msg.reply(errorMessage("❮ 🎭 ┇هـذا الـلـقـب مـتـوفـر ❯"));
            }

            let results = createDecoFrame(`〄╎نـتـائـج الـبـحـث عـن لـقـب : ${text}`) + "\n\n";
            for (const result of searchResults) {
                results += `⋄━──═◞⬪🦇⬪◟═──━⋄
❮ 👤 ┇صـاحـب الـلـقـب : @${result.userId} ❯
❮ 🎭 ┇الـلـقـب : ${result.madara} ❯
⋄━──═◞⬪🏯⬪◟═──━⋄\n\n`;
            }

            return msg.reply(results, null, {
                mentions: searchResults.map(r => r.userId + "@s.whatsapp.net")
            });
        } else if (command === "حذف_لقب") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            if (!isAdmin) return msg.reply(errorMessage("❮ 📈 ┇ يـجـب أن تـكـون مـشـرفـاً لـلـتـنـفـيـذ ❯"));
            if (!text) return msg.reply(errorMessage(`❐┃اسـتـخـدام خـاطـئ┃🛑❯
『حـط الـلـقـب الـلـي تـبـي تـحـذفـه』
↞┇ مـثـال ↞.حذف_لقب ناروتو`));

            let nicknameToDelete = text.trim();
            let nicknameData = await madara.findOne({
                madara: nicknameToDelete,
                groupId: msg.chat
            });

            if (!nicknameData) {
                return msg.reply(errorMessage("❮ 🎭 ┇هـذا الـلـقـب غـيـر مـوجـود أصـلاً ❯"));
            }

            await madara.deleteOne({
                madara: nicknameToDelete,
                groupId: msg.chat
            });

            return msg.reply(successMessage(`❮ ✅ ┇تـم حـذف الـلـقـب بـنـجـاح ❯

❮ 👤 ┇الـعـضـو: @${nicknameData.userId} ❯
❮ 🎭┇الـلـقـب الـمـحـذوف: ${nicknameToDelete} ❯
❮ 📅 ┇تـاريـخ الـحـذف: ${formatTime(new Date())} ❯`), null, {
                mentions: [nicknameData.userId + "@s.whatsapp.net"]
            });
        } else if (command === "لقبه") {
            if (!msg.isGroup) return msg.reply(errorMessage("❮ 🔰 ┇ هـذا الامـر مـسـمـوح فـقـط فـي الـمـجـمـوعـات ❯"));
            
            if (!msg.mentionedJid?.[0]) {
                return msg.reply(errorMessage(`❐┃اسـتـخـدام خـاطـئ┃🛑❯
『مـنـشـن الـعـضـو الـمُـراد مـعـرفـة لـقـبـه جـنـب الأمـر』
↞┇ مـثـال ↞.لقبه @عضو`));
            }

            const mentionedUser = msg.mentionedJid[0].replace("@s.whatsapp.net", "");
            const userNickname = await madara.findOne({
                userId: mentionedUser,
                groupId: msg.chat
            });

            if (!userNickname) return msg.reply(errorMessage("❮ ❌ ┇لـم يـتـم تـسـجـيـل لـقـب لـهـذا الـعـضـو بـعـد ❯"));

            const userName = await conn.getName(msg.mentionedJid[0]);
            return msg.reply(createDecoFrame(`〄╎مـعـلـومـات لـقـب : ${userName}

❮ 👤 ┇الـعـضـو : @${mentionedUser} ❯
❮ 🎭 ┇الـلـقـب : ${userNickname.madara} ❯`), null, {
                mentions: [msg.mentionedJid[0]]
            });
        }
    } catch (err) {
        console.error("Error:", err);
        return msg.reply("❮ ❌ ┇حـدث خـطـأ غـيـر مـتـوقـع ❯");
    }
}

handler.command = ["الألقاب", "سجل", "لقبي", "لقبه", "حذف_لقب", "لقب", "منشن", "احصاء", "حذف الالقاب", "حذف القاب الجميع","بحث لقب"];
handler.admin = true;
export default handler;
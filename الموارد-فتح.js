const itemMapping = {
    money: '┇💲‣ نــقــود',
    exp: '┇🆙‣ الــخــبــرة',
    trash: '┇🗑️‣ قــمــامــة',
    potion: '┇🏺‣ جــرعــة',
    diamond: 'الــمــاس',
    wood: '┇🪵‣  خــشــب',
    rock: '┇🪨‣  حــجــر',
    string: '┇🕸‣ خــيــط',
    emerald: 'زمــــرد',
    berlian: '┇⚙‣ فــضــة',
    iron: '┇🔩‣ حــديــد',
    pet: 'حــيــوان',
    petFood: '┇🍖‣ لــحــم',
    gold: '┇🪙‣ ذهــــب',
    uncommon: 'شائع', // تعريف النص الظاهر لهذا النوع
    common: 'نادر',
    legendary: 'اسطوري',
    mythic: 'خرافي',
};

function getArabicItemName(item) {
    return itemMapping[item] || item;
}

// تعريف صندوق Uncommon والمكافآت الخاصة به
const rewards = {
    uncommon: {
        money: 1501,
        exp: 4001,
        gold: 100,
        trash: 351,
        potion: [0, 1, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0, 0],
        rock: [0, 1, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0]
    },
    common: {
        money: 2001,
        exp: 5001,
        gold: 200,
        trash: 501,
        potion: [0, 1, 0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    legendary: {
        money: 1501,
        exp: 7000,
        berlian: 350,
        trash: 901,
        potion: [0, 1, 0, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0],
        rock: [0, 1, 0, 0, 0],
        string: [0, 1, 0, 0, 0]
    },
    mythic: {
        money: 4000,
        exp: 8000,
        gold: 500,
        trash: 1400,
        potion: [0, 1, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        berlian: [0, 1, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0],
        rock: [0, 1, 0, 0],
        string: [0, 1, 0, 0]
    },
};

let handler = async (m, { command, args, usedPrefix }) => {
    let more = String.fromCharCode(8206);
    let done = '📦';
    m.react(done);
    let user = global.db.data.users[m.sender];
    let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user));
    let type = (args[0] || '').toLowerCase();
    type = Object.keys(itemMapping).find(key => itemMapping[key] === type) || type; // Convert Arabic item name to English if applicable
    let info = `> *˼📍˹ اســتــخــدم الــتــنــســيــق╿↶*
> *˼📍˹ ${usedPrefix}${command} [الـصـنـدوق] [الـعـدد]╿↶*
> *˼📍˹ مــثــال الاســتــخــدام╿↶*
> *˼📍˹ .فــتــح اســطــوري 10*
> *˼🧰˹ قــائــمــة الــصــنــاديــق╿↶*
*╮──────────────────⟢ـ*
${Object.keys(listCrate).map((v) => `
*┇〉 ${rpg.emoticon(v)} ${getArabicItemName(v)} ┇ ${user[v]}*
`.trim()).join('\n')}
*╯──────────────────⟢ـ*`.trim();

    let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1;

    if (!(type in listCrate)) return m.reply(info);
    if (user[type] < count) return m.reply(`
${rpg.emoticon(type)} *الصناديق التي لديك لا تكفي!* \n*انت تملك ${user[type]} ${rpg.emoticon(type)} صندوق ${getArabicItemName(type)}*
*اكتب '.شراء  ${getArabicItemName(type)} ${count - user[type]}' للشراء*
`.trim());

    let crateReward = {};
    for (let i = 0; i < count; i++) {
        for (let [reward, value] of Object.entries(listCrate[type])) {
            if (reward in user) {
                const total = value.getRandom();
                if (total) {
                    user[reward] += total * 1;
                    crateReward[reward] = (crateReward[reward] || 0) + (total * 1);
                }
            }
        }
    }

    user[type] -= count * 1;
    m.reply(`> *لــقــد فــتــحــت ${count} صــنــدوق ${getArabicItemName(type)}*\n> *وقـــد حـــصـــلـــت عـــلـى 🎁╿↶*\n*╮──────────────────⟢ـ*
${Object.keys(crateReward).filter(v => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/i.test(v)).map(reward => `
*${getArabicItemName(reward)}: ${crateReward[reward]}*
`.trim()).join('\n')}
*╯──────────────────⟢ـ*`.trim());

    let diamond = crateReward.diamond, mythic = crateReward.mythic, pet = crateReward.pet, legendary = crateReward.legendary, emerald = crateReward.emerald;
    if (mythic || diamond) m.reply(`> *🎉تــهــانــيــنــا، لــقــد حــصــلــت عــلــى عــنــصــر نــادر، وهــو🎁╿↶*\n*╮──────────────────⟢ـ*
${diamond ? `*💎‣ ${diamond} ${getArabicItemName('diamond')}*` : ''}${diamond && mythic ? '  ' : ''}${mythic ? `*📦‣ ${mythic} ${getArabicItemName('mythic')}*` : ''}
*╯──────────────────⟢ـ*`.trim());

    if (pet || legendary || emerald) m.reply(`> *🎉تـهـانـيـنـا، لـقـد حـصـلـت عـلـى عـنـصـر مـلـحـمـي، وهــو🎁╿↶*\n*╮──────────────────⟢ـ*\n${pet ? `*🦴‣ ${pet} ${getArabicItemName('pet')}*` : ''}  ${pet  && legendary && emerald ? '' : (pet && legendary || legendary && emerald || emerald && pet) ? '' : ''}${legendary ? `*📦‣ ${legendary} ${getArabicItemName('legendary')}*` : ''}${pet && legendary && emerald ? '' : ''}${emerald ? ` *✧ ‣ ${emerald} ${getArabicItemName('emerald')}*` : ''}
*╯──────────────────⟢ـ*`.trim());
};

handler.help = ['فتح','open', 'gacha'].map(v => v + ' [crate] [count]');
handler.tags = ['econ'];
handler.command = /^(فتح|open|buka|gacha)$/i;

export default handler;

function isNumber(number) {
    if (!number) return number;
    number = parseInt(number);
    return typeof number == 'number' && !isNaN(number);
}
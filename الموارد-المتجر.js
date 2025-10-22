import db from '../lib/database.js'

const itemMapping = {
    money: '💲‣ نـقـود',
    exp: '🆙‣ خــبــرة',
    trash: '🗑️‣ قـمـامـة:',
    potion: '🏺‣ جـرعـة:',
    diamond: '💎‣ الـمـاس:',
    wood: '🪵‣  خـشـب:',
    rock: '🪨‣  حـجـر:',
    string: '🕸‣ خـيـط:',
    emerald: ' ✧ ‣  زمــرد',
    berlian: '⚙‣ فـضـة:',
    iron: '🔩‣ حـديـد:',
    pet: '🦴‣حـيـوان:',
    petFood: '🍖‣ لـحـم:',
    gold: '🪙‣ ذهــب:',
    uncommon: '📦‣ شـائـع',
    common: '📦‣ نـادر',
    legendary: '📦‣ اسـطـوري',
    mythic: '📦‣ خـرافـي',
};

let handler = async (m, { command, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];
    String.fromCharCode(8206);
    let done = '🛒';
    m.react(done);
    const items = {
        شراء: {
            diamond: { money: 50000 },
            potion: { money: 3250,},
            wood: { money: 1450 },
            rock: { money: 1850 },
            string: { money: 2700 },
            iron: { money: 6500 },
            uncommon: { money: 15000 },
            common: { money: 20000 },
            legendary: { money: 25000},
            mythic: { money: 30000 },
        },
        بيع: {
            potion: {money: 200 },
            trash: { money: 5 },
            wood: { money: 600 },
            rock: { money: 750 },
            string: { money: 300 },
            iron: { money: 2500 },
            gold: { money: 5000 },
            diamond: { money: 10000 },
            emerald: { money: 10000 },
            pet: { money: 9000 },
            petFood: { money: 5000 },
        }
    };

    // Function to get the Arabic item name from the English name
    function getArabicItemName(itemName) {
        return itemMapping[itemName] || itemName; // إرجاع الاسم العربي أو الاسم الأصلي إذا لم يتم العثور على الاسم
    }

    // Function to calculate profit or loss
    function calculateProfit(user, item, total, command) {
        const itemPrice = items[command][item].money;

        if (command === 'شراء') {
            // حساب الكلفة الإجمالية للشراء
            return total * itemPrice;
        } else {
            // حساب الإيراد الإجمالي للبيع
            return total * itemPrice;
        }
    }

    const listItems = Object.fromEntries(
        Object.entries(items[command.toLowerCase()])
            .filter(([item]) => item && item in user)
    );

    const info = `> *˼📍˹ اســتــخــدم الــتــنــســيــق╿↶*
> *˼📍˹ ${usedPrefix}${command} [الـغـرض] [الـكـمـيـة]*
> *˼📍˹ مــثــال الاســتــخــدام╿↶*
> *˼📍˹ ${usedPrefix}${command} الــمــاس 10*
> *˼📍˹ قــائــمــة الــعــنــاصــر╿↶*
*╮──────────────────⟢ـ*
${Object.keys(listItems).map((item) => {
        let paymentMethod = Object.keys(listItems[item])[0];
        let itemName = getArabicItemName(item); // الحصول على طريقة الدفع
        return `*┇${itemName} | ${listItems[item][paymentMethod]} نــقــود💲*`.trim();
    }).join('\n')}
*╯──────────────────⟢ـ*`.trim();

    let item = (args[0] || '').toLowerCase();

    // التعامل مع أسماء العناصر المستعارة         
    if (item === 'جرعة') {
        item = 'potion';
        args[0] = 'potion'; 
    } else if (item === 'الماس') {
        item = 'diamond';
        args[0] = 'diamond';                                                
    } else if (item === 'قمامة') {
        item = 'trash';
        args[0] = 'trash'; 
    } else if (item === 'خشب') {
        item = 'wood';
        args[0] = 'wood'; 
    } else if (item === 'حجر') {
        item = 'rock';
        args[0] = 'rock'; 
    } else if (item === 'نابض') {
        item = 'string';
        args[0] = 'string'; 
    } else if (item === 'حديد') {
        item = 'iron';
        args[0] = 'iron'; 
    } else if (item === 'شائع') {
        item = 'uncommon';
        args[0] = 'uncommon'; 
    } else if (item === 'نادر') {
        item = 'common';
        args[0] = 'common'; 
    } else if (item === 'خرافي') {
        item = 'mythic';
        args[0] = 'mythic'; 
    } else if (item === 'اسطوري') {
        item = 'legendary';
        args[0] = 'legendary'; 
    } else if (item === 'زمرد') {
        item = 'emerald';
        args[0] = 'emerald'; 
    }else if (item === 'فضة') {
        item = 'gold';
        args[0] = 'gold'; 
    }else if (item === 'خيط') {
        item = 'string';
        args[0] = 'string'; 
    }else if (item === 'حيوان') {
        item = 'pet';
        args[0] = 'pet'; 
    }else if (item === 'لحم') {
        item = 'petFood';
        args[0] = 'petFood'; 
    }

    const total = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1);

    if (!listItems[item]) return m.reply(info);

    const profit = calculateProfit(user, item, total, command);

    if (command === 'شراء') {
        let paymentMethod = Object.keys(listItems[item])[0]; // الحصول على طريقة الدفع
        if (user[paymentMethod] < listItems[item][paymentMethod] * total) {
            let itemName = getArabicItemName(item);
            let paymentMethodName = getArabicItemName(paymentMethod);
            let remainingAmount = (listItems[item][paymentMethod] * total) - user[paymentMethod];
            return m.reply(`> *˼‼️˹ لا يـــكـــفـــي╿↶*\n*╮──────────────────⟢ـ*\n*┇لـشـراء ${total} ${itemName}❗*\n*┇تـحـتـاج إلـى* *${remainingAmount}$💸*\n*┇لـتـكـون قـادرًا عـلـى شـراءه💰🍀*\n*╯──────────────────⟢ـ*\n> *إستخدم امر [ .محفظة ] للإستطلاع على نقودك الحالي او الجديد!.*`);
        }
        user[paymentMethod] -= listItems[item][paymentMethod] * total;
        user[item] += total;
        let itemName = getArabicItemName(item);
        return m.reply(`> *˼‼️˹ لـــقـــد اشـــتـــريـــت╿↶*\n*╮──────────────────⟢ـ*\n*┇${itemName} ${total}*\n*┇💸‣ كـــمـــيـــة الـــصرف: ${profit}$*\n*┇📊‣ الرصيد الحالي: ${user.money}$*\n*╯──────────────────⟢ـ*\n> *إستخدم امر [ .محفظة ] للإستطلاع على نقودك الحالي او الجديد!.*`);
    } else {
        if (user[item] < total) {
            let itemName = getArabicItemName(item);
            return m.reply(`> *˼‼️˹ لـيـس لـديـك مـا يـكـفـي مـن╿↶*\n*╮──────────────────⟢ـ*\n*┇${itemName}*\n*┇لـلـبـيـع، لــديــك فــقــط ${user[item]} مــنــه*\n*╯──────────────────⟢ـ*\n> *إستخدم امر [ .محفظة ] للإستطلاع على نقودك الحالي او الجديد!.*`);
        }
        user[item] -= total;
        user.money += listItems[item][Object.keys(listItems[item])[0]] * total;
        let itemName = getArabicItemName(item);
        return m.reply(`> *˼‼️˹ لــــقــــد بــــعــــت╿↶*\n*╮──────────────────⟢ـ*\n*┇${itemName} ${total}*\n*┇💸‣ ربـــح البـــيـــع: ${profit}$*\n*┇📊‣ الرصيد الحالي: ${user.money}$*\n*╯──────────────────⟢ـ*\n> *إستخدم امر [ .محفظة ] للإستطلاع على نقودك الحالي او الجديد!.*`);
    }
};

handler.help = ['buy', 'sell', 'بيع', 'شراء'].map((v) => v + '[item] [count]');
handler.tags = ['rpg'];
handler.command = /^(بيع|شراء)$/i;

handler.disabled = false;
handler.group = true

export default handler;

function isNumber(number) {
    return !isNaN(parseInt(number)) && isFinite(number);
}
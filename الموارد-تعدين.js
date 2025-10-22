const itemMapping = {
  money: '💲‣ نــقــود',
  exp: '🆙‣ الــخــبــرة',
  trash: '🗑️‣ قــمــامــة',
  potion: '🏺‣ جــرعــة',
  diamond: '💎‣ الــمــاس',
  wood: '🪵‣  خــشــب',
  rock: '🪨‣  حــجــر',
  string: '🕸‣ خــيــط',
  emerald: ' ✧ ‣  زمــــرد',
  berlian: '⚙‣ فــضــة',
  iron: '🔩‣ حــديــد',
  pet: '🦴‣ حــيــوان',
  petFood: '🍖‣ لــحــم',
  gold: '🪙‣ ذهــــب',
  uncommon: '📦‣ شائع',
  common: '📦‣ نادر',
  legendary: '📦‣ اسطوري',
  mythic: '📦‣ خرافي',
};

function getArabicItemName(item) {
  return itemMapping[item] || item;
}
const cooldown = 1640000;

let handler = async (m, { usedPrefix }) => {
  let more = String.fromCharCode(8206);
  let done = '⛏️';
  m.react(done);

  let user = global.db.data.users[m.sender];
  let time = user.lastmining + cooldown;
  if (user.pickaxe == 0) return m.reply('*╮──────────────────⟢ـ*\n*┇‣ ❏ للتعدين تحتاج إلـى مـعـول╿↶*\n*┇‣ ❏〘  ˼⛏️˹  〙*\n*╯──────────────────⟢ـ*\n> *˼📜˹ نــــصــــائــــح╿↶*\n*▢ ~اكــتــب~ " .صــنــاعــة "*\n> *⏎* *عـــشــان تــعــرف كــيــف تــصــنــع الــمــعــول*')

  if (user.health < 80) {
    return m.reply(`*⛏️يــتــطــلــب %80 صــحــة لــلــتــعــديــن❤️‍🩹*\n> *يــرجــى شــراء الصــحــة اولاً*\n> *بــاســتــخــدام الأمــر " .هــيــل "*`.trim());
  }

  if (new Date() - user.lastmining < cooldown) {
    throw `*أنـت بالـفـعـل قــمـت بـالـتـعـديـن!!⛏️*\n> *يــرجــى الإنــتــظــار╿↶*\n> *${msToTime(time - new Date())}🕒*`;
  }

  const rewards = reward(user);
  let text = "> *لقد قمت بالتعدين ~وخسرت⛏️~*";

  for (const lost in rewards.lost) {
    if (user[lost]) {
      const total = rewards.lost[lost].getRandom();
      user[lost] -= total * 1;
      if (total) text += `~*-${total}*~\n> *نــقــطــة مــن صــحــتــك❤️‍🩹*`;
    }
  }

  text += '\n*ولــكــنــك حــصــلــت عــلــى 🎁╿↶*';

  for (const rewardItem in rewards.reward) {
    if (rewardItem in user) {
      const total = rewards.reward[rewardItem].getRandom();
      user[rewardItem] += total * 1;
      if (total) text += `\n*┆${itemMapping[rewardItem]}: ${total}*`;
    }
  }

  m.reply(text.trim());
  user.lastmining = new Date() * 1;
};

handler.help = ['mine', 'mining', 'تعدين', 'استخراج'];
handler.tags = ['rpg'];
handler.command = /^(تعدين|منجم|استخراج|mine|mining)$/i

handler.cooldown = cooldown;
handler.disabled = false;
handler.level = 10;

export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ' ســاعــة و ' + minutes + ' دقــائــق';
}

function reward(user = {}) {
  let rewards = {
    reward: {
      money: 19001,
      exp: 19001,
      credit: 1499,
      trash: 2901,
      wood: 0,
      rock: 15,
      potion: 5,
      string: 25,
      emerald: 6,
      common: 30 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
      uncommon: [0, 0, 8, 0, 12, 0, 0, 6, 0].concat(
        new Array(5 - (
          (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
        )).fill(0)
      ),
      mythic: [0, 7, 0, 2, 0, 3, 0, 5, 0].concat(
        new Array(8 - (
          (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
        )).fill(0)
      ),
      legendary: [0, 9, 0, 4, 0, 3, 0, 6, 0, 0].concat(
        new Array(10 - (
          (user.dog > 8 && user.dog) || 4
        )).fill(0)
      ),
      iron: [0, 0, 0, 5, 0, 0],
      gold: [0, 0, 0, 0, 0, 3, 0],
      diamond: [0, 0, 0, 4, 0, 0, 5, 0].concat(
        new Array(5 - (
          (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
        )).fill(0)
      ),
    },
    lost: {
      health: 101 - user.cat * 4
    }
  };
  return rewards;
}
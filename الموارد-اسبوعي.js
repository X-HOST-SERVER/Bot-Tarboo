const itemMapping = {
  money: '┇〉💲‣ نــقــود',
  exp: '┇〉🆙‣ الــخــبــرة',
  trash: '┇〉🗑️‣ قــمــامــة',
  potion: '┇〉🏺‣ جــرعــة',
  diamond: '┇〉💎‣ الــمــاس',
  wood: '┇〉🪵‣  خــشــب',
  rock: '┇〉🪨‣  حــجــر',
  string: '┇〉🕸‣ خــيــط',
  emerald: '┇〉 ✧ ‣  زمــــرد',
  berlian: '┇〉⚙‣ فــضــة',
  iron: '┇〉🔩‣ حــديــد',
  pet: '┇〉🦴‣حــيــوان',
  petFood: '┇〉🍖‣ لــحــم',
  gold: '┇〉🪙‣ ذهــــب',
  uncommon: '┇〉📦‣ شــائــع',
  common: '┇〉📦‣ نــادر',
  legendary: '┇〉📦‣ اســطــوري',
  mythic: '┇〉📦‣ خــرافــي',
};

const rewards = {
   exp: 55000,
   money: 25000,
   trash: 9500,
   legendary: 8,
   common: 4,
   uncommon: 8,
   };
  const cooldown = 604800000

let handler = async (m, { conn, usedPrefix, isPrems }) => {
  let more = String.fromCharCode(8206);
  let done = '🥈';
  m.react(done);
  let user = global.db.data.users[m.sender];
  let time = user.lastweekly + cooldown;
  if (new Date() - user.lastweekly < cooldown) throw `*لــقــد قــمــت بــالــفــعــل بــالمــطــالــبــة بــالــمــكــافــأة الأســبــوعــيــة🥈،*\n*انــتــظــر ❗*\n*🕒${msToTime(time - new Date())}*`;

  let text = ''; // Move the declaration here
  function getArabicRewards(userRewards) {
    for (let reward of Object.keys(userRewards)) {
      if (!(reward in itemMapping)) continue;
      user[reward] += rewards[reward];
      text += ` *${itemMapping[reward]} | +${userRewards[reward]}*\n`;
    }
    return text;
  }
m.reply(`> *🥈 الــمــكــافــأة الأســبــوعــيــة╿↶*
> *🎁 لــقــد تــلــقــيــت╿↶*
*╮──────────────────⟢ـ*
${getArabicRewards(rewards)}*╯──────────────────⟢ـ*`);

user.lastweekly = new Date() * 1;
};

handler.help = ['اسبوعي','weekly',''];
handler.tags = ['xp'];
handler.command = /^(اسبوعي|weekly)$/i;

handler.cooldown = cooldown;
export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 168);;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ' ســاعــة و ' + minutes + ' دقــائــق';
}
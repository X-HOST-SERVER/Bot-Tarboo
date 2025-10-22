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
   exp: 135000,
   money: 45000,
   trash: 9500,
   mythic: 14,
   legendary: 6,
   common: 4,
   uncommon: 8,
   };
const cooldown = 2592000000

let handler = async (m, { conn, usedPrefix, isPrems }) => {
  let more = String.fromCharCode(8206);
  let done = '🥇';
  m.react(done);
  let user = global.db.data.users[m.sender];
  let time = user.lastmonthly + cooldown;
  if (new Date() - user.lastmonthly < cooldown) throw `*لــقــد قــمــت بــالــفــعــل بــالمــطــالــبــة بــالــمــكــافــأة الــشــهــريــة🥇،*\n*انــتــظــر ❗*\n*🕒${msToTime(time - new Date())}*`;

  let text = ''; // Move the declaration here
  function getArabicRewards(userRewards) {
    for (let reward of Object.keys(userRewards)) {
      if (!(reward in itemMapping)) continue;
      user[reward] += rewards[reward];
      text += ` *${itemMapping[reward]} | +${userRewards[reward]}*\n`;
    }
    return text;
  }
m.reply(`> *🥇 الــمــكــافــأة الــشــهــريــة╿↶*
> *🎁 لــقــد تــلــقــيــت╿↶*
${getArabicRewards(rewards)}*╯──────────────────⟢ـ*`);

user.lastmonthly = new Date() * 1;
};

handler.help = ['شهريا','شهري','monthly'];
handler.tags = ['xp'];
handler.command = /^(شهري|شهريا|monthly)$/i

handler.cooldown = cooldown;
export default handler;

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 720);;

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ' ســاعــة و ' + minutes + ' دقــائــق';
}
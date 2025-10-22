import axios from 'axios';

const handler = async (m, { command, conn, usedPrefix }) => {
  const res = await axios.get(`https://api.waifu.pics/sfw/${command}`);
  const imageUrl = res.data.url;

  conn.sendButton(m.chat, `_${command}_`.trim(), author, imageUrl, [['『الي بعدوو⚡️』', `${usedPrefix + command}`]], m);
  m.react('🖼');
};

handler.command = handler.help = [
  'waifu', 'neko', 'shinobu', 'megumin', 'bully', 'cuddle', 'cry', 'hug', 
  'awoo', 'kiss', 'lick', 'pat', 'smug', 'bonk', 'yeet', 'blush', 
  'smile', 'wave', 'highfive', 'handhold', 'nom', 'bite', 'glomp', 
  'slap', 'kill', 'kick', 'happy', 'wink', 'poke', 'dance', 'cringe'
];

handler.tags = ['anime'];

export default handler;
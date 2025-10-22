function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '🇦 ',
          'b': '🇧 ',
          'c': '🇨 ',
          'd': '🇩 ',
          'e': '🇪 ',
          'f': '🇫 ',
          'g': '🇬 ',
          'h': '🇭 ',
          'i': '🇮 ',
          'j': '🇯 ',
          'k': '🇰 ',
          'l': '🇱 ',
          'm': '🇲 ',
          'n': '🇳 ',
          'o': '🇴 ',
          'p': '🇵 ',
          'q': '🇶 ',
          'r': '🇷 ',
          's': '🇸 ',
          't': '🇹 ',
          'u': '🇺 ',
          'v': '🇻 ',
          'w': '🇼 ',
          'x': '🇽 ',
          'y': '🇾 ',
          'z': '🇿 ', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه11']
export default handler
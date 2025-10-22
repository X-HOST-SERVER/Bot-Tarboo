function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝙰',
          'b': '𝙱',
          'c': '𝙲',
          'd': '𝙳',
          'e': '𝙴',
          'f': '𝙵',
          'g': '𝙶',
          'h': '𝙷',
          'i': '𝙸',
          'j': '𝙹',
          'k': '𝙺',
          'l': '𝙻',
          'm': '𝙼',
          'n': '𝙽',
          'o': '𝙾',
          'p': '𝙿',
          'q': '𝚀',
          'r': '𝚁',
          's': '𝚂',
          't': '𝚃',
          'u': '𝚄',
          'v': '𝚅',
          'w': '𝚆',
          'x': '𝚇',
          'y': '𝚈',
          'z': '𝚉', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه1']
export default handler
function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝘼',
          'b': '𝘽',
          'c': '𝘾',
          'd': '𝘿',
          'e': '𝙀',
          'f': '𝙁',
          'g': '𝙂',
          'h': '𝙃',
          'i': '𝙄',
          'j': '𝙅',
          'k': '𝙆',
          'l': '𝙇',
          'm': '𝙈',
          'n': '𝙉',
          'o': '𝙊',
          'p': '𝙋',
          'q': '𝙌',
          'r': '𝙍',
          's': '𝙎',
          't': '𝙏',
          'u': '𝙐',
          'v': '𝙑',
          'w': '𝙒',
          'x': '𝙓',
          'y': '𝙔',
          'z': '𝙕', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه10']
export default handler
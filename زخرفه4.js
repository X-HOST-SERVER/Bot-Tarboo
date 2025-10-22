function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝑨',
          'b': '𝑩',
          'c': '𝑪',
          'd': '𝑫',
          'e': '𝑬',
          'f': '𝑭',
          'g': '𝑮',
          'h': '𝑯',
          'i': '𝑰',
          'j': '𝑱',
          'k': '𝑲',
          'l': '𝑳',
          'm': '𝑴',
          'n': '𝑵',
          'o': '𝑶',
          'p': '𝑷',
          'q': '𝑸',
          'r': '𝑹',
          's': '𝑺',
          't': '𝑻',
          'u': '𝑼',
          'v': '𝑽',
          'w': '𝑾',
          'x': '𝑿',
          'y': '𝒀',
          'z': '𝒁', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه4']
export default handler
function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝓐',
          'b': '𝓑',
          'c': '𝓒',
          'd': '𝓓',
          'e': '𝓔',
          'f': '𝓕',
          'g': '𝓖',
          'h': '𝓗',
          'i': '𝓘',
          'j': '𝓙',
          'k': '𝓚',
          'l': '𝓛',
          'm': '𝓜',
          'n': '𝓝',
          'o': '𝓞',
          'p': '𝓟',
          'q': '𝓠',
          'r': '𝓡',
          's': '𝓢',
          't': '𝓣',
          'u': '𝓤',
          'v': '𝓥',
          'w': '𝓦',
          'x': '𝓧',
          'y': '𝓨',
          'z': '𝓩', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه7']
export default handler
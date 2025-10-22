function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝗔',
          'b': '𝗕',
          'c': '𝗖',
          'd': '𝗗',
          'e': '𝗘',
          'f': '𝗙',
          'g': '𝗚',
          'h': '𝗛',
          'i': '𝗜',
          'j': '𝗝',
          'k': '𝗞',
          'l': '𝗟',
          'm': '𝗠',
          'n': '𝗡',
          'o': '𝗢',
          'p': '𝗣',
          'q': '𝗤',
          'r': '𝗥',
          's': '𝗦',
          't': '𝗧',
          'u': '𝗨',
          'v': '𝗩',
          'w': '𝗪',
          'x': '𝗫',
          'y': '𝗬',
          'z': '𝗭', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه9']
export default handler
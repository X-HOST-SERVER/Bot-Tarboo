function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
    return { 
                'a': '𝐀',
                'b': '𝐁',
                'c': '𝐂',
                'd': '𝐃',
                'e': '𝐄',
                'f': '𝐅',
                'g': '𝐆',
                'h': '𝐇',
                'i': '𝐈',
                'j': '𝐉',
                'k': '𝐊',
                'l': '𝐋',
                'm': '𝐌',
                'n': '𝐍',
                'o': '𝐎',
                'p': '𝐏',
                'q': '𝐐',
                'r': '𝐑',
                's': '𝐒',
                't': '𝐓',
                'u': '𝐔',
                'v': '𝐕',
                'w': '𝐖',
                'x': '𝐗',
                'y': '𝐘',
                'z': '𝐙', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه3']
export default handler
function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝒜',
          'b': 'ℬ',
          'c': '𝒞',
          'd': '𝒟',
          'e': 'ℰ',
          'f': 'ℱ',
          'g': '𝒢',
          'h': 'ℋ',
          'i': 'ℐ',
          'j': '𝒥',
          'k': '𝒦',
          'l': 'ℒ',
          'm': 'ℳ',
          'n': '𝒩',
          'o': '𝒪',
          'p': '𝒫',
          'q': '𝒬',
          'r': 'ℛ',
          's': '𝒮',
          't': '𝒯',
          'u': '𝒰',
          'v': '𝒱',
          'w': '𝒲',
          'x': '𝒳',
          'y': '𝒴',
          'z': '𝒵', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه6']
export default handler
function handler(m, { text }) {
  let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝐴',
          'b': '𝐵',
          'c': '𝐶',
          'd': '𝐷',
          'e': '𝛯',
          'f': '𝐹',
          'g': '𝐺',
          'h': '𝛨',
          'i': '𝐼',
          'j': '𝐽',
          'k': '𝐾',
          'l': '𝐿',
          'm': '𝑀',
          'n': '𝛮',
          'o': '𝛩',
          'p': '𝑃',
          'q': '𝑄',
          'r': '𝑅',
          's': '𝑺',
          't': '𝑇',
          'u': '𝑈',
          'v': '𝛻',
          'w': '𝑊',
          'x': '𝑋',
          'y': '𝑌',
          'z': '𝑍', 
      }[v.toLowerCase()] || v
  }))
}
handler.help = ['H A R L E Y']
handler.tags = ['H A R L E Y']
handler.command =  /^(كيب)$/i

export default handler
function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': '𝔸',
          'b': '𝔹',
          'c': 'ℂ',
          'd': '𝔻',
          'e': '𝔼',
          'f': '𝔽',
          'g': '𝔾',
          'h': 'ℍ',
          'i': '𝕀',
          'j': '𝕁',
          'k': '𝕂',
          'l': '𝕃',
          'm': '𝕄',
          'n': 'ℕ',
          'o': '𝕆',
          'p': 'ℙ',
          'q': 'ℚ',
          'r': 'ℝ',
          's': '𝕊',
          't': '𝕋',
          'u': '𝕌',
          'v': '𝕍',
          'w': '𝕎',
          'x': '𝕏',
          'y': '𝕐',
          'z': 'ℤ', 
}[v.toLowerCase()] || v
}));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه2']
export default handler
function handler(m, { text }) {
let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  m.reply(teks.replace(/[a-z]/gi, v => {
      return { 
          'a': 'ᗩ',
          'b': 'ᗷ',
          'c': 'ᑕ',
          'd': 'ᗪ',
          'e': 'ᗴ',
          'f': 'ᖴ',
          'g': 'ᘜ',
          'h': 'ᕼ',
          'i': 'I',
          'j': 'ᒍ',
          'k': 'K',
          'l': 'ᒪ',
          'm': 'ᗰ',
          'n': 'ᑎ',
          'o': 'O',
          'p': 'ᑭ',
          'q': 'ᑫ',
          'r': 'ᖇ',
          's': 'Տ',
          't': 'T',
          'u': 'ᑌ',
          'v': 'ᐯ',
          'w': 'ᗯ',
          'x': '᙭',
          'y': 'Y',
          'z': 'ᘔ', 
      }[v.toLowerCase()] || v
  }));
}
handler.help = ['vivi']
handler.tags = ['vivi']
handler.command = ['زخرفه8']
export default handler
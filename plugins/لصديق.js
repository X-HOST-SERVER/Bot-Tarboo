const dir = [
'https://telegra.ph/file/dfb75441224f1cf76c7ba.mp4',
'https://telegra.ph/file/0113bce597889e118d2af.mp4',
'https://telegra.ph/file/35b24b2ae1e5632efc836.mp4',
'https://telegra.ph/file/3ab9fbb6afbba20cfbe38.mp4', 
'https://telegra.ph/file/628acac131f4f2edfac1a.mp4', 
'https://telegra.ph/file/a9edef3637060da5cd7b1.mp4', 
'https://telegra.ph/file/b08f9c657d9270a5565f2.mp4', 
'https://telegra.ph/file/e106d0bc17949b6a3a5fa.mp4', 
'https://telegra.ph/file/e924081e8c10547ad4207.mp4', 
'https://telegra.ph/file/3e4f1cb95c6be0050c640.mp4', 
'https://telegra.ph/file/156b0760dfe26e644b5a6.mp4', 
'https://telegra.ph/file/4f663ea7499222116a980.mp4', 
'https://telegra.ph/file/bdf7a3c889bd8319497b9.mp4', 
'https://telegra.ph/file/649b2bbeeab8839cea2c1.mp4', 
'https://telegra.ph/file/55f8a43fe6bd3e495d22f.mp4', 
'https://telegra.ph/file/3944816dab84b6065c158.mp4', 
'https://telegra.ph/file/881df9afd076f3b3a0b5d.mp4', 
'https://telegra.ph/file/0806554c2f524ebe26b1b.mp4', 
'https://telegra.ph/file/91a873b50f8b1caba1b08.mp4', 
'https://telegra.ph/file/31e6633c3d45bce1230f9.mp4', 
'https://telegra.ph/file/bd5e950d2564ffe6d725b.mp4', 
'https://telegra.ph/file/fe9142a110d4706cce1b6.mp4', 
'https://telegra.ph/file/8e1a825d680d479f8671f.mp4', 

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
  m.react('😂');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['friend', 'لصديق'] 

export default handler
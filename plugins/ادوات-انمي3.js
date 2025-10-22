const dir = [
'https://telegra.ph/file/419a7cf707033f9c4edeb.mp4',
'https://telegra.ph/file/4875dd5ebcc2c1f5ad145.mp4',
'https://telegra.ph/file/ace3c9ae76e57391dac6e.mp4',
'https://telegra.ph/file/3e591a46dbb0735be2c50.mp4',
'https://telegra.ph/file/d8490ae50f614566805aa.mp4',
'https://telegra.ph/file/8c678df77161a015091a0.mp4',
'https://telegra.ph/file/1356d90c11bef2a10d2a8.mp4',
'https://telegra.ph/file/7f5164550112ad696233c.mp4',
'https://telegra.ph/file/5d92e94cca0f2853190cf.mp4',
'https://telegra.ph/file/fcadca16abcd7880eddae.mp4',
'https://telegra.ph/file/64acfd9d6996dc43d5d87.mp4',
'https://telegra.ph/file/0e8a2c9d50d77e65e583c.mp4',
'https://telegra.ph/file/e567d5b8b416d7343b44e.mp4',
'https://telegra.ph/file/6b3b7825aa1404b736c78.mp4', 
'https://telegra.ph/file/ec17d5e4d067a86ab7777.mp4',
'https://telegra.ph/file/64acfd9d6996dc43d5d87.mp4',
'https://telegra.ph/file/322d0bced24badb31e8d8.mp4',
'https://telegra.ph/file/f1a012d24d9184fc97964.mp4',
'https://telegra.ph/file/fc7bf97d644e5c9d844d6.mp4',
'https://telegra.ph/file/aabb4635578a1a20923ff.mp4',
'https://telegra.ph/file/8ff56f0606065ab44710a.mp4',
'https://telegra.ph/file/989d8f54cc20156c2045b.mp4', 
'https://telegra.ph/file/31f876f36bf2f7ac96551.mp4',
'https://telegra.ph/file/8df1a6db27535a3012b46.mp4',
'https://telegra.ph/file/fb8109aad23d3f1157288.mp4',
'https://telegra.ph/file/2f2dbc15c0852eed384f1.mp4', 
'https://telegra.ph/file/04c85ab392f9283a8db98.mp4', 
'https://telegra.ph/file/596b5a39fc977f563af43.mp4', 

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
  m.react('🧚');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['انميات'] 

export default handler

const dir = [
'https://telegra.ph/file/b51830eb3a79f6c51add0.mp4',
'https://telegra.ph/file/16077ce9999a107f1462c.mp4',
'https://telegra.ph/file/16077ce9999a107f1462c.mp4',
'https://telegra.ph/file/1fde235e4d4d6235c7397.mp4',
'https://telegra.ph/file/2d348c19610686b4cdba5.mp4',
'https://telegra.ph/file/0775b244bc2adab039f03.mp4',
'https://telegra.ph/file/b5242dd20f63c827d1244.mp4',
'https://telegra.ph/file/c89e256af900bae5be366.mp4',
'https://telegra.ph/file/c89e256af900bae5be366.mp4',
'https://telegra.ph/file/6ae66acaf30965c16f96c.mp4',
'https://telegra.ph/file/f6be9c25c3d18837a151b.mp4',
'https://telegra.ph/file/67572fbd1cb8bc80fc49c.mp4',
'https://telegra.ph/file/05a2299b65a1971bc1f8e.mp4',
'https://telegra.ph/file/bad77ec42f2d18b3b54f6.mp4', 
'https://telegra.ph/file/bad77ec42f2d18b3b54f6.mp4',
'https://telegra.ph/file/350ac433be62593390e9f.mp4',
'https://telegra.ph/file/542d0030ba6f484355602.mp4',
'https://telegra.ph/file/619f4eb241208e7885432.mp4',
'https://telegra.ph/file/4564d1605d2ca87798c87.mp4',
'https://telegra.ph/file/6ef07a5b535cdca4d014d.mp4',
'https://telegra.ph/file/5ee622ab2a5b14b472ea8.mp4',
'https://telegra.ph/file/04122a12c144256f63cf6.mp4', 
'https://telegra.ph/file/04122a12c144256f63cf6.mp4',
'https://telegra.ph/file/17720e4b5cd3b3648be3c.mp4',
'https://telegra.ph/file/35298b11b3ba78e420b67.mp4',
'https://telegra.ph/file/e058c450d80b6959d3a23.mp4', 
'https://telegra.ph/file/0fbb0c5da94cd4a9527d1.mp4', 
'https://telegra.ph/file/d40f653eaae3b3f763ef3.mp4', 
'https://telegra.ph/file/9bedb15097a14d9a59534.mp4', 
'https://telegra.ph/file/335f82eead06c7b7fd081.mp4', 
'https://telegra.ph/file/876a14356c0999a4d384a.mp4', 
'https://telegra.ph/file/aa97e36e4762bc652e707.mp4',
'https://telegra.ph/file/100bc1211f04cfce2c450.mp4', 
'https://telegra.ph/file/3054c1b8573f182a1b71b.mp4', 
'https://telegra.ph/file/d9974dba778a510f1afd9.mp4', 
'https://telegra.ph/file/764a06ea46343f17a1340.mp4', 
'https://telegra.ph/file/4058824cff2003328c0f2.mp4', 
'https://telegra.ph/file/a158e8d700816b89d8427.mp4', 
'https://telegra.ph/file/790388a5a26608497ea40.mp4', 

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 
'dado.webp', '', m)
  m.react('💃🏻');
}
handler.help = ['dado']
handler.tags = ['game']
handler.command = ['ايديت-انمي'] 

export default handler

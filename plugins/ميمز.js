const dir = [
  'https://telegra.ph/file/2d692d315587805dde1a9.jpg',
  'https://telegra.ph/file/e51a3c070b031ccefb801.jpg',
  'https://telegra.ph/file/a0a8e70592a5b2ccd2987.jpg',
  'https://telegra.ph/file/5e1fc88c8803a0fc31523.jpg',
  'https://telegra.ph/file/1f54bdd48b568aa05d593.jpg',
  'https://telegra.ph/file/62ac12702441491e0c73b.jpg',
  'https://telegra.ph/file/fa537428bb58b297e3ed3.jpg',
  'https://telegra.ph/file/3155c1dc08fa26970d858.jpg',
  'https://telegra.ph/file/e926a13e06728028d860d.jpg',
  'https://telegra.ph/file/71e8a40317d9dd6dce50f.jpg',
  'https://telegra.ph/file/1c9f11a44ac8ed88e073e.jpg',
  'https://telegra.ph/file/271155de61db260ef09ba.jpg',
  'https://telegra.ph/file/d898b26a10495e8c6792b.jpg',
  'https://telegra.ph/file/f6b71e125dd4971253c39.jpg',
  'https://telegra.ph/file/73e9f8a1692c470e63d04.jpg',
  'https://telegra.ph/file/6c72d75cbb596fd757aba.jpg',
  'https://telegra.ph/file/ede1c654d4c218c0b263b.jpg',
  'https://telegra.ph/file/078671b7aee6dd8c4ae09.jpg',
  'https://telegra.ph/file/04f6a1c2c271e3d0d9b08.jpg',
  'https://telegra.ph/file/e1f3bc35cb2b201ec12e4.jpg',
  'https://telegra.ph/file/0d6fb4189e171d90505f8.jpg',
  'https://telegra.ph/file/efa364c3e60769ba75743.jpg',
  'https://telegra.ph/file/65bf5dbc42b5c43fc5d2f.jpg',
  'https://telegra.ph/file/03fd2e33eef17aa189e5a.jpg',
  'https://telegra.ph/file/855054f8f233540b8bdc7.jpg',
  'https://files.catbox.moe/050sao.jpg',
  'https://files.catbox.moe/tms5dt.jpg',
  'https://files.catbox.moe/snzk90.jpg',
  'https://files.catbox.moe/ee0sy2.jpg',
  'https://files.catbox.moe/0o0zrq.jpg',
  'https://files.catbox.moe/zc2eom.jpg',
  'https://files.catbox.moe/ixp1ml.jpg',
  'https://files.catbox.moe/lqe0h3.jpg',
  'https://files.catbox.moe/hi5m2z.jpg',
  'https://files.catbox.moe/fp77m8.jpg',
  'https://files.catbox.moe/1c2oo2.jpg',
  'https://files.catbox.moe/b9yb9d.jpg',
  'https://files.catbox.moe/au1bi1.jpg',
  'https://files.catbox.moe/taefqa.jpg',
  'https://files.catbox.moe/val676.jpg',
  'https://files.catbox.moe/dwvavg.jpg',
  'https://files.catbox.moe/qbaxik.jpg',
  'https://files.catbox.moe/rniar9.jpg',
  'https://files.catbox.moe/diza4j.jpg',
  'https://files.catbox.moe/fsj0ho.jpg',
  'https://files.catbox.moe/wxzzg2.jpg',
  'https://files.catbox.moe/q457zs.jpg',
  'https://files.catbox.moe/x0dqq3.jpg',
  'https://files.catbox.moe/ihilah.jpg',
  'https://files.catbox.moe/uvmslj.jpg',
  'https://files.catbox.moe/5m5zkc.jpg',
  'https://files.catbox.moe/28x4gy.jpg',
  'https://files.catbox.moe/4v1l3l.jpg',
  'https://files.catbox.moe/ly43dj.jpg',
  'https://files.catbox.moe/7ab37x.jpg',
  'https://files.catbox.moe/0ch7ur.jpg',
  'https://files.catbox.moe/ra5741.jpg',
  'https://files.catbox.moe/xiilsw.jpg',
  'https://files.catbox.moe/yw3gh3.jpg',
  'https://files.catbox.moe/w2td06.jpg',
  'https://files.catbox.moe/md7muu.jpg',
  'https://files.catbox.moe/8e0j4l.jpg',
  'https://files.catbox.moe/lcouu7.jpg',
  'https://files.catbox.moe/l7lahq.jpg',
  'https://files.catbox.moe/yq91ml.jpg'
];

let handler = async (m, { conn }) => {
  let randomImage = dir[Math.floor(Math.random() * dir.length)];
  
  await conn.sendFile(m.chat, randomImage, 'meme.jpg', '✨ استمتع بهذه الصورة العشوائية! ✨', m);
};

handler.help = ['dado'];
handler.tags = ['game'];
handler.command = ['ميمز', 'dados'];

export default handler;
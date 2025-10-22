/*
متاكد انك مش مثبت حاجه فيهم 🦆
npm install net
npm install https
npm install dns
حقوق 
https://whatsapp.com/channel/0029VaJxI9uJkK7BedTH0D11
*/
import https from 'https';
import dns from 'dns';
import net from 'net';

const handler = async (m, { args }) => {
  const url = args[0]; 
  
  if (!url) return m.reply('❗ يرجى إدخال رابط السيرفر (مثال: *.example.com)');
  
  try {
    const info = await getServerInfo(url);
    m.reply(formatServerInfo(info));
  } catch (error) {
    m.reply(`❌ خطأ في الفحص: ${error.message}`);
  }
};

async function getServerInfo(url) {
  const parsedUrl = new URL(url.includes('://') ? url : `https://${url}`);
  const hostname = parsedUrl.hostname;
  const port = parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80);

  const { address: ip } = await dnsLookup(hostname);
  
  const sslInfo = await getSSLInfo(hostname, port);
  
  const isPortOpen = await checkPort(ip, port);
  
  const headers = await getHeaders(parsedUrl);

  return {
    hostname,
    ip,
    port,
    sslInfo,
    isPortOpen,
    headers
  };
}

function dnsLookup(hostname) {
  return new Promise((resolve, reject) => {
    dns.lookup(hostname, (err, address, family) => {
      if (err) reject(err);
      else resolve({ address, family });
    });
  });
}

function getSSLInfo(hostname, port) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname, port, agent: new https.Agent({ rejectUnauthorized: false }) });
    req.on('response', () => {});
    req.on('error', reject);
    req.on('socket', (socket) => {
      socket.on('secureConnect', () => {
        const cert = socket.getPeerCertificate();
        resolve({
          valid: !socket.authorizationError,
          issuer: cert.issuer,
          subject: cert.subject,
          validFrom: cert.valid_from,
          validTo: cert.valid_to,
          protocol: socket.getProtocol()
        });
      });
    });
    req.end();
  });
}

function checkPort(ip, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    socket.setTimeout(2000);
    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });
    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });
    socket.on('error', () => resolve(false));
    socket.connect(port, ip);
  });
}

async function getHeaders(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const headers = {};
      res.rawHeaders.forEach((val, idx) => {
        if (idx % 2 === 0) headers[val] = res.rawHeaders[idx + 1];
      });
      resolve(headers);
    }).on('error', reject);
  });
}

function formatServerInfo(info) {
  return `
╔═══「 *معلومات السيرفر* 」
│
│↳ النطاق: ${info.hostname}
│↳ الـ IP: ${info.ip}
│↳ البورت: ${info.port}
│↳ البورت مفتوح: ${info.isPortOpen ? '✅' : '❌'}
│
│═══「 *شهادة SSL* 」
│↳ صالحة: ${info.sslInfo.valid ? '✅' : '❌'}
│↳ المُصدر: ${info.sslInfo.issuer?.O || 'غير معروف'}
│↳ سارية من: ${info.sslInfo.validFrom}
│↳ تنتهي في: ${info.sslInfo.validTo}
│↳ البروتوكول: ${info.sslInfo.protocol}
│
│═══「 *الـ Headers* 」
${Object.entries(info.headers).map(([k, v]) => `│↳ ${k}: ${v}`).join('\n')}
╚═══════════════════
  `.trim();
}

handler.command = /^فحص-سيرفر$/i;
export default handler;
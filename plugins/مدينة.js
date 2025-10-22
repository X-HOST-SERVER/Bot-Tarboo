import axios from 'axios';
const handler = async (m, {args}) => {
  if (!args[0]) throw '*[❗] اكتب اسم البلد أو المدينة*';
  try {
    const response = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${args}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273`);
    const res = await response;
    const name = res.data.name;
    const Country = res.data.sys.country;
    const Weather = res.data.weather[0].description;
    const Temperature = res.data.main.temp + '°C';
    const Minimum_Temperature = res.data.main.temp_min + '°C';
    const Maximum_Temperature = res.data.main.temp_max + '°C';
    const Humidity = res.data.main.humidity + '%';
    const Wind = res.data.wind.speed + 'كم/س';
    const wea = `「 📍 」المكان: ${name}\n「 🗺️ 」البلد: ${Country}\n「 🌤️ 」الطقس: ${Weather}\n「 🌡️ 」درجة الحرارة: ${Temperature}\n「 💠 」درجة الحرارة الدنيا: ${Minimum_Temperature}\n「 📛 」درجة الحرارة القصوى: ${Maximum_Temperature}\n「 💦 」الرطوبة: ${Humidity}\n「 🌬️ 」الرياح: ${Wind}`;
    m.reply(wea);
  } catch {
    return '*[❗] مافيش نتائج، اتأكد انك كتبت اسم البلد أو المدينة صح*';
  }
};
handler.help = ['clima *<مدينة/بلد>*'];
handler.tags = ['أدوات'];
handler.command = /^(clima|مدينة)$/i;
handler.register = true
export default handler;

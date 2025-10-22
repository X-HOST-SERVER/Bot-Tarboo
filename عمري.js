const calculateAge = (birthday) => {
  const [day, month, year] = birthday.split('-');
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const getDaysUntilBirthday = (birthday) => {
  const [day, month] = birthday.split('-');
  const today = new Date();
  let nextBirthday = new Date(today.getFullYear(), month - 1, day);
  if (today > nextBirthday) {
    nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
  }
  const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
  return daysUntilBirthday;
};

const handler = async (message, { conn, args, usedPrefix, command }) => {
  const birthday = args[0];
  if (!birthday) {
    throw "❌ يرجى إدخال تاريخ الميلاد بتنسيق يوم-شهر-سنة مثل 06-10-2007";
  }

  const birthDateParts = birthday.split('-');
  if (
    birthDateParts.length !== 3 || 
    isNaN(new Date(birthDateParts[2], birthDateParts[1] - 1, birthDateParts[0]).getTime()) || 
    birthDateParts[1] < 1 || birthDateParts[1] > 12 || 
    birthDateParts[0] < 1 || birthDateParts[0] > 31
  ) {
    throw "❌ تاريخ الميلاد غير صالح. يرجى إدخال تاريخ صالح بتنسيق يوم-شهر-سنة مثل 28-04-2004";
  }

  const age = calculateAge(birthday);
  const ageString = age === 1 ? "سنة" : "سنوات";
  const daysUntilBirthday = getDaysUntilBirthday(`${birthDateParts[0]}-${birthDateParts[1]}`);

  const messageText = `🎉 عمرك الآن: ${age} ${ageString}.\n\n📅 متبقي على عيد ميلادك: ${daysUntilBirthday} يوم.`;

  await conn.sendMessage(message.chat, {
    text: messageText,
  });
};

handler.help = ["عمري"];
handler.tags = ["age"];
handler.command = /^(age|عمري)$/i;
handler.limit = false;

export default handler;
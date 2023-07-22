export const DateFormateWithDash = (date: Date): string => {
  let currDate = date;
  const day = currDate.getDate();
  let month = currDate.getMonth() + 1;
  const year = currDate.getFullYear();

  if (month === 13) month = 1;

  const newMonth = month < 10 ? '0' + month : month;
  const newDay = day < 10 ? '0' + day : day;

  const newDate = newDay + '-' + newMonth + '-' + year;

  return newDate;
};
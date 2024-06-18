export const dateFormater = (isoDate) => {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  const year = localDate.getFullYear();
  const month = `0${localDate.getMonth() + 1}`.slice(-2);
  const day = `0${localDate.getDate()}`.slice(-2);
  return `${year}-${month}-${day}`;
};

export const formatBrDate = (isoDate) => {
  if (!isoDate) return '';

  const date = new Date(isoDate);
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const day = `0${utcDate.getUTCDate()}`.slice(-2);
  const month = `0${utcDate.getUTCMonth() + 1}`.slice(-2);
  const year = utcDate.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

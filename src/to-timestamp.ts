const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default (date: Date, targetTimeZone: string): string => {
  const convertedDate = new Date(
    date.toLocaleString('en-US', { timeZone: targetTimeZone })
  );

  return `${months[convertedDate.getMonth()]} ${convertedDate.getDate()}`;
};

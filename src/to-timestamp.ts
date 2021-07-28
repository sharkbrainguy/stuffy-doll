import moment from 'moment-timezone';

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
  const targetMoment = moment(date).tz(targetTimeZone);

  return `${months[targetMoment.month()]} ${targetMoment.date()}`;
};

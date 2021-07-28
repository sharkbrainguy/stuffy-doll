export default (date: Date): string => {
  const month = date.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    month: 'long',
  });

  const day = date.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    day: 'numeric',
  });

  return `${month} ${day}`;
};

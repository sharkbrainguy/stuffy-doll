export default (date: Date): string => {
  const month = date.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    month: '2-digit',
  });

  const day = date.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    day: '2-digit',
  });

  const year = date.toLocaleString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
  });

  return `${year}-${month}-${day}`;
};

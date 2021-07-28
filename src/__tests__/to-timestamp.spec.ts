import toTimestamp from '../to-timestamp';

describe('Import TimeStamp', () => {
  it('Should return same day when running from nz', () => {
    const date = new Date('2021-07-28T00:00:00.000+12:00');
    const stamp = toTimestamp(date, 'Pacific/Auckland');
    expect(stamp).toBe('July 28');
  });

  it('Should return day before when running from a country that is a day behind', () => {
    const date = new Date('2021-07-28T00:00:00.000+00:00');
    const stamp = toTimestamp(date, 'America/New_York');
    expect(stamp).toBe('July 27');
  });

  it('Should return day in NZ even when running from a country that is a day behind', () => {
    const date = new Date('2021-07-28T00:00:00.000+00:00');
    const stamp = toTimestamp(date, 'Pacific/Auckland');
    expect(stamp).toBe('July 28');
  });
});

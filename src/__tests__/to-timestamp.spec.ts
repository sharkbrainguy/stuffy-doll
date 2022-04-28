import toTimestamp from '../to-timestamp';

describe('Import TimeStamp', () => {
  it('Should return same day', () => {
    const date = new Date('2021-07-28T00:00:00.000+12:00');
    const stamp = toTimestamp(date);
    expect(stamp).toBe('28/07/2021');
  });
});

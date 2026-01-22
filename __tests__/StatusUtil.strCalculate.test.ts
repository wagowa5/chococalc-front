import { strCalculate } from '../src/util/StatusUtil';

describe('strCalculate', () => {
  it('returns 7 for calculatable expression "1+2*3"', () => {
    expect(strCalculate('1+2*3')).toBe(7);
  });

  it('returns 0 for non-calculatable expression "1/0"', () => {
    expect(strCalculate('1/0')).toBe(0);
  });

  it('returns 0 for invalid expression "abc"', () => {
    expect(strCalculate('abc')).toBe(0);
  });
});

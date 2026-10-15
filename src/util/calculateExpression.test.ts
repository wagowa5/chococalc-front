import { calculateExpression } from './calculateExpression';

test.each([
    ['157+342', 499], ['2+3*4', 14], ['(2+3)*4', 20],
    ['-2.5+1', -1.5], ['2^3', 8], ['100/4', 25], ['0', 0],
])('calculates %s as %s', (expression, expected) => {
    expect(calculateExpression(expression)).toBe(expected);
});

test.each(['', '1/0', '0/0', 'sqrt(-1)', '[1,2]', 'unknown', '2+'])
('rejects invalid or non-finite scalar input: %s', expression => {
    expect(() => calculateExpression(expression)).toThrow();
});

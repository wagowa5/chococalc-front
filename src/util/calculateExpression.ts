import { evaluate } from 'mathjs/number';

// Both input validation and status calculation must accept the same finite real values.
export function calculateExpression(expression: string): number {
    const value: unknown = evaluate(expression);
    if (typeof value !== 'number' || !Number.isFinite(value)) {
        throw new Error('有限の数値を入力してください。');
    }
    return value;
}

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

test.each([1280, 390])('renders the calculator and login dialog at width %s', width => {
    vi.stubGlobal('innerWidth', width);
    render(<App />);
    expect(screen.getByText('チョコラン計算機(非公式)')).toBeVisible();
    expect(screen.getByRole('note')).toHaveTextContent('2027年3月29日');
    fireEvent.click(screen.getByRole('button', { name: 'ログイン' }));
    expect(screen.getByLabelText('メールアドレス')).toBeVisible();
    expect(screen.getByRole('button', { name: 'パスワードを生成してコピー' })).toBeVisible();
});

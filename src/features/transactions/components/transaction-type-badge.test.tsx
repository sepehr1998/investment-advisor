import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TransactionTypeBadge } from './transaction-type-badge';

describe('TransactionTypeBadge', () => {
  it('renders "Buy" with green styling for BUY', () => {
    render(<TransactionTypeBadge typeCode="BUY" />);
    const badge = screen.getByText('Buy');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders "Sell" with red styling for SELL', () => {
    render(<TransactionTypeBadge typeCode="SELL" />);
    const badge = screen.getByText('Sell');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('renders "Dividend" with amber styling for DIVIDEND', () => {
    render(<TransactionTypeBadge typeCode="DIVIDEND" />);
    const badge = screen.getByText('Dividend');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-amber-100', 'text-amber-800');
  });

  it('renders "Coupon" with blue styling for COUPON', () => {
    render(<TransactionTypeBadge typeCode="COUPON" />);
    const badge = screen.getByText('Coupon');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('renders raw typeCode with gray styling for unknown types', () => {
    render(<TransactionTypeBadge typeCode="TRANSFER" />);
    const badge = screen.getByText('TRANSFER');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-700');
  });

  it('handles null typeCode gracefully without crashing', () => {
    // Should render without throwing — empty string falls through to gray style
    expect(() => render(<TransactionTypeBadge typeCode={null} />)).not.toThrow();
  });
});

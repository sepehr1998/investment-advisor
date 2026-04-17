import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionsFilters } from './transactions-filters';
import { TRANSACTION_FILTER_OPTIONS } from '../../../lib/constants';

describe('TransactionsFilters', () => {
  it('renders all filter options', () => {
    render(<TransactionsFilters activeFilter="ALL" onChange={() => {}} />);
    for (const option of TRANSACTION_FILTER_OPTIONS) {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    }
  });

  it('calls onChange with the correct value when a pill is clicked', () => {
    const onChange = vi.fn();
    render(<TransactionsFilters activeFilter="ALL" onChange={onChange} />);
    fireEvent.click(screen.getByText('Buy'));
    expect(onChange).toHaveBeenCalledWith('BUY');
  });

  it('calls onChange with ALL when the All pill is clicked', () => {
    const onChange = vi.fn();
    render(<TransactionsFilters activeFilter="BUY" onChange={onChange} />);
    fireEvent.click(screen.getByText('All'));
    expect(onChange).toHaveBeenCalledWith('ALL');
  });

  it('applies active styling to the active filter pill', () => {
    render(<TransactionsFilters activeFilter="SELL" onChange={() => {}} />);
    const sellButton = screen.getByText('Sell');
    expect(sellButton).toHaveClass('bg-blue-600', 'text-white');
  });

  it('applies inactive styling to non-active pills', () => {
    render(<TransactionsFilters activeFilter="ALL" onChange={() => {}} />);
    const buyButton = screen.getByText('Buy');
    expect(buyButton).not.toHaveClass('bg-blue-600');
  });
});

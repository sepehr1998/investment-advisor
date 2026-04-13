import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContactsSearch } from './contacts-search';
import { CONTACTS_SEARCH_PLACEHOLDER } from '../../../lib/constants';

describe('ContactsSearch', () => {
  it('renders with placeholder text', () => {
    render(<ContactsSearch value="" onChange={() => {}} />);

    expect(screen.getByPlaceholderText(CONTACTS_SEARCH_PLACEHOLDER)).toBeInTheDocument();
  });

  it('displays the current search value', () => {
    render(<ContactsSearch value="Alice" onChange={() => {}} />);

    const input = screen.getByPlaceholderText(CONTACTS_SEARCH_PLACEHOLDER);
    expect(input).toHaveValue('Alice');
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();
    render(<ContactsSearch value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(CONTACTS_SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'Bob' } });

    expect(handleChange).toHaveBeenCalledWith('Bob');
  });

  it('handles case-insensitive input', () => {
    const handleChange = vi.fn();
    render(<ContactsSearch value="" onChange={handleChange} />);

    const input = screen.getByPlaceholderText(CONTACTS_SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'ALICE' } });

    expect(handleChange).toHaveBeenCalledWith('ALICE');
  });
});

import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { usePortfolios } from './use-portfolios';
import { mockPortfolios } from '../../../mocks/handlers';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('usePortfolios', () => {
  it('does NOT fire when contactId is null', () => {
    const { result } = renderHook(() => usePortfolios(null), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('does NOT fire when contactId is undefined', () => {
    const { result } = renderHook(() => usePortfolios(undefined), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('does NOT fire when contactId is empty string', () => {
    const { result } = renderHook(() => usePortfolios(''), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('fires and returns a contact with portfolios when contactId is provided', async () => {
    const { result } = renderHook(() => usePortfolios('1'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSuccess).toBe(true);
    // usePortfolios returns data.contact — an object with id, name, portfolios
    expect(result.current.data?.portfolios).toHaveLength(mockPortfolios.length);
    expect(result.current.data?.portfolios[0]).toHaveProperty('id');
    expect(result.current.data?.portfolios[0]).toHaveProperty('name');
    expect(result.current.data?.portfolios[0]).toHaveProperty('currency');
    expect(result.current.data?.portfolios[0]).toHaveProperty('startDate');
  });

  it('returns the contact name from the response', async () => {
    const { result } = renderHook(() => usePortfolios('1'), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.name).toBe('Alice Johnson');
  });
});

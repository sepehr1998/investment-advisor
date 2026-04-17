import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { createElement } from 'react';
import { useTransactions } from './use-transactions';
import { mockTransactions } from '../../../mocks/handlers';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('useTransactions', () => {
  it('does NOT fire when portfolioId is null', () => {
    const { result } = renderHook(() => useTransactions(null), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('does NOT fire when portfolioId is undefined', () => {
    const { result } = renderHook(() => useTransactions(undefined), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('does NOT fire when portfolioId is empty string', () => {
    const { result } = renderHook(() => useTransactions(''), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.fetchStatus).toBe('idle');
    expect(result.current.data).toBeUndefined();
  });

  it('fires and returns transactions when portfolioId is provided', async () => {
    const { result } = renderHook(() => useTransactions('101'), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toHaveLength(mockTransactions.length);
    expect(result.current.data?.[0]).toHaveProperty('id');
    expect(result.current.data?.[0]).toHaveProperty('typeCode');
    expect(result.current.data?.[0]).toHaveProperty('transactionDate');
  });
});

import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useContacts } from './use-contacts';
import { mockContacts } from '../../../mocks/handlers';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useContacts', () => {
  it('starts in loading state', () => {
    const { result } = renderHook(() => useContacts(), { wrapper: createWrapper() });
    expect(result.current.isLoading).toBe(true);
  });

  it('fetches contacts on mount and returns typed data', async () => {
    const { result } = renderHook(() => useContacts(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(mockContacts.length);
    expect(result.current.data?.[0]).toHaveProperty('id');
    expect(result.current.data?.[0]).toHaveProperty('name');
  });

  it('returns data matching mock contacts', async () => {
    const { result } = renderHook(() => useContacts(), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockContacts);
  });

  it('accepts filter parameters', async () => {
    const { result } = renderHook(() => useContacts({ status: 'A' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBeDefined();
  });
});

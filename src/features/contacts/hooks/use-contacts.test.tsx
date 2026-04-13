import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useContacts } from './use-contacts';
import { mockContacts } from '../../../mocks/handlers';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useContacts', () => {
  it('fetches contacts on mount and returns typed data', async () => {
    const { result } = renderHook(() => useContacts(), {
      wrapper: createWrapper(),
    });

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    // Wait for query to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have data
    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(mockContacts.length);
    expect(result.current.data?.[0]).toHaveProperty('id');
    expect(result.current.data?.[0]).toHaveProperty('name');
  });

  it('fires query once on mount', async () => {
    const { result } = renderHook(() => useContacts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockContacts);
  });
});
